import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const ResumeEditor = ({ resumeId }) => {
  const [form, setForm] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [predicting, setPredicting] = useState(false);
  const [error, setError] = useState(null);

  // Fetch resume data
  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:8086/resume/${resumeId}`)
      .then((res) => setForm(res.data))
      .catch((err) => setError("Failed to load resume."))
      .finally(() => setLoading(false));
  }, [resumeId]);

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const handleSubmit = () => {
    axios
      .put(`http://localhost:8086/resume/${resumeId}`, form)
      .then(() => alert("✅ Resume updated!"))
      .catch(() => alert("❌ Failed to update resume."));
  };

  const handlePredict = () => {
    setPredicting(true);
    axios
      .post(`http://localhost:8086/resume/predict-career/${resumeId}`)
      .then((res) => setPrediction(res.data))
      .catch(() => alert("❌ Prediction failed."))
      .finally(() => setPredicting(false));
  };

  if (loading) return <p>🔄 Loading resume...</p>;
  if (error) return <p>{error}</p>;
  if (!form) return null;

  return (
    <div className="editor" style={{ maxWidth: "600px", margin: "auto" }}>
      <h2>Edit Resume</h2>

      <input
        value={form.name}
        onChange={(e) => handleChange("name", e.target.value)}
        placeholder="Name"
        style={{ width: "100%", marginBottom: "10px" }}
      />

      <input
        value={form.email}
        onChange={(e) => handleChange("email", e.target.value)}
        placeholder="Email"
        style={{ width: "100%", marginBottom: "10px" }}
      />

      <input
        value={form.phone}
        onChange={(e) => handleChange("phone", e.target.value)}
        placeholder="Phone"
        style={{ width: "100%", marginBottom: "10px" }}
      />

      <textarea
        value={form.skills.join(", ")}
        onChange={(e) =>
          handleChange(
            "skills",
            e.target.value.split(",").map((s) => s.trim())
          )
        }
        placeholder="Skills (comma separated)"
        style={{ width: "100%", height: "80px", marginBottom: "10px" }}
      />

      <button onClick={handleSubmit} style={{ marginRight: "10px" }}>
        Save Resume
      </button>
      <button onClick={handlePredict} disabled={predicting}>
        {predicting ? "Predicting..." : "Predict Career"}
      </button>

      {prediction && (
        <div style={{ marginTop: "30px" }}>
          <h3>Top Career Predictions</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={prediction.top_predictions.map((career, i) => ({
                name: career,
                probability: prediction.probabilities[i],
              }))}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Bar dataKey="probability" fill="#4b8bbe" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default ResumeEditor;
