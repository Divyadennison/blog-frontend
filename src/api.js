import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://blog-backend-z9hh.onrender.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

const token = localStorage.getItem('token');
if (token) {
  axiosInstance.defaults.headers.common['Authorization'] = `Token ${token}`;
}

export default axiosInstance;
