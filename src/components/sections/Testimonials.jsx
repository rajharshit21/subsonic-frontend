// Location: src/components/sections/Testimonials.jsx

import React from 'react';

const testimonials = [
  {
    name: 'Aarav Mehta',
    feedback: 'Incredible voice quality and so easy to use! SubSonic is a game-changer.',
  },
  {
    name: 'Sarah Lin',
    feedback: 'Real-time mic feedback is surreal. Felt like magic using it on stream.',
  },
  {
    name: 'Elijah Kapoor',
    feedback: 'The AI voice styles are 🔥. Can’t wait to see what comes next!',
  },
  {
    name: 'Meena Sharma',
    feedback: 'SubSonic made my audio recordings so much cleaner. Loved the clarity boost!',
  },
  {
    name: 'Dev Patel',
    feedback: 'Fun, fast, and futuristic. SubSonic is seriously next-level tech.',
  },
];

const Testimonials = () => {
  return (
    <section
      id="testimonials"
      className="w-full py-24 px-6 lg:px-20 bg-[#802BB1]/10 text-white"
    >
      <div className="max-w-6xl mx-auto text-center space-y-12">
        <h2 className="text-3xl font-bold">🌟 What Users Are Saying</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map(({ name, feedback }, idx) => (
            <div
              key={idx}
              className="bg-[#2D283E] border border-purple-700/30 p-6 rounded-xl shadow-lg hover:scale-[1.02] transition-transform duration-300"
            >
              <p className="text-gray-300 italic mb-4">“{feedback}”</p>
              <p className="text-purple-400 font-semibold">— {name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
