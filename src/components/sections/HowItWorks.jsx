// Location: src/components/sections/HowItWorks.jsx

import React from 'react';
import { Upload, Sliders, Headphones, MousePointerClick } from 'lucide-react';

const steps = [
  {
    title: 'Choose Input',
    icon: <Upload size={36} className="text-purple-400" />,
    desc: 'Upload a file, type text, or speak live via mic — your voice, your way.',
  },
  {
    title: 'Fine-Tune AI',
    icon: <Sliders size={36} className="text-purple-400" />,
    desc: 'Select filters like pitch, clarity, or style. Customize your transformation.',
  },
  {
    title: 'Hear & Download',
    icon: <Headphones size={36} className="text-purple-400" />,
    desc: 'Preview in real-time or download the final audio in high quality.',
  },
  {
    title: 'Share or Integrate',
    icon: <MousePointerClick size={36} className="text-purple-400" />,
    desc: 'Easily share results or integrate into your workflow or content.',
  },
];

const HowItWorks = () => {
  return (
    <section
      id="how-it-works"
      className="w-full py-24 px-6 lg:px-20 bg-[#0F0F1C] text-white"
    >
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12">
          ✨ Unleash Your New Voice
        </h2>

        {/* Scroll snapping container */}
        <div className="flex flex-col md:flex-row overflow-x-auto md:overflow-x-scroll snap-x snap-mandatory gap-8 scrollbar-thin scrollbar-thumb-purple-500 pb-4">
          {steps.map((step, index) => (
            <div
              key={index}
              className="snap-center shrink-0 bg-[#1A1A2E] border border-purple-800 rounded-xl p-6 min-w-[280px] md:min-w-[320px] max-w-md mx-auto md:mx-0 shadow-md transition hover:shadow-xl hover:-translate-y-1 duration-300"
            >
              <div className="mb-4">{step.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{`Step ${index + 1}: ${step.title}`}</h3>
              <p className="text-sm text-purple-200">{step.desc}</p>
            </div>
          ))}
        </div>

        {/* Pagination dots */}
        <div className="mt-8 flex justify-center space-x-2">
          {steps.map((_, i) => (
            <span
              key={i}
              className="w-3 h-3 bg-purple-600 rounded-full opacity-50 hover:opacity-100 transition"
            ></span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
