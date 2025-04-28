import React from 'react';
import { useTheme } from '../layouts/ThemeContext';

const LoadingSpinner = ({ size = 24, color }) => {
  const { theme } = useTheme();
  
  // Use passed color or default based on theme
  const spinnerColor = color || (theme === 'light' ? '#0a9396' : '#50b2b2');
  
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      xmlns="http://www.w3.org/2000/svg"
      className="loading-spinner"
    >
      <circle 
        cx="12" 
        cy="12" 
        r="8" 
        fill="none" 
        stroke={spinnerColor} 
        strokeWidth="2" 
        strokeDasharray="32" 
        strokeLinecap="round"
      />
    </svg>
  );
};

export default LoadingSpinner;