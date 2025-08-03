import axios from 'axios';

const API = axios.create({
  baseURL: 'https://arvyax-assignment-g54n.onrender.com/api',
});

// Automatically add token from localStorage
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;
