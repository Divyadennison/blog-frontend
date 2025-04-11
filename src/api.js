import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://blog-backend-z9hh.onrender.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// ✅ Only attach token if it exists
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Token ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
