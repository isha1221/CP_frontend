import React, { useState } from "react";
import axios from "axios";

const ResumeUpload = ({ onUploadSuccess }) => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [parsedData, setParsedData] = useState(null);

  const handleUpload = async () => {
    if (!file) return alert("Please select a PDF");

    const formData = new FormData();
    formData.append("file", file);

    try {
      setUploading(true);
      const res = await axios.post("http://localhost:8086/resume/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      const id = res.data.id;
      setParsedData(res.data);

      // 🔥 Call the callback from App.js
      if (onUploadSuccess) onUploadSuccess(id);
    //   setParsedData(res.data);
    } catch (err) {
      alert("❌ Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div style={{ maxWidth: "500px", margin: "auto" }}>
      <h2>Upload Resume PDF</h2>
      <input type="file" accept="application/pdf" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={handleUpload} disabled={uploading}>
        {uploading ? "Uploading..." : "Upload & Parse"}
      </button>

      {parsedData && (
        <div style={{ marginTop: "20px" }}>
          {/* <h3>Parsed Info:</h3>
          <pre>{JSON.stringify(parsedData, null, 2)}</pre> */}
        </div>
      )}
    </div>
  );
};

export default ResumeUpload;
