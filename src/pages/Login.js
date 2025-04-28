import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { LogIn, Mail, Lock, AlertTriangle } from "lucide-react";
import LoadingSpinner from "../components/LoadingSpinner";
import { useAuth } from "../authentication/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({
    email: "",
    password: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { login } = useAuth();
    
  // Get the redirect path from location state or default to dashboard
  const from = location.state?.from || "/home";

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
    // Clear error when user starts typing
    if (error) setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!form.email || !form.password) {
      setError("Please enter both email and password");
      return;
    }

    try {
      setLoading(true);
    //   const response = await axios.post("http://localhost:3333/auth/login", {
    //     email: form.email,
    //     password: form.password
    //   })
      // const response = await axios.post("http://localhost:3333/auth/login", 
      //   new URLSearchParams({
      //     username: form.email,
      //     password: form.password
      //   }), {
      //     headers: {
      //       "Content-Type": "application/x-www-form-urlencoded"
      //     }
      //   }
      // )
      // console.log("✅ Login Success:", response.data);
      // // Save token to localStorage
      // localStorage.setItem("token", response.data.token);
      // // Save user info if returned
      // if (response.data.user) {
      //   localStorage.setItem("user", JSON.stringify(response.data.user));
      // }

      await login(form.email, form.password);


      // Redirect user to the page they tried to access
      navigate(from);
    } catch (err) {
      if (err.response?.status === 401) {
        setError("Invalid email or password");
      } else {
        setError("Login failed. Please try again later.");
        console.error("Login error:", err);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2>Welcome Back</h2>
          <p>Sign in to access your resumes and career insights</p>
        </div>

        {error && (
          <div className="error-message">
            <AlertTriangle size={18} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form">
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
              placeholder="Enter your password"
              disabled={loading}
            />
          </div>

          <div className="form-footer">
            <button type="submit" className="button primary full-width" disabled={loading}>
              {loading ? (
                <>
                  <LoadingSpinner size={16} />
                  <span>Logging in...</span>
                </>
              ) : (
                <>
                  <LogIn size={16} />
                  <span>Log In</span>
                </>
              )}
            </button>
          </div>
        </form>

        <div className="auth-footer">
          <p>
            Don't have an account?{" "}
            <Link to="/signup" className="text-link">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;