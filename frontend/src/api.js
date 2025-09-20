import axios from "axios";

const API_URL = "http://10.149.92.144:5000/api";

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