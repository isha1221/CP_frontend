import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Upload, File, CheckCircle, AlertTriangle } from "lucide-react";
import LoadingSpinner from "./LoadingSpinner";

const ResumeUpload = ({ redirectToEdit = false }) => {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a PDF file first");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setUploading(true);
      setError(null);
      
      const res = await axios.post("http://localhost:3333/resume/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      
      setUploadSuccess(true);
      
      // If redirectToEdit flag is true, navigate to the edit page
      if (redirectToEdit && res.data?.id) {
        setTimeout(() => {
          navigate(`/resume/${res.data.id}`);
        }, 1500); // Short delay to show success message
      }
    } catch (err) {
      console.error("Upload failed:", err);
      setError("Failed to upload resume. Please try again.");
      setUploadSuccess(false);
    } finally {
      setUploading(false);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = e.dataTransfer.files;
    if (files && files[0] && files[0].type === "application/pdf") {
      setFile(files[0]);
      setError(null);
    } else {
      setError("Please upload a PDF file");
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(selectedFile);
      setError(null);
    } else if (selectedFile) {
      setError("Please upload a PDF file");
      e.target.value = null;
    }
  };

  const openFileDialog = () => {
    fileInputRef.current.click();
  };

  const resetUpload = () => {
    setFile(null);
    setUploadSuccess(false);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="resume-upload">
      <div 
        className={`drop-area ${dragActive ? 'active' : ''} ${error ? 'error' : ''}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={openFileDialog}
      >
        <input 
          ref={fileInputRef}
          type="file" 
          accept="application/pdf" 
          onChange={handleFileChange}
          className="file-input"
        />
        
        {!file && !uploading && !uploadSuccess && (
          <div className="upload-prompt">
            <Upload size={48} className="upload-icon" />
            <h3>Upload Your Resume</h3>
            <p>Drag & drop a PDF file here, or click to browse</p>
          </div>
        )}
        
        {file && !uploading && !uploadSuccess && (
          <div className="file-selected">
            <File size={32} className="file-icon" />
            <div className="file-info">
              <h4>{file.name}</h4>
              <p>{(file.size / 1024).toFixed(1)} KB</p>
            </div>
          </div>
        )}
        
        {uploading && (
          <div className="uploading-state">
            <LoadingSpinner size={48} />
            <h3>Uploading Resume</h3>
            <p>Please wait while we analyze your document...</p>
          </div>
        )}
        
        {uploadSuccess && (
          <div className="success-state">
            <CheckCircle size={48} className="success-icon" />
            <h3>Upload Successful!</h3>
            <p>{redirectToEdit ? "Redirecting to editor..." : "Your resume has been uploaded."}</p>
          </div>
        )}
        
        {error && (
          <div className="error-state">
            <AlertTriangle size={32} className="error-icon" />
            <p>{error}</p>
          </div>
        )}
      </div>
      
      {file && !uploading && !uploadSuccess && (
        <button 
          className="button primary upload-button"
          onClick={(e) => {
            e.stopPropagation();
            handleUpload();
          }}
          disabled={uploading}
        >
          {uploading ? (
            <>
              <LoadingSpinner size={16} />
              <span>Uploading...</span>
            </>
          ) : (
            <>
              <Upload size={16} />
              <span>Upload Resume</span>
            </>
          )}
        </button>
      )}
      
      {uploadSuccess && !redirectToEdit && (
        <button 
          className="button secondary"
          onClick={resetUpload}
        >
          <Upload size={16} />
          <span>Upload Another</span>
        </button>
      )}
      
      {error && file && (
        <button 
          className="button secondary"
          onClick={resetUpload}
        >
          <AlertTriangle size={16} />
          <span>Try Again</span>
        </button>
      )}
    </div>
  );
};

export default ResumeUpload;


