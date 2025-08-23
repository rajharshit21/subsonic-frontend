// src/api/api.js
import axios from 'axios';
const API = import.meta.env.VITE_API_BASE_URL;
const BASE_URL = "https://subsonic-jlma.onrender.com"; // in your api.js or axios config


export const uploadAudio = async (formData) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/transform/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Upload error:', error);
    throw error;
  }
};


export const applyFilter = async (formData) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/filters`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Filter error:', error);
    throw error;
  }
};

export const getAnalytics = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/analyze`);
    return response.data;
  } catch (error) {
    console.error('Analytics fetch error:', error);
    throw error;
  }
};
