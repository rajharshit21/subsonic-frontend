// Location: frontend/src/layout/PageLayout.jsx

import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/shared/navbar';
import Footer from '../components/shared/footer'; // Optional footer
import { Outlet } from 'react-router-dom';

const PageLayout = ({ children }) => {
  const location = useLocation();

  useEffect(() => {
    // Auto scroll to top on route change
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-[#2D283E] text-[#D1D7E0] dark:bg-[#2D283E] dark:text-[#D1D7E0]">
      <Navbar />
      <main className="max-w-7xl mx-auto pt-24 px-4 sm:px-6 lg:px-8">
          <Outlet /> {/* Instead of {children} */}
        {children}
      </main>
      <Footer /> {/* Comment out if not needed */}
    </div>
  );
};

export default PageLayout;
