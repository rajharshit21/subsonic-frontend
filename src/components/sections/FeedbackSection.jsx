import React, { useState } from 'react';
import PageLayout from '../../layout/PageLayout';
import UploadForm from '../../api/transform/UploadForm';
import TTSForm from '../../api/transform/TTSForm';
import LiveMicStream from '../forms/LiveMicStream';
import CTAButtons from '../UI/CTAButtons';

function App() {
  const [rating, setRating] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  return (
    <>
      {/* FEEDBACK */}
      <section className="py-24 bg-slate-900">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">✍️ Share Your Feedback</h2>
          <form onSubmit={(e) => {
            e.preventDefault();
            localStorage.setItem('subsonic_feedback', JSON.stringify({ rating, message }));
            setSubmitted(true);
          }} className="space-y-6">
            <div className="flex justify-center gap-3 text-3xl">
              {['😡', '😕', '😐', '😊', '😍'].map((emoji, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setRating(emoji)}
                  aria-label={`Rating ${i + 1}`}
                  className={`hover:scale-110 transition-all ${rating === emoji ? 'ring-2 ring-purple-400 rounded' : ''}`}
                >
                  {emoji}
                </button>
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
                  className="ml-4 underline text-red-300 hover:text-red-400"
                >
                  Delete
                </button>
              </div>
            )}
          </form>
        </div>
      </section>
    </>
  );
}

export default App;
