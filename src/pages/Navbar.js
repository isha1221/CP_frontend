import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useTheme } from "./ThemeContext";
import { Sun, Moon, Menu, X, FileText, Home, List } from "lucide-react";

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <FileText className="logo-icon" />
          <span>ResumeAI</span>
        </Link>

        <button
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
        >
          {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
        </button>

        <button className="mobile-menu-button" onClick={toggleMobileMenu}>
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <div className={`navbar-links ${mobileMenuOpen ? "show" : ""}`}>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "active" : "")}
            onClick={() => setMobileMenuOpen(false)}
          >
            <Home size={18} />
            <span></span>
          </NavLink>
          <NavLink
            to="/resumes"
            className={({ isActive }) => (isActive ? "active" : "")}
            onClick={() => setMobileMenuOpen(false)}
          >
            <List size={18} />
            <span>My Resumes</span>
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
