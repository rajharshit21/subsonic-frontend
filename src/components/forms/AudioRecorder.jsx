// Location: src/components/forms/AudioRecorder.jsx

import React, { useState, useRef } from 'react';
import axios from 'axios';
import { Mic, MicOff, UploadCloud, Download } from 'lucide-react';

export default function AudioRecorder() {
  const [recording, setRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [processedAudio, setProcessedAudio] = useState(null);
  const [uploading, setUploading] = useState(false);

  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    audioChunksRef.current = [];

    const mediaRecorder = new MediaRecorder(stream);
    mediaRecorderRef.current = mediaRecorder;

    mediaRecorder.ondataavailable = (e) => {
      audioChunksRef.current.push(e.data);
    };

    mediaRecorder.onstop = () => {
      const blob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
      setAudioBlob(blob);
    };

    mediaRecorder.start();
    setRecording(true);
  };

  const stopRecording = () => {
    mediaRecorderRef.current.stop();
    setRecording(false);
  };

  const uploadAudio = async () => {
    if (!audioBlob) return;

    setUploading(true);

    const formData = new FormData();
    formData.append('file', audioBlob, 'recording.wav');
    formData.append('pitch_shift', '0');
    formData.append('time_stretch', '1.0');
    formData.append('clarity', 'false');
    formData.append('denoise', 'false');
    formData.append('fun_filter', '');
    formData.append('style', '');

    try {
      const res = await axios.post('http://localhost:8000/api/transform/upload', formData, {
        responseType: 'blob',
      });
      setProcessedAudio(res.data);
    } catch (err) {
      console.error("Upload failed:", err);
      alert("❌ Audio upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="p-6 sm:p-8 bg-[#2D283E] text-[#D1D7E0] rounded-2xl shadow-xl space-y-6 max-w-3xl mx-auto mt-20 sm:mt-28">
      <h2 className="text-2xl sm:text-3xl font-bold flex items-center gap-3">
        {recording ? <Mic className="text-red-500 animate-pulse" size={26} /> : <MicOff className="text-gray-400" size={26} />}
        Voice Recorder
      </h2>

      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={recording ? stopRecording : startRecording}
          className={`flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-white transition ${
            recording
              ? 'bg-red-600 hover:bg-red-700'
              : 'bg-green-600 hover:bg-green-700'
          }`}
        >
          {recording ? 'Stop Recording' : 'Start Recording'}
        </button>

        {audioBlob && (
          <button
            onClick={uploadAudio}
            disabled={uploading}
            className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl text-white font-semibold disabled:opacity-50"
          >
            <UploadCloud size={18} />
            {uploading ? 'Uploading...' : 'Upload & Process'}
          </button>
        )}
      </div>

      {audioBlob && (
        <div className="space-y-2">
          <p className="text-sm mt-4 text-gray-300">🎧 Your Raw Recording:</p>
          <audio controls src={URL.createObjectURL(audioBlob)} className="w-full rounded" />
        </div>
      )}

      {processedAudio && (
        <div className="space-y-2">
          <h3 className="font-semibold text-lg mt-6">✅ Processed Audio</h3>
          <audio controls src={URL.createObjectURL(processedAudio)} className="w-full rounded" />
          <a
            href={URL.createObjectURL(processedAudio)}
            download="processed.wav"
            className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg mt-2"
          >
            <Download size={18} />
            Download
          </a>
        </div>
      )}
    </div>
  );
}
