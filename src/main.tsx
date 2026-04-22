import { BrowserRouter } from "react-router-dom";
import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

const rootElement = document.getElementById("root");

const app = (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

if (rootElement.hasChildNodes()) hydrateRoot(rootElement, app);
else createRoot(rootElement).render(app);