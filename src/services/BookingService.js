import axios from 'axios';

const API_URL = 'http://localhost:3001';

export const BookingService = {
  // Отримати повну інформацію про конкретний потяг за його ID
  getTrainById: async (id) => {
    const response = await axios.get(`${API_URL}/trains/${id}`);
    return response.data;
  },

  // Отримати список усіх бронювань (щоб знати, які місця вже зайняті)
  getBookings: async () => {
    const response = await axios.get(`${API_URL}/bookings`);
    return response.data;
  },

  // Створити нове бронювання на сервері
  saveBooking: async (bookingData) => {
    const response = await axios.post(`${API_URL}/bookings`, bookingData);
    return response.data;
  }
};