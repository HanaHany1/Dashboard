// src/lib/api/bookings.ts
import axios from "axios";

const BASE_URL = 'http://localhost:5000';  // استبدل بـ URL الخاص بك

// جلب الحجوزات
export const getBookings = async () => {
  const token = localStorage.getItem("authToken");  // أو من sessionStorage

  try {
    const response = await axios.get(`${BASE_URL}/api/bookings`, {
      headers: {
        Authorization: `Bearer ${token}`,  // إرسال التوكن في الـ header
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching bookings', error);
    throw error;
  }
};

// جلب الغرف
export const getRooms = async () => {
  const token = localStorage.getItem("authToken");  // أو من sessionStorage

  try {
    const response = await axios.get(`${BASE_URL}/api/rooms`, {
      headers: {
        Authorization: `Bearer ${token}`,  // إرسال التوكن في الـ header
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching rooms', error);
    throw error;
  }
};

// جلب الفروع
export const getBranches = async () => {
  const token = localStorage.getItem("authToken");  // أو من sessionStorage

  try {
    const response = await axios.get(`${BASE_URL}/api/branches`, {
      headers: {
        Authorization: `Bearer ${token}`,  // إرسال التوكن في الـ header
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching branches', error);
    throw error;
  }
};