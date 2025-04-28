import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar';
import Footer from '../Footer';
import { useTheme } from '../ThemeContext';

const Layout = () => {
  const { theme } = useTheme();
  
  return (
    <div className={`app-container ${theme}`}>
      <Navbar />
      <main className="main-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;