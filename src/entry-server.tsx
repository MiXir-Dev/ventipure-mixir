import { PassThrough } from "node:stream";
import { renderToPipeableStream } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import App from "./App";

export { getStructuredDataForPath } from "./seo/structuredData";

// SSR 

export function render(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const stream = new PassThrough();
    let html = "";

    stream.on("data", (chunk) => {
      html += chunk.toString();
    });

    stream.on("end", () => resolve(html));
    stream.on("error", reject);

    const { pipe, abort } = renderToPipeableStream(
      <StaticRouter location={url}>
        <App />
      </StaticRouter>,
      {
        onAllReady() {
          pipe(stream);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          console.error("SSR stream error:", error);
        },
      },
    );

    setTimeout(() => abort(), 10000);
  });
}
