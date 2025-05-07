import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Sun, Moon, LogOut, User } from "lucide-react";
import { useTheme } from "../layouts/ThemeContext";
import { useAuth } from "../authentication/AuthContext";

const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const { currentUser, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="app-header">
      <div className="header-container">
        <Link to="/" className="logo">
          ResumeAI
        </Link>

        <div className="header-actions">
          <button
            className="icon-button"
            onClick={toggleTheme}
            aria-label={
              theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
            }
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {isAuthenticated ? (
            <div className="user-menu">
              <div className="user-info">
                <span className="user-name">{currentUser.name}</span>
              </div>

              <button
                className="icon-button"
                onClick={handleLogout}
                aria-label="Log out"
              >
                <LogOut size={18} />
              </button>
            </div>
          ) : (
            <div className="auth-buttons">
              <Link to="/login" className="button secondary sm">
                Log In
              </Link>
              <Link to="/signup" className="button primary sm">
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
