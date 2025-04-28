import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ResumeEditor from '../components/resumeEditor';
import LoadingSpinner from '../LoadingSpinner';
import axios from 'axios';
import { ArrowLeft, AlertTriangle } from 'lucide-react';

const ResumeEditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [resumeData, setResumeData] = useState(null);

  useEffect(() => {
    const fetchResumeData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:3333/resume/${id}`);
        setResumeData(response.data);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch resume:', err);
        setError('Failed to load resume data. Please try again later.');
      } finally {
        setLoading(false);
      } 
    };

    if (id) {
      fetchResumeData();
    }
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
        <AlertTriangle size={48} className="error-icon" />
        <h2>Error</h2>
        <p>{error}</p>
        <button className="button" onClick={() => navigate('/resumes')}>
          <ArrowLeft size={16} />
          <span>Back to Resumes</span>
        </button>
      </div>
    );
  }

  return (
    <div className="resume-edit-page">
      <div className="page-header">
        <button className="back-button" onClick={() => navigate('/resumes')}>
          <ArrowLeft size={16} />
          <span>Back to Resumes</span>
        </button>
        <h1>Edit Resume</h1>
      </div>
      
      {resumeData && <ResumeEditor resumeData={resumeData} resumeId={id} />}
    </div>
  );
};

export default ResumeEditPage;