// src/api.js
import axios from 'axios';

axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';
axios.defaults.withCredentials = true;

// Add token interceptor (optional)
axios.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) config.headers['Authorization'] = `Bearer ${token}`;
    return config;
});

export default axios;
