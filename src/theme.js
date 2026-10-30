import { createTheme } from "@mui/material/styles";

/**
 * MUI theme mirroring the cream/olive palette defined as CSS custom properties
 * in assets/css/global.css. Both schemes are declared here so MUI components
 * (Dialog, Drawer, Chip, ...) inherit the site's colors instead of MUI's
 * defaults, and so dark mode is driven by one source rather than per-component
 * CSS overrides.
 *
 * `colorSchemeSelector: ".%s-mode"` makes MUI toggle via a `light-mode` /
 * `dark-mode` class on <html>, matching the `.dark-mode` selector the stylesheet
 * already uses and letting InitColorSchemeScript set it before first paint.
 */

const CREAM = "#ecdfcc";
const INK = "#181c14";
const OLIVE = "#3c3d37";
const SAGE = "#a8b39d";

const theme = createTheme({
  cssVariables: {
    colorSchemeSelector: ".%s-mode",
  },
  colorSchemes: {
    light: {
      palette: {
        mode: "light",
        primary: { main: OLIVE, contrastText: CREAM },
        secondary: { main: INK, contrastText: CREAM },
        background: { default: CREAM, paper: "#fcf6ea" },
        text: { primary: INK, secondary: "#2f342c" },
        divider: "rgba(24, 28, 20, 0.12)",
      },
    },
    dark: {
      palette: {
        mode: "dark",
        primary: { main: SAGE, contrastText: INK },
        secondary: { main: CREAM, contrastText: INK },
        background: { default: INK, paper: "#2f362d" },
        text: { primary: CREAM, secondary: "#d8d0c3" },
        divider: "rgba(236, 223, 204, 0.16)",
      },
    },
  },

  shape: { borderRadius: 12 },

  typography: {
    // Body copy uses Roboto; the Koulen display face is applied per-element in
    // CSS so it never leaks into small UI chrome like buttons and chips.
    fontFamily: 'var(--font-body, "Roboto", system-ui, sans-serif)',
    button: { textTransform: "none", fontWeight: 600 },
  },

  components: {
    MuiCssBaseline: {
      styleOverrides: {
        // CssBaseline emits its own `body { font-family }` from
        // typography.fontFamily, which would silently override the display font
        // set in global.css. Restating it here keeps Koulen as the inherited
        // page font regardless of stylesheet order, while MUI's own components
        // still use the body font from typography.fontFamily above.
        body: {
          fontFamily: 'var(--font-display, "Koulen", sans-serif)',
        },
      },
    },
    MuiButton: {
      defaultProps: { disableElevation: true },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          backgroundImage: "none",
          border: "1px solid var(--border)",
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundImage: "none",
          backgroundColor: "var(--bg)",
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          backgroundColor: "var(--surface-raised)",
          border: "1px solid var(--border)",
          color: "var(--text-muted)",
          fontFamily: "var(--font-body)",
          fontWeight: 600,
        },
      },
    },
  },
});

export default theme;
