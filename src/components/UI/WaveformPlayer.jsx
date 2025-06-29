// Location: src/components/ui/WaveformPlayer.jsx

import React, { useRef, useEffect, useImperativeHandle, forwardRef } from 'react';

const WaveformPlayer = forwardRef((props, ref) => {
  const canvasRef = useRef(null);
  const analyserRef = useRef(null);
  const animationRef = useRef(null);
  const bufferRef = useRef(null);

  useImperativeHandle(ref, () => ({
    draw(buffer) {
      bufferRef.current = buffer;
      drawWaveform();
    },
    attachAnalyser(analyser) {
      analyserRef.current = analyser;
      drawLive();
    },
  }));

  const drawWaveform = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const { width, height } = canvas;
    ctx.clearRect(0, 0, width, height);

    const buffer = bufferRef.current;
    if (!buffer) return;

    const data = buffer.getChannelData(0);
    ctx.beginPath();
    ctx.moveTo(0, height / 2);

    for (let i = 0; i < width; i++) {
      const sampleIndex = Math.floor((i * data.length) / width);
      const value = data[sampleIndex] * height * 0.45;
      ctx.lineTo(i, height / 2 - value);
    }

    ctx.strokeStyle = '#7C3AED'; // Tailwind purple-600
    ctx.lineWidth = 2;
    ctx.stroke();
  };

  const drawLive = () => {
    const analyser = analyserRef.current;
    if (!analyser) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const { width, height } = canvas;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const draw = () => {
      analyser.getByteFrequencyData(dataArray);

      ctx.fillStyle = '#1E1B2E'; // dark background
      ctx.fillRect(0, 0, width, height);

      const barWidth = (width / bufferLength) * 2.5;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        const barHeight = dataArray[i] / 1.5;
        ctx.fillStyle = `hsl(${i}, 100%, 70%)`;
        ctx.fillRect(x, height - barHeight, barWidth, barHeight);
        x += barWidth + 1;
      }

      animationRef.current = requestAnimationFrame(draw);
    };

    draw();
  };

  useEffect(() => {
    return () => cancelAnimationFrame(animationRef.current);
  }, []);

  return (
    <div className="w-full overflow-x-auto">
      <canvas
        ref={canvasRef}
        width={600}
        height={150}
        className="rounded-lg shadow border border-gray-700 bg-[#1E1B2E] mx-auto block"
      />
    </div>
  );
});

export default WaveformPlayer;
