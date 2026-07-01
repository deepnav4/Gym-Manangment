import axios from 'axios';

// API Base URL - change this to your backend URL
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000, // 10 seconds
});

// Request interceptor - Add auth token to requests
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
            
            // If in mock mode, bypass backend request immediately to trigger fallback
            if (token.startsWith('mock_')) {
                return Promise.reject(new Error('Mock token detected - bypassing API'));
            }
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor - Handle errors globally
api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        const token = localStorage.getItem('token');
        const isMockMode = token && token.startsWith('mock_');

        // Handle 401 Unauthorized - redirect to login
        if (error.response?.status === 401 && !isMockMode) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = '/login';
        }

        // Handle 403 Forbidden
        if (error.response?.status === 403 && !isMockMode) {
            window.location.href = '/unauthorized';
        }

        return Promise.reject(error);
    }
);

export default api;
