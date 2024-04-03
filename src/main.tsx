import { createRoot } from "react-dom/client";
import { App } from "./App";
import { GetSocket } from "./api";
import "./assets/index.scss";
import "./assets/style.css";

GetSocket();
createRoot(document.getElementById("root")).render(<App />);
