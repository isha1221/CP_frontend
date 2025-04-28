// import React from 'react';
// import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
// import HomePage from './HomePage';
// import ResumeEditPage from './ResumeEditPage';
// import ResumeListPage from './ResumeListPage';
// import NotFoundPage from './NotFoundPage';
// import Layout from './Layout';

// const AppRouter = () => {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<Layout />}>
//           <Route index element={<HomePage />} />
//           <Route path="resumes" element={<ResumeListPage />} />
//           <Route path="resume/:id" element={<ResumeEditPage />} />
//           <Route path="404" element={<NotFoundPage />} />
//           <Route path="*" element={<Navigate to="/404" replace />} />
//         </Route>
//       </Routes>
//     </BrowserRouter>
//   );
// };

// export default AppRouter;

import React from 'react';
import ProtectedRoute from './ProtectRoute';

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/Login';
import Signup from '../pages/SignUp';
import HomePage from '../pages/HomePage';
import ResumeEditor from '../components/resumeEditor';
import ResumeUpload from '../components/resumeUpload';
// import ProtectedRoute from './ProtectRoute';
import Header from '../layouts/Header';
import Footer from '../pages/Footer';
import { useAuth } from '../authentication/AuthContext';
import { useEffect,useState } from 'react';
import {useParams} from 'react-router-dom';
import AlertTriangle from '../components/AlertTriangle';
import LoadingSpinner from '../components/LoadingSpinner';
import axios from 'axios';

const AppRouter = () => {  const { isAuthenticated } = useAuth();

  return (
    <Router>
      <div className="app-container">
        <Header />
        <main className="main-content">
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/login" element={
              isAuthenticated ? <Navigate to="/home" /> : <Login />
            } />
            <Route path="/signup" element={
              isAuthenticated ? <Navigate to="/home" /> : <Signup />
            } />
            
            {/* Protected routes */}
            <Route path="/home" element={
              <ProtectedRoute>
                <HomePage/>
               </ProtectedRoute>
            } />
            <Route path="/upload" element={
              <ProtectedRoute>
                <ResumeUpload redirectToEdit={true} />
               </ProtectedRoute>
            } />
            <Route path="/resume/:id" element={
               <ProtectedRoute>
                <ResumeView />
              </ProtectedRoute>
            } />
            
            {/* 404 route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

// Simple components for completeness
const ResumeView = () => {
  // This component would fetch the resume by ID and render the ResumeEditor
  const { id } = useParams();
  const [resumeData, setResumeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResume = async () => {
      try {
        const response = await axios.get(`http://localhost:3333/resume/${id}`);
        setResumeData(response.data);
      } catch (err) {
        console.error("Failed to fetch resume:", err);
        setError("Failed to load resume data");
      } finally {
        setLoading(false);
      }
    };

    fetchResume();
  }, [id]);

  if (loading) {
    return (
      <div className="loading-container">
        <LoadingSpinner size={40} />
        <p>Loading resume data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <AlertTriangle size={48} />
        <h3>Error</h3>
        <p>{error}</p>
      </div>
    );
  }

  return <ResumeEditor resumeData={resumeData} resumeId={id} />;
};

const NotFound = () => (
  <div className="not-found">
    <h2>404 - Page Not Found</h2>
    <p>The page you are looking for does not exist.</p>
  </div>
);

export default AppRouter;