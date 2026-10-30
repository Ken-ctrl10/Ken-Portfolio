import { useState } from "react";
import { useColorScheme } from "@mui/material/styles";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

const NAV_LINKS = [
  { href: "#home", label: "Home" },
  { href: "#aboutme", label: "About Me" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

function ThemeToggle({ isDark, onToggle }) {
  const label = isDark ? "Switch to light mode" : "Switch to dark mode";

  return (
    <Tooltip title={label}>
      <IconButton onClick={onToggle} aria-label={label} size="small" color="inherit">
        {isDark ? (
          <LightModeIcon className="dark-mode-icon" />
        ) : (
          <DarkModeIcon className="dark-mode-icon" />
        )}
      </IconButton>
    </Tooltip>
  );
}

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { mode, systemMode, setMode } = useColorScheme();

  // `mode` is "system" until the visitor picks one, so resolve through
  // systemMode to know what is actually on screen.
  const resolvedMode = mode === "system" ? systemMode : mode;
  const isDark = resolvedMode === "dark";

  const toggleTheme = () => setMode(isDark ? "light" : "dark");
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="header">
      <div className="header-left">
        <a href="#home" onClick={closeMenu}>
          <span id="span-header">Ken Castillo</span>
        </a>
      </div>

      {/* Desktop navigation */}
      <nav className="header-right" aria-label="Main">
        {NAV_LINKS.map((link) => (
          <a key={link.href} href={link.href}>
            {link.label}
          </a>
        ))}
        <ThemeToggle isDark={isDark} onToggle={toggleTheme} />
      </nav>

      <IconButton
        className="hamburger-menu"
        onClick={() => setIsMenuOpen(true)}
        aria-label="Open menu"
        aria-expanded={isMenuOpen}
        color="inherit"
      >
        <MenuIcon className="hamburger-menu-icon" />
      </IconButton>

      {/*
        Drawer rather than a hand-rolled dropdown: it traps focus while open,
        closes on Escape, and restores focus to the trigger on close -- none of
        which the previous CSS-toggled menu did.
      */}
      <Drawer
        anchor="right"
        open={isMenuOpen}
        onClose={closeMenu}
        slotProps={{ paper: { className: "mobile-nav-drawer" } }}
      >
        <div className="mobile-nav-header">
          <ThemeToggle isDark={isDark} onToggle={toggleTheme} />
          <IconButton onClick={closeMenu} aria-label="Close menu" color="inherit">
            <CloseIcon className="hamburger-menu-icon" />
          </IconButton>
        </div>

        <nav className="mobile-nav-links" aria-label="Mobile">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} onClick={closeMenu}>
              {link.label}
            </a>
          ))}
        </nav>
      </Drawer>
    </header>
  );
}

export default Header;
