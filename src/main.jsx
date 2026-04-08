import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BlogContext } from "./context/BlogContext.jsx";

createRoot(document.getElementById("root")).render(
  <BlogContext>
    <App />
  </BlogContext>,
);
