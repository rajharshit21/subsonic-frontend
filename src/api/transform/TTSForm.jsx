// Location: frontend/src/api/transform/TTSForm.jsx

import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
const API = import.meta.env.VITE_API_BASE_URL;
export default function TTSForm() {
  const [text, setText] = useState('');
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState('');
  const [audioUrl, setAudioUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const audioRef = useRef(null);

  const API_BASE = import.meta.env.VITE_TTS_BACKEND || 'https://xxxxxx.ngrok.io';

  
  useEffect(() => {
    axios.get(`${API_BASE}/tts/voices`)
      .then(res => {
        const availableVoices = res.data.voices || [];
        setVoices(availableVoices);
        setSelectedVoice(availableVoices[0] || '');
      })
      .catch(err => {
        console.error('Failed to load voices:', err);
      });
  }, [API_BASE]);

  const handleGenerate = async () => {
    if (!text.trim() || !selectedVoice) return;
    setLoading(true);
    const formData = new FormData();
    formData.append('text', text);
    formData.append('voice', selectedVoice);

    try {
      const res = await axios.post(`${API_BASE}/tts/multi-voice`, formData, {
        responseType: 'blob'
      });

      const blob = res.data;
      const url = URL.createObjectURL(blob);
      setAudioUrl(url);
    } catch (err) {
      console.error('TTS generation failed:', err);
      alert('Something went wrong while generating speech.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 sm:p-8 bg-[#2D283E] text-[#D1D7E0] rounded-2xl shadow-xl max-w-3xl mx-auto mt-16 space-y-6">
      <h2 className="text-2xl sm:text-3xl font-bold">🗣️ Multi-Voice TTS Generator</h2>

      <textarea
        placeholder="Enter text to synthesize..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={5}
        className="w-full rounded-xl p-4 bg-[#D1D7E0] text-black placeholder:text-gray-500 shadow-inner focus:outline-none focus:ring-2 focus:ring-[#802BB1]"
      />

      <div>
        <label className="block text-sm mb-2 font-medium">🎙️ Select Voice</label>
        <select
          value={selectedVoice}
          onChange={(e) => setSelectedVoice(e.target.value)}
          className="w-full rounded-xl px-4 py-2 bg-[#D1D7E0] text-black shadow-inner focus:outline-none focus:ring-2 focus:ring-[#EF4444]"
        >
          {voices.map((voice, idx) => (
            <option key={idx} value={voice}>{voice}</option>
          ))}
        </select>
      </div>

      <button
        onClick={handleGenerate}
        disabled={loading || !text}
        className={`w-full sm:w-auto px-6 py-3 text-white font-semibold rounded-xl transition ${
          loading ? 'bg-gray-500 cursor-not-allowed' : 'bg-[#802BB1] hover:bg-purple-700'
        }`}
      >
        {loading ? 'Generating…' : 'Generate Speech'}
      </button>

      {audioUrl && (
        <div className="space-y-2">
          <h3 className="text-lg font-medium">🎧 Generated Audio</h3>
          <audio controls src={audioUrl} ref={audioRef} className="w-full" />
          <a
            href={audioUrl}
            download="tts_output.wav"
            className="inline-block mt-2 bg-green-600 text-white px-4 py-2 rounded shadow hover:bg-green-700"
          >
            Download
          </a>
        </div>
      )}
    </div>
  );
}
