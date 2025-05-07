import React from "react";
import { useNavigate } from "react-router-dom";
import { X, LogIn, UserPlus } from "lucide-react";

const AuthModal = ({ isOpen, onClose, currentPath }) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleLogin = () => {
    // Store the current path so we can redirect back after login
    navigate("/login", { state: { from: currentPath } });
  };

  const handleSignup = () => {
    navigate("/signup");
  };

  return (
    <div className="modal-overlay">
      <div className="auth-modal">
        <div className="modal-header">
          <h3>Authentication Required</h3>
          <button className="close-button" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="modal-content">
          <p>You need to be logged in to view this resume.</p>
          <p>Please log in to your account or create a new one to continue.</p>
        </div>

        <div className="modal-footer">
          <button className="button primary" onClick={handleLogin}>
            <LogIn size={16} />
            <span>Log In</span>
          </button>
          <button className="button secondary" onClick={handleSignup}>
            <UserPlus size={16} />
            <span>Sign Up</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
