// Location: src/components/forms/AudioProcessor.jsx

import React, { useState, useRef, useEffect, useMemo } from 'react';
import axios from 'axios';
import WaveformPlayer from '../UI/WaveformPlayer';
import { UploadCloud } from 'lucide-react';


const AudioProcessor = () => {
  const [file, setFile] = useState(null);
  const [pitch, setPitch] = useState(0);
  const [speed, setSpeed] = useState(1.0);
  const [clarity, setClarity] = useState(false);
  const [denoise, setDenoise] = useState(false);
  const [funFilter, setFunFilter] = useState('');
  const [style, setStyle] = useState('');
  const [loading, setLoading] = useState(false);
  const [processedAudio, setProcessedAudio] = useState(null);

  const fileInputRef = useRef(null);

  const originalUrl = useMemo(() => file && URL.createObjectURL(file), [file]);

  useEffect(() => {
    return () => {
      if (originalUrl) URL.revokeObjectURL(originalUrl);
    };
  }, [originalUrl]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return alert('Please upload an audio file.');

    const formData = new FormData();
    formData.append('file', file);
    formData.append('pitch_shift', pitch);
    formData.append('time_stretch', speed);
    formData.append('clarity', String(clarity));
    formData.append('denoise', String(denoise));
    formData.append('fun_filter', funFilter);
    formData.append('style', style);

    try {
      setLoading(true);
      const res = await axios.post('http://localhost:8000/api/transform/upload', formData, {
        responseType: 'blob',
      });
      const audioURL = URL.createObjectURL(res.data);
      setProcessedAudio(audioURL);
      setFile(null);
      if (fileInputRef.current) fileInputRef.current.value = null;
    } catch (err) {
      console.error(err);
      alert('Failed to process audio.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 sm:p-8 bg-[#2D283E] text-[#D1D7E0] rounded-2xl shadow-xl space-y-6 max-w-3xl mx-auto mt-20 sm:mt-28">
      <h2 className="text-2xl sm:text-3xl font-bold flex items-center gap-3">
        <UploadCloud size={24} className="text-purple-400" />
        Upload & Transform Audio
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <input
          type="file"
          accept="audio/*"
          ref={fileInputRef}
          onChange={(e) => setFile(e.target.files[0])}
          className="file-input file:bg-purple-600 file:text-white file:rounded file:px-4 file:py-2 file:border-0 text-white"
        />

        {originalUrl && (
          <div className="mt-2">
            <WaveformPlayer audioUrl={originalUrl} />
          </div>
        )}

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm mb-1">🎚 Pitch: {pitch}</label>
            <input
              type="range"
              min="-12"
              max="12"
              value={pitch}
              onChange={(e) => setPitch(+e.target.value)}
              className="w-full accent-purple-400"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">⏩ Speed: {speed.toFixed(1)}x</label>
            <input
              type="range"
              min="0.5"
              max="2"
              step="0.1"
              value={speed}
              onChange={(e) => setSpeed(+e.target.value)}
              className="w-full accent-pink-400"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <label className="inline-flex items-center space-x-2">
            <input type="checkbox" checked={clarity} onChange={() => setClarity(!clarity)} className="accent-yellow-400" />
            <span>✨ Clarity</span>
          </label>

          <label className="inline-flex items-center space-x-2">
            <input type="checkbox" checked={denoise} onChange={() => setDenoise(!denoise)} className="accent-blue-600" />
            <span>🛠 Denoise</span>
          </label>

          <div className="col-span-2 sm:col-span-1">
            <label className="block text-sm mb-1">🎭 Fun Filter</label>
            <select
              value={funFilter}
              onChange={(e) => setFunFilter(e.target.value)}
              className="w-full rounded px-3 py-2 text-black"
            >
              <option value="">None</option>
              <option value="chipmunk">Chipmunk</option>
              <option value="robot">Robot</option>
              <option value="alien">Alien</option>
            </select>
          </div>

          <div className="col-span-2">
            <label className="block text-sm mb-1">🎨 OpenAI Style</label>
            <select
              value={style}
              onChange={(e) => setStyle(e.target.value)}
              className="w-full rounded px-3 py-2 text-black"
            >
              <option value="">None</option>
              <option value="shakespeare">Shakespeare</option>
              <option value="sarcastic">Sarcastic</option>
              <option value="motivational">Motivational</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-semibold transition disabled:opacity-50"
        >
          {loading ? 'Processing...' : 'Upload & Transform'}
        </button>
      </form>

      {processedAudio && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-2">🔊 Transformed Output</h3>
          <audio controls src={processedAudio} className="w-full rounded" />
          <div className="mt-3">
            <WaveformPlayer audioUrl={processedAudio} />
          </div>
        </div>
      )}
    </div>
  );
};

export default AudioProcessor;
