import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import App from "./App.jsx";
import theme from "./theme.js";

import "./assets/css/global.css";

const root = createRoot(document.getElementById("root"));

root.render(
  <StrictMode>
    {/*
      The light-mode/dark-mode class is written onto <html> by the inline script
      in index.html, which runs before this bundle and therefore before first
      paint -- that is what prevents the flash of light theme. This provider just
      picks up from there. defaultMode="system" means a first-time visitor gets
      their OS preference instead of being forced to light.
    */}
    <ThemeProvider theme={theme} defaultMode="system">
      <CssBaseline />
      <App />
    </ThemeProvider>
  </StrictMode>
);
