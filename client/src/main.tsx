import { createRoot } from "react-dom/client";
import { withBase } from "@/lib/withBase";
import App from "./App";
import "./index.css";

/* Set from the runtime base so the icon resolves correctly in dev and under a
   deploy subpath, instead of letting the browser guess a relative URL. */
document.getElementById("app-icon")?.setAttribute("href", withBase("/images/marigold-mark_a8e48b51.png"));

createRoot(document.getElementById("root")!).render(<App />);
