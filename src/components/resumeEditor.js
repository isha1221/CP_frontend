import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { Save, Zap, Plus, X, AlertTriangle } from "lucide-react";
import LoadingSpinner from "./LoadingSpinner";

const ResumeEditor = ({ resumeData, resumeId }) => {
  const navigate = useNavigate();
  const [form, setForm] = useState(resumeData);
  const [prediction, setPrediction] = useState(null);
  const [saving, setSaving] = useState(false);
  const [predicting, setPredicting] = useState(false);
  const [error, setError] = useState(null);
  const [newSkill, setNewSkill] = useState("");

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const handleSubmit = async () => {
    try {
      setSaving(true);
      await axios.put(`http://localhost:3333/resume/${resumeId}`, form);
      
      // Success toast notification would go here
      setError(null);
    } catch (err) {
      console.error('Failed to update resume:', err);
      setError('Failed to save resume. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handlePredict = async () => {
    try {
      setPredicting(true);
      const res = await axios.post(`http://localhost:3333/resume/predict-career/${resumeId}`);
      setPrediction(res.data);
      setError(null);
    } catch (err) {
      console.error('Prediction failed:', err);
      setError('Failed to generate career predictions. Please try again.');
    } finally {
      setPredicting(false);
    }
  };

  const addSkill = () => {
    if (newSkill.trim()) {
      setForm({
        ...form,
        skills: [...form.skills, newSkill.trim()]
      });
      setNewSkill("");
    }
  };

  const removeSkill = (skillToRemove) => {
    setForm({
      ...form,
      skills: form.skills.filter(skill => skill !== skillToRemove)
    });
  };

  // Custom tooltip for the chart
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="tooltip-label">{`${label}`}</p>
          <p className="tooltip-value">{`Probability: ${payload[0].value.toFixed(1)}%`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="resume-editor">
      {error && (
        <div className="error-message">
          <AlertTriangle size={18} />
          <span>{error}</span>
        </div>
      )}

      <div className="editor-grid">
        <div className="form-section">
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              id="name"
              value={form.name}
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder="Enter your full name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              value={form.email}
              onChange={(e) => handleChange("email", e.target.value)}
              placeholder="Enter your email address"
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input
              id="phone"
              value={form.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              placeholder="Enter your phone number"
            />
          </div>

          <div className="form-group">
            <label>Skills</label>
            <div className="skills-input-container">
              <input
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                placeholder="Add a skill"
                onKeyPress={(e) => e.key === 'Enter' && addSkill()}
              />
              <button 
                className="icon-button add-skill" 
                onClick={addSkill}
                disabled={!newSkill.trim()}
              >
                <Plus size={16} />
              </button>
            </div>
            
            <div className="skills-list">
              {form.skills.map((skill) => (
                <div key={skill} className="skill-tag">
                  <span>{skill}</span>
                  <button 
                    className="remove-skill" 
                    onClick={() => removeSkill(skill)}
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="button-group">
            <button 
              className="button primary" 
              onClick={handleSubmit}
              disabled={saving}
            >
              {saving ? (
                <>
                  <LoadingSpinner size={16} />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Save size={16} />
                  <span>Save Changes</span>
                </>
              )}
            </button>
            
            <button 
              className="button secondary"
              onClick={handlePredict}
              disabled={predicting}
            >
              {predicting ? (
                <>
                  <LoadingSpinner size={16} />
                  <span>Analyzing...</span>
                </>
              ) : (
                <>
                  <Zap size={16} />
                  <span>Predict Career</span>
                </>
              )}
            </button>
          </div>
        </div>

        <div className="prediction-section">
          {predicting ? (
            <div className="loading-predictions">
              <LoadingSpinner size={40} />
              <p>Analyzing your resume and skills...</p>
            </div>
          ) : prediction ? (
            <div className="prediction-results">
              <h3>Top Career Predictions</h3>
              <div className="chart-container">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart
                    data={prediction.top_predictions.map((career, i) => ({
                      name: career,
                      probability: prediction.probabilities[i],
                    }))}
                    margin={{ top: 10, right: 30, left: 0, bottom: 40 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--chart-grid)" />
                    <XAxis 
                      dataKey="name" 
                      tick={{ fill: 'var(--text-color)' }} 
                      angle={-45}
                      textAnchor="end"
                      height={70}
                    />
                    <YAxis 
                      domain={[0, 100]} 
                      tick={{ fill: 'var(--text-color)' }}
                      label={{ 
                        value: 'Match %', 
                        angle: -90, 
                        position: 'insideLeft',
                        fill: 'var(--text-color)' 
                      }}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar 
                      dataKey="probability" 
                      fill="var(--chart-bar)" 
                      radius={[5, 5, 0, 0]}
                      animationDuration={1500}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          ) : (
            <div className="empty-predictions">
              <Zap size={48} className="prediction-icon" />
              <h3>Career Predictions</h3>
              <p>Click "Predict Career" to analyze your resume and get insights on matching career paths.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResumeEditor;