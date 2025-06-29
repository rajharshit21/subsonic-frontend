// Location: frontend/src/App.jsx

import React, { useState } from 'react';
import Navbar from './components/shared/navbar';
import UploadForm from './api/transform/UploadForm';
import TTSForm from './api/transform/TTSForm';
import LiveMicStream from './components/forms/LiveMicStream';

function App() {
  const [rating, setRating] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="bg-slate-950 text-white font-sans min-h-screen">
      {/* --- Sticky Header --- */}
      <Navbar />

      {/* --- HERO SECTION --- */}
      <section className="min-h-screen flex flex-col justify-center items-center text-center px-6 lg:px-20 bg-gradient-to-br from-purple-950 to-slate-900 relative">
        <h1 className="text-6xl lg:text-7xl font-extrabold mb-6 drop-shadow-xl">🎙️ SubSonic</h1>
        <p className="text-xl lg:text-2xl text-purple-200 mb-8 max-w-3xl">
          Real-time voice transformation powered by AI. Upload, speak live, or type your voice into something new.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <button className="bg-purple-600 hover:bg-purple-700 text-white py-3 px-8 rounded-full font-bold shadow-lg">Get Started Now</button>
          <button className="border border-purple-500 hover:bg-purple-500 hover:text-white text-purple-300 py-3 px-8 rounded-full font-bold shadow-md">Watch Demo</button>
        </div>
      </section>

      {/* --- HOW IT WORKS --- */}
      <section className="py-24 px-6 lg:px-20 bg-slate-900">
        <h2 className="text-4xl font-bold text-center mb-16">✨ How SubSonic Works</h2>
        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto text-center">
          {[
            { title: 'Choose Method', icon: '🎛️', desc: 'Upload, speak or type to begin.' },
            { title: 'Fine-Tune Effects', icon: '🎚️', desc: 'Adjust pitch, tone, clarity & style.' },
            { title: 'Hear & Share', icon: '🎧', desc: 'Listen, tweak and share your new voice.' },
          ].map(({ title, icon, desc }, idx) => (
            <div key={idx} className="bg-slate-800 p-8 rounded-xl shadow-md border border-purple-700">
              <div className="text-5xl mb-4">{icon}</div>
              <h3 className="text-2xl font-semibold mb-2 text-purple-300">{title}</h3>
              <p className="text-gray-300">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* --- CORE SERVICES --- */}
      <section className="py-24 px-6 lg:px-20 bg-[#802BB1]/10">
        <h2 className="text-4xl font-bold text-center mb-16">🚀 Transform Your Audio</h2>
        <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto">
          <div className="bg-slate-800 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">📤 Upload & Transform</h3>
            <UploadForm />
          </div>
          <div className="bg-slate-800 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">🗣️ Text-to-Speech</h3>
            <TTSForm />
          </div>
          <div className="bg-slate-800 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">🎧 Live Mic</h3>
            <LiveMicStream />
          </div>
        </div>
      </section>

      {/* --- FEEDBACK --- */}
      <section className="py-24 px-6 lg:px-20 bg-slate-900">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">✍️ Share Your Feedback</h2>
          <form onSubmit={(e) => {
            e.preventDefault();
            localStorage.setItem('subsonic_feedback', JSON.stringify({ rating, message }));
            setSubmitted(true);
          }} className="space-y-6">
            <div className="flex justify-center gap-3 text-3xl">
              {['😡','😕','😐','😊','😍'].map((emoji, i) => (
                <button key={i} type="button" onClick={() => setRating(emoji)}
                  className={`hover:scale-110 transition-all ${rating === emoji ? 'ring-2 ring-purple-400 rounded' : ''}`}>{emoji}</button>
              ))}
            </div>
            <textarea
              rows="4"
              className="w-full p-3 text-black rounded"
              placeholder="Tell us what you think..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
            {!submitted ? (
              <button type="submit" className="bg-green-600 hover:bg-green-700 px-6 py-2 rounded">
                Submit Feedback
              </button>
            ) : (
              <div className="text-green-400">
                ✅ Thank you!
                <button
                  onClick={() => {
                    localStorage.removeItem('subsonic_feedback');
                    setRating(''); setMessage(''); setSubmitted(false);
                  }}
                  className="ml-4 underline text-red-300 hover:text-red-400">
                  Delete
                </button>
              </div>
            )}
          </form>
        </div>
      </section>

      {/* --- FAQ + ABOUT --- */}
      <section className="py-24 px-6 lg:px-20 bg-[#802BB1]/10">
        <div className="grid md:grid-cols-2 gap-16 max-w-6xl mx-auto">
          <div>
            <h2 className="text-3xl font-bold mb-6">❓ FAQs</h2>
            {[{ q: 'What is SubSonic?', a: 'SubSonic is an AI voice changer with pitch, style, clarity, and real-time processing.' },
              { q: 'How does live mic work?', a: 'It streams audio via WebSockets, transforms it, and plays it back live.' },
              { q: 'Is it free?', a: 'Yes, it’s an open-source project for learning and fun.' },
              { q: 'Do you store my voice?', a: 'No, unless you opt in for analytics. Otherwise it’s in-memory only.' },
            ].map(({q,a},i) => (
              <details key={i} className="group bg-slate-800 border border-purple-700 rounded-md p-4 mb-4">
                <summary className="flex justify-between cursor-pointer font-medium text-lg">
                  {q}<span className="text-purple-300 group-open:hidden">➕</span><span className="text-purple-300 hidden group-open:inline">➖</span>
                </summary>
                <p className="mt-2 text-sm text-gray-300">{a}</p>
              </details>
            ))}
          </div>
          <div className="space-y-6 text-center">
            <h2 className="text-3xl font-bold">👨‍💻 About Harshit</h2>
            <p className="text-gray-300">
              I'm <strong>Harshit Raj</strong>, a final-year CSE student passionate about real-time audio & ML. I’ve contributed to MUJConnect,
              launched an e-commerce site, and built SubSonic to fuse AI & UX.
            </p>
            <div className="flex justify-center gap-4">
              <a href="https://linkedin.com/in/harshittraj" target="_blank" className="bg-blue-700 hover:bg-blue-800 px-4 py-2 rounded">🔗 LinkedIn</a>
              <a href="https://github.com/rajharshit21" target="_blank" className="bg-gray-700 hover:bg-gray-800 px-4 py-2 rounded">💻 GitHub</a>
            </div>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="text-sm text-gray-400 text-center py-6">
        Built with ❤️ using React, Tailwind, FastAPI, and Coqui — by Harshit Raj & ChatGPT
      </footer>
    </div>
  );
}

export default App;
