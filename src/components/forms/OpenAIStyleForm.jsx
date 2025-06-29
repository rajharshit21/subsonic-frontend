// Location: src/components/forms/OpenAIStyleForm.jsx

import React, { useState } from 'react';
import axios from 'axios';
import { Loader2, UploadCloud, Sparkles } from 'lucide-react';

const OpenAIStyleForm = () => {
  const [file, setFile] = useState(null);
  const [stylePrompt, setStylePrompt] = useState('');
  const [styledAudioUrl, setStyledAudioUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const f = e.target.files[0];
    setFile(f);
    setStyledAudioUrl(null);
  };

  const handleSubmit = async () => {
    if (!file || !stylePrompt) return;

    setLoading(true);
    const fd = new FormData();
    fd.append('file', file);
    fd.append('style_prompt', stylePrompt);

    try {
      const res = await axios.post('http://localhost:8000/api/transform/style', fd, {
        responseType: 'blob',
      });
      const blob = new Blob([res.data], { type: 'audio/wav' });
      setStyledAudioUrl(URL.createObjectURL(blob));
    } catch (err) {
      console.error(err);
      alert('❌ Failed to apply style. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 sm:p-8 bg-[#2D283E] text-[#D1D7E0] rounded-2xl shadow-xl space-y-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold flex items-center gap-2">
        <Sparkles size={24} className="text-yellow-300" />
        AI Voice Style Transformation
      </h2>

      <div className="space-y-4">
        <label className="block">
          <span className="text-sm text-gray-300">🎵 Upload Audio File</span>
          <input
            type="file"
            accept="audio/*"
            onChange={handleFileChange}
            className="block w-full text-sm mt-2 file:bg-purple-600 file:text-white file:rounded file:px-4 file:py-2 file:border-0 file:cursor-pointer file:hover:bg-purple-700"
          />
        </label>

        <label className="block">
          <span className="text-sm text-gray-300">✍️ Style Prompt</span>
          <input
            type="text"
            placeholder="e.g. 'angry', 'formal', 'robotic'"
            value={stylePrompt}
            onChange={(e) => setStylePrompt(e.target.value)}
            className="mt-2 w-full px-4 py-2 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </label>

        <button
          onClick={handleSubmit}
          disabled={!file || !stylePrompt || loading}
          className="bg-gradient-to-r from-purple-600 to-pink-500 text-white px-6 py-3 rounded-xl font-medium flex items-center gap-2 hover:scale-[1.02] transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin" size={20} />
              Styling...
            </>
          ) : (
            <>
              <UploadCloud size={20} />
              Apply Style
            </>
          )}
        </button>
      </div>

      {styledAudioUrl && (
        <div className="mt-6 space-y-4">
          <h3 className="font-semibold text-lg">✅ Styled Output</h3>
          <audio controls src={styledAudioUrl} className="w-full" />
          <a
            href={styledAudioUrl}
            download="styled_output.wav"
            className="inline-block bg-green-600 hover:bg-green-700 text-white font-medium px-5 py-2 rounded-lg"
          >
            ⬇ Download Output
          </a>
        </div>
      )}
    </div>
  );
};

export default OpenAIStyleForm;
