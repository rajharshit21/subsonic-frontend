// Location: frontend/src/router/index.jsx

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PageLayout from '../layout/PageLayout';
import Home from '../pages/Home';
import UploadForm from '../api/transform/UploadForm';
import TTSForm from '../api/transform/TTSForm';
import AudioRecorder from '../components/forms/AudioRecorder';
import LiveMicStream from '../components/forms/LiveMicStream';
import OpenAIStyleForm from '../components/forms/OpenAIStyleForm';
import AudioProcessor from '../components/forms/AudioProcessor';


const RouterConfig = () => {
  return (
    <Routes>
      <Route element={<PageLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/upload" element={<UploadForm />} />
        <Route path="/record" element={<AudioRecorder />} />
        <Route path="/tts" element={<TTSForm />} />
        <Route path="/live" element={<LiveMicStream />} />
        <Route path="/openai" element={<OpenAIStyleForm />} />
        <Route path="/full-process" element={<AudioProcessor />} />
        <Route path="/analytics" element={<div>Coming Soon</div>} />
        
        <Route path="*" element={<div className="p-10 text-center text-xl">404 - Not Found</div>} />
      </Route>
    </Routes>
  );
};

export default RouterConfig;
