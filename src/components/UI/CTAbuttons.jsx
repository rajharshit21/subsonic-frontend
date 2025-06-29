// Location: src/components/ui/CTAButtons.jsx

import React from 'react';
import { Link } from 'react-router-dom';

const variantStyles = {
  primary: 'bg-purple-600 text-white hover:bg-purple-700',
  secondary: 'bg-gray-700 text-white hover:bg-gray-600',
  outline: 'border border-purple-500 text-purple-500 hover:bg-purple-500 hover:text-white',
  disabled: 'bg-gray-400 text-white cursor-not-allowed opacity-50',
};

const CTAButton = ({ label, to = '#', variant = 'primary', icon: Icon, disabled = false, external = false }) => {
  const baseStyle =
    'inline-flex items-center justify-center px-5 py-3 rounded-xl font-semibold text-sm transition-all duration-300 shadow-md';

  const classes = `${baseStyle} ${variantStyles[variant] || ''} ${disabled ? variantStyles.disabled : ''}`;

  const content = (
    <>
      {Icon && <Icon className="w-4 h-4 mr-2" />}
      {label}
    </>
  );

  return external ? (
    <a href={to} className={classes} target="_blank" rel="noopener noreferrer">
      {content}
    </a>
  ) : (
    <Link to={to} className={classes}>
      {content}
    </Link>
  );
};

export default CTAButton;
