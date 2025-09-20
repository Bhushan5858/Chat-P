import axios from "axios";

const API_URL = "https://chat-p-backend.onrender.com/api";

export const registerUser = (data) => axios.post(`${API_URL}/auth/register`, data);
export const loginUser = (data) => axios.post(`${API_URL}/auth/login`, data);
export const sendMessageAPI = (data, token) =>
  axios.post(`${API_URL}/messages`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
export const getMessagesAPI = (token) =>
  axios.get(`${API_URL}/messages`, {
    headers: { Authorization: `Bearer ${token}` },
  });