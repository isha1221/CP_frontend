import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const ResumeView = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");

  const [resume, setResume] = useState(null);

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:3333/resume/${id}`)
        .then((res) => setResume(res.data))
        .catch((err) => {
          console.error("Error fetching resume:", err);
          setResume(null);
        });
    }
  }, [id]);

  if (!resume) return <p>Loading resume...</p>;

  return (
    <div style={{ maxWidth: "600px", margin: "auto", padding: "20px" }}>
      <h2>Resume ID: {id}</h2>
      <p>
        <strong>Name:</strong> {resume.name}
      </p>
      <p>
        <strong>Email:</strong> {resume.email}
      </p>
      <p>
        <strong>Phone:</strong> {resume.phone}
      </p>
      <p>
        <strong>Skills:</strong>
      </p>
      <ul>
        {resume.skills?.map((skill, i) => (
          <li key={i}>{skill}</li>
        ))}
      </ul>
    </div>
  );
};

export default ResumeView;
