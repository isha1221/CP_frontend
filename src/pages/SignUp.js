import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserPlus, User, Mail, Lock, AlertTriangle } from "lucide-react";
import LoadingSpinner from "../components/LoadingSpinner";

const Signup = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
    // Clear error when user starts typing
    if (error) setError(null);
  };

  const validateForm = () => {
    if (!form.name || !form.email || !form.password || !form.confirmPassword) {
      setError("All fields are required");
      return false;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return false;
    }

    if (form.password.length < 6) {
      setError("Password must be at least 6 characters long");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    try {
      setLoading(true);
      const response = await axios.post("http://localhost:3333/auth/register", {
        name: form.name,
        email: form.email,
        password: form.password
      });

      // Save token to localStorage if returned
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
      }
      
      // Save user info if returned
      if (response.data.user) {
        localStorage.setItem("user", JSON.stringify(response.data.user));
      }

      // Redirect to dashboard after successful signup
      navigate("/home");
    } catch (err) {
      if (err.response?.status === 409) {
        setError("Email already in use");
      } else {
        setError("Registration failed. Please try again later.");
        console.error("Signup error:", err);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2>Create an Account</h2>
          <p>Sign up to manage your resumes and get career insights</p>
        </div>

        {error && (
          <div className="error-message">
            <AlertTriangle size={18} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="name">
              <User size={16} />
              <span>Full Name</span>
            </label>
            <input
              id="name"
              type="text"
              value={form.name}
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder="Enter your full name"
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">
              <Mail size={16} />
              <span>Email</span>
            </label>
            <input
              id="email"
              type="email"
              value={form.email}
              onChange={(e) => handleChange("email", e.target.value)}
              placeholder="Enter your email"
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">
              <Lock size={16} />
              <span>Password</span>
            </label>
            <input
              id="password"
              type="password"
              value={form.password}
              onChange={(e) => handleChange("password", e.target.value)}
              placeholder="Create a password"
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">
              <Lock size={16} />
              <span>Confirm Password</span>
            </label>
            <input
              id="confirmPassword"
              type="password"
              value={form.confirmPassword}
              onChange={(e) => handleChange("confirmPassword", e.target.value)}
              placeholder="Confirm your password"
              disabled={loading}
            />
          </div>

          <div className="form-footer">
            <button type="submit" className="button primary full-width" disabled={loading}>
              {loading ? (
                <>
                  <LoadingSpinner size={16} />
                  <span>Creating account...</span>
                </>
              ) : (
                <>
                  <UserPlus size={16} />
                  <span>Sign Up</span>
                </>
              )}
            </button>
          </div>
        </form>

        <div className="auth-footer">
          <p>
            Already have an account?{" "}
            <Link to="/login" className="text-link">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;