// Location: src/components/shared/Footer.jsx

import React from 'react';
import { Github, Linkedin, Twitter } from 'lucide-react';

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#2D283E] text-gray-400 text-sm py-10 px-6 lg:px-20">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-center md:text-left">
          <h4 className="text-xl font-semibold text-white mb-1">SubSonic</h4>
          <p className="text-sm">Real-time voice transformation platform by Harshit Raj.</p>
        </div>

        <div className="flex gap-4 items-center">
          <a
            href="https://github.com/rajharshit21"
            target="_blank"
            rel="noreferrer"
            className="hover:text-white transition-colors"
          >
            <Github />
          </a>
          <a
            href="https://linkedin.com/in/harshittraj"
            target="_blank"
            rel="noreferrer"
            className="hover:text-white transition-colors"
          >
            <Linkedin />
          </a>
          <a
            href="https://x.com"
            target="_blank"
            rel="noreferrer"
            className="hover:text-white transition-colors"
          >
            <Twitter />
          </a>
        </div>
      </div>

      <div className="text-center mt-6 border-t border-purple-800/40 pt-4 text-xs">
        © {year} SubSonic. All rights reserved. | Built with ❤️ using React, Tailwind, FastAPI, and Coqui
      </div>
    </footer>
  );
}

export default Footer;
