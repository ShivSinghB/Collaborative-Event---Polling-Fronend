// src/services/authService.js
import API from '../api';

const authService = {
  signup: async (name, email, password) => {
    const response = await API.post('/auth/signup', { name, email, password });
    return response.data;
  },

  login: async (email, password) => {
    const response = await API.post('/auth/login', { email, password });
    return response.data;
  },

  getMe: async () => {
    const response = await API.get('/auth/me');
    return response.data.user;
  }
};

export default authService;