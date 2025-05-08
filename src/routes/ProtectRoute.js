import React, { useState, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../authentication/AuthContext";
import AuthModal from "../authentication/AuthModel";
import LoadingSpinner from "../components/LoadingSpinner";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();
  const [showModal, setShowModal] = useState(false);
  const [localLoading, setLocalLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!loading) {
      if (token && !isAuthenticated) {
        const timer = setTimeout(() => {
          setLocalLoading(false);
        }, 300);
        return () => clearTimeout(timer);
      } else {
        setLocalLoading(false);
      }
    }
  }, [loading, isAuthenticated]);

  if (loading || localLoading) {
    return (
      <div className="loading-container">
        <LoadingSpinner size={40} />
        <p>Loading...</p>
      </div>
    );
  }

  if (isAuthenticated) {
    return children;
  }

  return (
    <>
      <AuthModal
        isOpen={true}
        onClose={() => setShowModal(false)}
        currentPath={location.pathname}
      />
      <Navigate to="/login" state={{ from: location.pathname }} replace />
    </>
  );
};

export default ProtectedRoute;
