import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FileText, Trash2, Edit, Plus, RefreshCw, AlertTriangle } from 'lucide-react';
import LoadingSpinner from '../LoadingSpinner';

const ResumeListPage = () => {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchResumes();
  }, []);

  const fetchResumes = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:3333/resumes');
      setResumes(response.data);
      setError(null);
    } catch (err) {
      console.error('Failed to fetch resumes:', err);
      setError('Failed to load resumes. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (window.confirm('Are you sure you want to delete this resume?')) {
      try {
        await axios.delete(`http://localhost:3333/resume/${id}`);
        setResumes(resumes.filter(resume => resume.id !== id));
      } catch (err) {
        console.error('Failed to delete resume:', err);
        alert('Failed to delete resume. Please try again.');
      }
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <LoadingSpinner size={40} />
        <p>Loading your resumes...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <AlertTriangle size={48} className="error-icon" />
        <h2>Error</h2>
        <p>{error}</p>
        <button className="button" onClick={fetchResumes}>
          <RefreshCw size={16} />
          <span>Try Again</span>
        </button>
      </div>
    );
  }

  return (
    <div className="resume-list-page">
      <div className="page-header">
        <h1>My Resumes</h1>
        <Link to="/" className="button primary">
          <Plus size={16} />
          <span>Add New Resume</span>
        </Link>
      </div>

      {resumes.length === 0 ? (
        <div className="empty-state">
          <FileText size={48} className="empty-icon" />
          <h2>No Resumes Found</h2>
          <p>Upload your first resume to get started.</p>
          <Link to="/" className="button primary">
            <Plus size={16} />
            <span>Upload Resume</span>
          </Link>
        </div>
      ) : (
        <div className="resume-grid">
          {resumes.map(resume => (
            <Link to={`/resume/${resume.id}`} key={resume.id} className="resume-card">
              <div className="resume-icon">
                <FileText size={24} />
              </div>
              <div className="resume-info">
                <h3>{resume.name || 'Unnamed Resume'}</h3>
                <p>{resume.email || 'No email'}</p>
                <p className="resume-skills">
                  {resume.skills && resume.skills.slice(0, 3).join(', ')}
                  {resume.skills && resume.skills.length > 3 ? '...' : ''}
                </p>
              </div>
              <div className="resume-actions">
                <button 
                  className="icon-button edit"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    window.location.href = `/resume/${resume.id}`;
                  }}
                >
                  <Edit size={16} />
                </button>
                <button 
                  className="icon-button delete"
                  onClick={(e) => handleDelete(resume.id, e)}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default ResumeListPage;