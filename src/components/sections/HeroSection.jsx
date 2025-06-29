// Location: src/components/sections/HeroSection.jsx

import React from 'react';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-[#1A1A2E] via-[#2D283E] to-[#0F0F1C] text-white flex items-center justify-center text-center px-6 lg:px-20 overflow-hidden">
      {/* Background animation blur blobs */}
      <div className="absolute top-[-100px] left-[-100px] w-[300px] h-[300px] bg-purple-700 opacity-30 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-[-80px] right-[-80px] w-[200px] h-[200px] bg-pink-600 opacity-30 rounded-full blur-2xl animate-ping"></div>

      {/* Main content */}
      <div className="z-10 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 tracking-tight drop-shadow-glow">
          🎙️ SubSonic
        </h1>
        <p className="text-xl md:text-2xl text-purple-200 mb-10">
          Real-time voice transformation powered by AI.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <a
            href="#services"
            className="bg-[#802BB1] hover:bg-[#6e24a1] text-white px-8 py-3 rounded-full text-lg shadow-lg hover:scale-105 transition-all"
          >
            🚀 Get Started Now
          </a>
          <button
            onClick={() => document.getElementById('demoVideo').showModal()}
            className="border border-purple-500 text-purple-300 hover:text-white hover:border-white px-8 py-3 rounded-full text-lg transition-all"
          >
            🎬 Watch Demo
          </button>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="animate-bounce text-3xl text-purple-400">⬇️</div>
        </div>
      </div>

      {/* Inline demo modal */}
      <dialog id="demoVideo" className="modal backdrop:bg-black/70">
        <div className="modal-box bg-[#1A1A2E] text-white max-w-3xl p-6 rounded-lg shadow-xl">
          <h3 className="font-bold text-2xl mb-4">📹 SubSonic Demo</h3>
          <div className="w-full aspect-video rounded overflow-hidden mb-4">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ" // Placeholder 👀
              title="SubSonic Demo"
              allowFullScreen
            ></iframe>
          </div>
          <div className="modal-action">
            <form method="dialog">
              <button className="px-4 py-2 rounded bg-purple-700 hover:bg-purple-800 transition">
                Close
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </section>
  );
};

export default HeroSection;
