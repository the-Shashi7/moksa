import axios from 'axios';
import { io } from "socket.io-client";


const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;



export const socket = io('http://localhost:8000', {
  transports: ['websocket', 'polling'], 
  withCredentials: true
});

export const getHistoryData = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/history`);
    return response.data;
  } catch (error) {
    console.error('Error fetching history data:', error);
    return [];
  }
};
