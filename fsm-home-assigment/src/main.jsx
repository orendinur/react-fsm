import ReactDOM from "react-dom/client";
import App from "./components/App/App.jsx";
import "./main.css";
import { StrictMode } from "react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
