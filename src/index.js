import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { PostHogProvider} from 'posthog-js/react';
// import dotenv from 'dotenv'

// dotenv.config()
const options = {
  api_host: process.env.REACT_APP_PUBLIC_POSTHOG_HOST,
}


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <PostHogProvider 
      apiKey={process.env.REACT_APP_PUBLIC_POSTHOG_KEY}
      options={options}
    >
      <App />
    </PostHogProvider>
  </React.StrictMode>
);
