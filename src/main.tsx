import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import Layout from "./components/Layout.tsx";
import Setup from "./components/Setup.tsx";
import "./index.css";
import StoreProvider from "./redux/StoreProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <StoreProvider>
      <BrowserRouter>
        <Setup />
        <Layout>
          <App />
        </Layout>
      </BrowserRouter>
    </StoreProvider>
  </StrictMode>
);
