// Location: src/components/shared/ScrollIndicator.jsx

import React from 'react';
import { ChevronDown } from 'lucide-react';

const ScrollIndicator = () => {
  return (
    <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 animate-bounce z-10">
      <ChevronDown className="text-purple-400 w-8 h-8 opacity-80 hover:opacity-100 transition-opacity" />
    </div>
  );
};

export default ScrollIndicator;
