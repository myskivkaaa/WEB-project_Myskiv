/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useContext, useMemo } from 'react';

// 1. Створюємо контекст 
const BookingContext = createContext();

// 2. Створюємо Провайдер 
export const BookingProvider = ({ children }) => {
  const [bookingData, setBookingData] = useState({
    train: null,
    wagon: null,
    selectedSeats: [],
  });

  const value = useMemo(() => ({
    bookingData,
    updateBooking: (newData) => setBookingData(prev => ({ ...prev, ...newData })),
    resetBooking: () => setBookingData({ train: null, wagon: null, selectedSeats: [] })
  }), [bookingData]);

  return (
    <BookingContext.Provider value={value}>
      {children}
    </BookingContext.Provider>
  );
};

// 3. Хук експортуємо окремо. 
export function useBooking() {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
}