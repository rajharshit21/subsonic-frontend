// Location: src/components/sections/ServicesSection.jsx

import React from 'react';
import UploadForm from '../../api/transform/UploadForm';
import TTSForm from '../../api/transform/TTSForm';
import LiveMicStream from '../forms/LiveMicStream';
import { UploadCloud, Mic, MessageCircle } from 'lucide-react';

const ServiceCard = ({ icon, title, description, children }) => (
  <div className="bg-[#1A1A2E] border border-purple-800 rounded-xl p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
    <div className="mb-4 text-purple-400">{icon}</div>
    <h3 className="text-xl font-bold mb-2 text-white">{title}</h3>
    <p className="text-sm text-purple-200 mb-4">{description}</p>
    <div>{children}</div>
  </div>
);

const ServicesSection = () => {
  return (
    <section
      id="services"
      className="w-full py-24 px-6 lg:px-20 bg-[#0F0F1C] text-white"
    >
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-12">🚀 Transform Your Audio</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <ServiceCard
            icon={<UploadCloud size={36} />}
            title="📤 Upload & Transform"
            description="Upload any audio file and apply voice effects like pitch, speed, clarity, autotune, or AI-based style transfer."
          >
            <UploadForm />
          </ServiceCard>

          <ServiceCard
            icon={<MessageCircle size={36} />}
            title="🗣️ Text-to-Speech"
            description="Type what you want to say and hear it spoken in dynamic voices powered by AI."
          >
            <TTSForm />
          </ServiceCard>

          <ServiceCard
            icon={<Mic size={36} />}
            title="🎧 Live Mic Stream"
            description="Speak in real-time and hear your transformed voice instantly using WebSockets."
          >
            <LiveMicStream />
          </ServiceCard>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
