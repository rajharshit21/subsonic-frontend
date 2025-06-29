// Location: frontend/src/pages/Home.jsx

import React from 'react';
import HeroSection from '../components/sections/HeroSection';
import HowItWorks from '../components/sections/HowItWorks';
import ServicesSection from '../components/sections/ServicesSection';
import FeedbackSection from '../components/sections/FeedbackSection';
import FAQSection from '../components/sections/FAQSection';
import AboutSection from '../components/sections/AboutSection';
import Testimonials from '../components/sections/Testimonials';

const Home = () => {
  return (
    <div className="space-y-20 sm:space-y-32">
      <HeroSection />
      <HowItWorks />
      <ServicesSection />
      <FeedbackSection />
      <FAQSection />
      <AboutSection />
      <Testimonials />
    </div>
  );
};

export default Home;
