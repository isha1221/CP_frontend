import React from 'react';
import { Link } from 'react-router-dom';
import { Upload, Award, BarChart2, FileSearch } from 'lucide-react';
import ResumeUpload from '../components/resumeUpload';

const HomePage = () => {
  return (
    <div className="home-page">
      <section className="hero">
        <div className="hero-content">
          <h1>Optimize Your Career Path with AI</h1>
          <p>Upload your resume, discover potential career paths, and get personalized recommendations.</p>
          <Link to="/resumes/${id}" className="cta-button">
            <FileSearch size={20} />
            <span>View My Resumes</span>
          </Link>
        </div>
        <div className="hero-image">
          <img src="/api/placeholder/500/320" alt="Career analysis visualization" />
        </div>
      </section>

      <section className="features">
        <h2>How It Works</h2>
        <div className="feature-grid">
          <div className="feature-card">
            <div className="feature-icon">
              <Upload size={32} />
            </div>
            <h3>Upload Your Resume</h3>
            <p>Securely upload your resume in PDF format for analysis.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <FileSearch size={32} />
            </div>
         
            <h3>AI-Powered Analysis</h3>
            <p>Our AI extracts key skills and experience from your resume.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <BarChart2 size={32} />
            </div>
            <h3>Career Predictions</h3>
            <p>Get data-driven career path suggestions based on your profile.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <Award size={32} />
            </div>
            <h3>Optimization Tips</h3>
            <p>Receive personalized recommendations to enhance your resume.</p>
          </div>
        </div>
      </section>
      

      <section className="upload-section">
        <h2>Get Started Now</h2>
        <p>Upload your resume and start your career optimization journey.</p>
        <ResumeUpload redirectToEdit={true} />
      </section>
    </div>
  );
};

export default HomePage;


