// Location: src/components/navbar.jsx

import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    // Close mobile menu when navigating
    setIsOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Upload', to: '/upload' },
    { name: 'Record', to: '/record' },
    { name: 'Analytics', to: '/analytics' },
    { name: 'Live Mic', to: '/live' },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'backdrop-blur-md bg-[#2D283E]/80 shadow-md' : 'bg-[#2D283E]'}`}>
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Brand */}
        <div className="text-2xl font-bold flex items-center gap-2">
          
          <span className="bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text">
            SubSonic
          </span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-6 font-medium text-[#D1D7E0]">
          {navLinks.map(({ name, to }) => (
            <Link
              key={to}
              to={to}
              className="relative group hover:text-white transition"
            >
              {name}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-500 transition-all group-hover:w-full duration-300" />
            </Link>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-[#D1D7E0] focus:outline-none"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-[#2D283E] border-t border-purple-700 px-6 pb-4 space-y-3 text-sm font-medium">
          {navLinks.map(({ name, to }) => (
            <Link
              key={to}
              to={to}
              className="block text-[#D1D7E0] hover:text-white transition"
            >
              {name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
