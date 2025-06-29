// Location: frontend/src/api/transform/UploadForm.jsx

import React, { useState, useRef } from 'react';
import axios from 'axios';
import WaveformPlayer from '../../components/UI/WaveformPlayer.';
const API = import.meta.env.VITE_API_BASE_URL;
export default function UploadForm() {
  const [file, setFile] = useState(null);
  const [pitch, setPitch] = useState(0);
  const [speed, setSpeed] = useState(1);
  const [clarity, setClarity] = useState(false);
  const [denoise, setDenoise] = useState(false);
  const [autotune, setAutotune] = useState(false);
  const [style, setStyle] = useState('');
  const [rawUrl, setRawUrl] = useState(null);
  const [processedUrl, setProcessedUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const rawWaveformRef = useRef(null);
  const processedWaveformRef = useRef(null);

  const handleFile = async (e) => {
    const f = e.target.files[0];
    if (!f) return;
    setFile(f);
    const url = URL.createObjectURL(f);
    setRawUrl(url);
    setProcessedUrl(null);

    const audioCtx = new AudioContext();
    const arrayBuf = await f.arrayBuffer();
    const buffer = await audioCtx.decodeAudioData(arrayBuf);
    rawWaveformRef.current?.draw(buffer);
  };

  const handleSubmit = async () => {
    if (!file) return;
    setLoading(true);

    const fd = new FormData();
    fd.append('file', file);
    fd.append('pitch_shift', pitch);
    fd.append('time_stretch', speed);
    fd.append('clarity', String(clarity));
    fd.append('denoise', String(denoise));
    fd.append('autotune', String(autotune));
    fd.append('style', style);

    try {
      const res = await axios.post(
        'http://localhost:8000/api/transform/upload',
        fd,
        { responseType: 'blob' }
      );
      const blob = res.data;
      const url = URL.createObjectURL(blob);
      setProcessedUrl(url);

      const audioCtx = new AudioContext();
      const buffer = await audioCtx.decodeAudioData(await blob.arrayBuffer());
      processedWaveformRef.current?.draw(buffer);
    } catch (err) {
      console.error(err);
      alert('Processing failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 sm:p-8 bg-[#2D283E] text-[#D1D7E0] rounded-2xl shadow-xl max-w-3xl mx-auto mt-16 space-y-6">
      <h2 className="text-2xl sm:text-3xl font-bold">📤 Upload & Transform</h2>

      <input
        type="file"
        accept="audio/*"
        onChange={handleFile}
        className="w-full bg-[#D1D7E0] text-black rounded px-4 py-2"
      />

      <div className="grid sm:grid-cols-2 gap-6">
        <div>
          <label className="block mb-1 text-sm font-medium">🎚 Pitch Shift: {pitch}</label>
          <input
            type="range"
            min="-12"
            max="12"
            value={pitch}
            onChange={(e) => setPitch(+e.target.value)}
            className="w-full accent-[#802BB1] h-3 rounded-lg"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">⏩ Speed: {speed.toFixed(1)}×</label>
          <input
            type="range"
            min="0.5"
            max="2"
            step="0.1"
            value={speed}
            onChange={(e) => setSpeed(+e.target.value)}
            className="w-full accent-[#EF4444] h-3 rounded-lg"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-4 sm:gap-6">
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={clarity} onChange={() => setClarity(!clarity)} className="accent-[#FBBF24]" />
          Clarity
        </label>
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={denoise} onChange={() => setDenoise(!denoise)} className="accent-[#1E40AF]" />
          Denoise
        </label>
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={autotune} onChange={() => setAutotune(!autotune)} className="accent-[#10B981]" />
          Autotune
        </label>
      </div>

      <input
        type="text"
        value={style}
        onChange={(e) => setStyle(e.target.value)}
        placeholder="Optional style prompt (e.g., ‘narrator’)"
        className="w-full px-4 py-2 rounded bg-[#D1D7E0] text-black"
      />

      <button
        onClick={handleSubmit}
        disabled={!file || loading}
        className={`w-full sm:w-auto px-6 py-3 rounded-xl text-white font-semibold transition ${
          loading ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
        }`}
      >
        {loading ? 'Processing…' : 'Transform'}
      </button>

      {rawUrl && (
        <div className="space-y-2">
          <h3 className="font-medium text-lg mt-4">🔈 Original Audio</h3>
          <audio controls src={rawUrl} className="w-full" />
          <WaveformPlayer ref={rawWaveformRef} />
        </div>
      )}

      {processedUrl && (
        <div className="space-y-2">
          <h3 className="font-medium text-lg mt-4">🎧 Processed Audio</h3>
          <audio controls src={processedUrl} className="w-full" />
          <WaveformPlayer ref={processedWaveformRef} />
          <a
            href={processedUrl}
            download="processed.wav"
            className="inline-block mt-2 bg-green-600 text-white px-4 py-2 rounded"
          >
            Download
          </a>
        </div>
      )}
    </div>
  );
}
