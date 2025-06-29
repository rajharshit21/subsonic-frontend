// Location: src/components/forms/LiveMicStream.jsx

import React, { useRef, useState } from 'react';
import WaveformPlayer from '../UI/WaveformPlayer';
import { Mic, MicOff } from 'lucide-react';

const LiveMicStream = () => {
  const [clarity, setClarity] = useState(false);
  const [denoise, setDenoise] = useState(false);
  const [pitch, setPitch] = useState(0);
  const [speed, setSpeed] = useState(1.0);
  const [streaming, setStreaming] = useState(false);

  const waveformRef = useRef(null);
  const audioContextRef = useRef(null);
  const socketRef = useRef(null);
  const micStreamRef = useRef(null);

  const float32ToInt16 = (buffer) => {
    const l = buffer.length;
    const buf = new Int16Array(l);
    for (let i = 0; i < l; i++) {
      const s = Math.max(-1, Math.min(1, buffer[i]));
      buf[i] = s < 0 ? s * 0x8000 : s * 0x7FFF;
      buf[i] = Math.round(buf[i]);
    }
    return new Uint8Array(buf.buffer);
  };

  const toggleStream = async () => {
    if (streaming) return stopStream();

    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    micStreamRef.current = stream;

    const socket = new WebSocket(
      `ws://localhost:8000/ws/audio?clarity=${clarity}&denoise=${denoise}&pitch=${pitch}&speed=${speed}`
    );
    socket.binaryType = 'arraybuffer';
    socketRef.current = socket;

    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    audioContextRef.current = audioContext;

    const sourceNode = audioContext.createMediaStreamSource(stream);
    const processor = audioContext.createScriptProcessor(2048, 1, 1);

    processor.onaudioprocess = (e) => {
      const input = e.inputBuffer.getChannelData(0);
      const pcmData = float32ToInt16(input);
      if (socket.readyState === WebSocket.OPEN) {
        socket.send(pcmData);
      }
    };

    sourceNode.connect(processor);
    processor.connect(audioContext.destination);

    socket.onmessage = async (event) => {
      const arrayBuffer = event.data;
      try {
        const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
        const outputSource = audioContext.createBufferSource();
        outputSource.buffer = audioBuffer;
        outputSource.connect(audioContext.destination);
        outputSource.start();
        waveformRef.current?.draw(audioBuffer);
      } catch (err) {
        console.warn('decodeAudioData failed', err);
      }
    };

    setStreaming(true);
  };

  const stopStream = () => {
    socketRef.current?.close();
    micStreamRef.current?.getTracks().forEach((track) => track.stop());
    audioContextRef.current?.close();
    setStreaming(false);
  };

  return (
    <div className="p-6 sm:p-8 bg-gradient-to-br from-[#2D283E] to-[#1F1B2E] text-[#D1D7E0] rounded-2xl shadow-2xl space-y-6 max-w-3xl mx-auto mt-20 sm:mt-28 border border-purple-800/30">
      <h2 className="text-2xl sm:text-3xl font-bold flex items-center gap-3">
        <span
          className={`transition duration-300 ${
            streaming ? 'animate-pulse text-[#802BB1] drop-shadow-glow' : 'text-gray-400'
          }`}
        >
          {streaming ? <Mic size={28} /> : <MicOff size={28} />}
        </span>
        Live Mic Stream
      </h2>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm mb-1">🎚 Pitch Shift: {pitch}</label>
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
          <label className="block text-sm mb-1">⏩ Speed: {speed.toFixed(1)}x</label>
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

      <div className="flex flex-wrap items-center gap-4">
        <label className="inline-flex items-center text-sm sm:text-base">
          <input
            type="checkbox"
            checked={clarity}
            onChange={() => setClarity(!clarity)}
            className="accent-[#FBBF24] mr-2"
          />
          ✨ Clarity Boost
        </label>

        <label className="inline-flex items-center text-sm sm:text-base">
          <input
            type="checkbox"
            checked={denoise}
            onChange={() => setDenoise(!denoise)}
            className="accent-[#1E40AF] mr-2"
          />
          🛠 Noise Reduction
        </label>
      </div>

      <button
        onClick={toggleStream}
        className={`w-full sm:w-auto px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg ${
          streaming
            ? 'bg-red-600 hover:bg-red-700'
            : 'bg-green-600 hover:bg-green-700'
        }`}
      >
        {streaming ? 'Stop Streaming' : 'Start Streaming'}
      </button>

      <div>
        <WaveformPlayer ref={waveformRef} />
      </div>
    </div>
  );
};

export default LiveMicStream;
