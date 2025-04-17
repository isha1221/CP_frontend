
import './App.css';
import ResumeUpload from './components/resumeUpload';
import ResumeEditor from './components/resumeEditor';
import { useState } from 'react';

function App() {
  const [resumeId, setResumeId] = useState(null);
  return (
     <div className="App">
      <h1>Resume Editor & Career Predictor</h1>
      <ResumeUpload onUploadSuccess={(id) => setResumeId(id)} />

      {resumeId && (
        <div style={{ marginTop: '40px' }}>
          <ResumeEditor resumeId={resumeId} />
        </div>
      )}
    </div>
  );
}

export default App;
