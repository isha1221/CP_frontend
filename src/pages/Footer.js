import React from "react";
import { Code, Coffee } from "lucide-react";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-copyright">
          © {new Date().getFullYear()} ResumeAI - Career Analysis Tools
        </div>
        <div className="footer-links">
          <a href="#" className="footer-link">
            <Code size={16} />
            <span>API</span>
          </a>
          <a href="#" className="footer-link">
            <Coffee size={16} />
            <span>Support</span>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
