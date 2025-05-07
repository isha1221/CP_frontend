import React from "react";
import "./App.css";
import { ThemeProvider } from "./layouts/ThemeContext";
import { AuthProvider } from "./authentication/AuthContext";
import AppRouter from "./routes/AppRouter";

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
