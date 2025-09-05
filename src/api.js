import axios from "axios";

// const API = axios.create({ baseURL: "http://localhost:5000/api" });
const API = axios.create({ baseURL: import.meta.env.VITE_API_BASE_URL });

// Automatically add token if available
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export default API;