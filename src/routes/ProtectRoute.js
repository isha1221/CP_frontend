// import React, { useState } from "react";
// import { Navigate, useLocation } from "react-router-dom";
// import { useAuth } from "../authentication/AuthContext";
// import AuthModal from "../authentication/AuthModel";

// const ProtectedRoute = ({ children }) => {
//   const { isAuthenticated, loading } = useAuth();
//   const location = useLocation();
//   const [showModal, setShowModal] = useState(false);

//   // If still loading auth state, show a loading spinner
//   if (loading) {
//     return (
//       <div className="loading-container">
//         <div className="loading-spinner"></div>
//       </div>
//     );
//   }

//   // If user is authenticated, show the protected content
//   if (isAuthenticated) {
//     return children;
//   }

//   // If not loading and not authenticated, show the auth modal
//   return (
//     <>
//       <AuthModal
//         isOpen={true}
//         onClose={() => setShowModal(false)}
//         currentPath={location.pathname}
//       />
//       <Navigate to="/login" state={{ from: location.pathname }} replace />
//     </>
//   );
// };

// export default ProtectedRoute;

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
