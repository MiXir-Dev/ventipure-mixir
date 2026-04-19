import { defineConfig, loadEnv, type Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { handler as submitContactHandler } from "./netlify/functions/submit-contact.js";

const readRequestBody = async (req: NodeJS.ReadableStream) => {
  const chunks: Buffer[] = [];
  for await (const chunk of req) {
    chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks).toString("utf8");
};

const localSubmitContactApiPlugin = (): Plugin => ({
  name: "local-submit-contact-api",
  configureServer(server) {
    server.middlewares.use(async (req, res, next) => {
      if (!req.url?.startsWith("/api/submit-contact")) {
        next();
        return;
      }

      try {
        const body = await readRequestBody(req);
        const result = await submitContactHandler({
          httpMethod: req.method || "GET",
          body,
        });

        res.statusCode = result?.statusCode ?? 500;
        const headers = result?.headers ?? {};
        Object.entries(headers).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            res.setHeader(key, String(value));
          }
        });
        res.end(result?.body ?? "");
      } catch (error) {
        console.error("Local submit-contact handler failed", error);
        res.statusCode = 500;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({ success: false, error: "Local handler error" }));
      }
    });
  },
});

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  process.env.TELEGRAM_BOT_KEY = process.env.TELEGRAM_BOT_KEY || env.TELEGRAM_BOT_KEY;
  process.env.TELEGRAM_CHANNEL_ID = process.env.TELEGRAM_CHANNEL_ID || env.TELEGRAM_CHANNEL_ID;

  return {
    server: {
      host: "::",
      port: 8080,
      hmr: {
        overlay: false,
      },
    },
    plugins: [react(), ...(command === "serve" ? [localSubmitContactApiPlugin()] : [])],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
      dedupe: ["react", "react-dom", "react/jsx-runtime", "react/jsx-dev-runtime", "@tanstack/react-query", "@tanstack/query-core"],
    },
  };
});
