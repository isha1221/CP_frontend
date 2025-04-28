import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { File, Edit, Trash2, Upload, AlertCircle } from 'lucide-react';
import LoadingSpinner from '../components/LoadingSpinner';

const ResumesPage = () => {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchResumes();
  }, []);

  const fetchResumes = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:3333/resume/list');
      setResumes(response.data);
      setError(null);
    } catch (err) {
      console.error('Failed to fetch resumes:', err);
      setError('Failed to load your resumes. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleView = (resumeId) => {
    // Open the PDF in a new tab
    window.open(`http://localhost:3333/resume/view/${resumeId}`, '_blank');
  };

  const handleEdit = (resumeId) => {
    navigate(`/resume/${resumeId}`);
  };

  const handleDelete = async (resumeId) => {
    if (window.confirm('Are you sure you want to delete this resume?')) {
      try {
        await axios.delete(`http://localhost:3333/resume/${resumeId}`);
        // Remove the deleted resume from the state
        setResumes(resumes.filter(resume => resume.id !== resumeId));
      } catch (err) {
        console.error('Failed to delete resume:', err);
        setError('Failed to delete resume. Please try again.');
      }
    }
  };

  if (loading) {
    return (
      <div className="resumes-page loading">
        <LoadingSpinner size={48} />
        <p>Loading your resumes...</p>
      </div>
    );
  }

  return (
    <div className="resumes-page">
      <div className="page-header">
        <h1>My Resumes</h1>
        <button 
          className="button primary"
          onClick={() => navigate('/')}
        >
          <Upload size={16} />
          <span>Upload New Resume</span>
        </button>
      </div>

      {error && (
        <div className="error-message">
          <AlertCircle size={24} />
          <p>{error}</p>
        </div>
      )}

      {resumes.length === 0 ? (
        <div className="no-resumes">
          <File size={64} />
          <h2>No Resumes Found</h2>
          <p>You haven't uploaded any resumes yet. Get started by uploading your first resume.</p>
          <button 
            className="button primary"
            onClick={() => navigate('/')}
          >
            <Upload size={16} />
            <span>Upload Resume</span>
          </button>
        </div>
      ) : (
        <div className="resume-list">
          {resumes.map(resume => (
            <div key={resume.id} className="resume-card">
              <div className="resume-icon">
                <File size={32} />
              </div>
              <div className="resume-details">
                <h3>{resume.filename || 'Resume'}</h3>
                <p>Uploaded: {new Date(resume.uploadDate).toLocaleDateString()}</p>
              </div>
              <div className="resume-actions">
                <button 
                  className="button icon"
                  onClick={() => handleView(resume.id)}
                  title="View Resume"
                >
                  <File size={20} />
                </button>
                <button 
                  className="button icon"
                  onClick={() => handleEdit(resume.id)}
                  title="Edit Resume"
                >
                  <Edit size={20} />
                </button>
                <button 
                  className="button icon danger"
                  onClick={() => handleDelete(resume.id)}
                  title="Delete Resume"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ResumesPage;