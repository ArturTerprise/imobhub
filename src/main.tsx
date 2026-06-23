import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { initAutoTracking } from "./lib/analytics";

// Rastreia cliques em CTAs de conversão (Calendly / WhatsApp) em todo o site.
initAutoTracking();

createRoot(document.getElementById("root")!).render(<App />);
