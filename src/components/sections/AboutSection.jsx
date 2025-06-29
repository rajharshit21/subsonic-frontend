// Location: src/components/sections/AboutSection.jsx

import React from 'react';
import devPhoto from '../../assets/dev_photo.jpg'; // Replace with your photo in assets folder

const AboutSection = () => {
  return (
    <section
      id="about"
      className="w-full py-24 px-6 lg:px-20 bg-[#2D283E] text-white"
    >
      <div className="max-w-5xl mx-auto flex flex-col lg:flex-row items-center gap-12">
        {/* Left: Image */}
        <div className="flex-shrink-0 w-40 h-40 rounded-full overflow-hidden border-4 border-purple-700 shadow-lg">
          <img
            src={devPhoto}
            alt="Harshit Raj"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right: Text */}
        <div className="space-y-6 text-center lg:text-left">
          <h2 className="text-3xl font-bold">👨‍💻 About the Developer</h2>
          <p className="text-gray-300">
            I’m <strong>Harshit Raj</strong>, a final-year CSE student at Manipal University Jaipur with a passion for
            Audio Engineering, Machine Learning, and Full-Stack Development. From real-time AI pipelines to interactive
            UIs, I love building intelligent systems that make sound smarter.
          </p>
          <p className="text-gray-300">
            SubSonic is my dream project — blending everything I love: audio filters, AI, TTS, and sleek UI. I’ve also
            worked on <em>MUJConnect</em> and built a fun flower-pot ecommerce site with backend analytics.
          </p>
          <div className="flex gap-4 justify-center lg:justify-start">
            <a
              href="https://linkedin.com/in/harshittraj"
              target="_blank"
              className="bg-blue-600 hover:bg-blue-700 transition px-4 py-2 rounded text-white"
            >
              🔗 LinkedIn
            </a>
            <a
              href="https://github.com/rajharshit21"
              target="_blank"
              className="bg-gray-700 hover:bg-gray-800 transition px-4 py-2 rounded text-white"
            >
              💻 GitHub
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
