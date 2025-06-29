// Location: src/components/sections/FAQSection.jsx

import React from 'react';

const faqs = [
  {
    question: 'What is SubSonic?',
    answer: 'SubSonic is an AI-powered voice changer with pitch, clarity, effects, and real-time mic streaming.',
  },
  {
    question: 'How does the Live Mic feature work?',
    answer: 'It streams your voice using WebSockets, applies audio filters, and plays it back instantly.',
  },
  {
    question: 'Is my voice stored anywhere?',
    answer: 'Nope. Everything is processed in-memory unless you explicitly opt-in for logging or analytics.',
  },
  {
    question: 'Is SubSonic free to use?',
    answer: 'Yes! It’s open-source and built for students, audio engineers, and hobbyists alike.',
  },
  {
    question: 'Does it work on mobile?',
    answer: 'Absolutely! SubSonic is fully responsive and works on all modern devices.',
  },
];

const FAQSection = () => {
  return (
    <section
      id="faq"
      className="w-full py-24 bg-[#802BB1]/10 px-6 lg:px-20 text-white"
    >
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-10">❓ Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map(({ question, answer }, idx) => (
            <details
              key={idx}
              className="group bg-[#1F1B2E] border border-purple-600 rounded-lg p-5 transition-all"
            >
              <summary className="flex justify-between items-center cursor-pointer text-lg font-medium">
                <span>{question}</span>
                <span className="text-purple-300 group-open:hidden">➕</span>
                <span className="text-purple-300 hidden group-open:inline">➖</span>
              </summary>
              <p className="text-sm text-gray-300 mt-3 leading-relaxed">{answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
