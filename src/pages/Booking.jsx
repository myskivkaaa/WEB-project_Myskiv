import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { BookingService } from '../services/BookingService';
import WagonSelector from '../components/WagonSelector';
import SeatMap from '../components/SeatMap';
import BookingForm from '../components/BookingForm';
import styles from './Booking.module.css';

const Booking = () => {
  const { trainId } = useParams();
  const [train, setTrain] = useState(null);
  const [selectedWagon, setSelectedWagon] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [reservedSeats, setReservedSeats] = useState([]);

  useEffect(() => {
    // 1. Завантажуємо дані потяга
    BookingService.getTrainById(trainId).then(data => {
      setTrain(data);
      if (data.wagons.length > 0) setSelectedWagon(data.wagons[0]);
    });
  }, [trainId]);

  useEffect(() => {
    if (selectedWagon) {
      // 2. Завантажуємо заброньовані місця з сервера
      BookingService.getBookings().then(bookings => {
        const reserved = bookings
          .filter(b => b.trainId === trainId && b.wagonId === selectedWagon.id)
          .flatMap(b => b.seatNumber);
        
        setReservedSeats(reserved);

        // --- ДОДАЄМО LOCALSTORAGE ТУТ ---
        // Перевіряємо, чи є в пам'яті збережені місця для цього конкретного вагона
        const saved = localStorage.getItem(`selected_${trainId}_${selectedWagon.id}`);
        if (saved) {
          setSelectedSeats(JSON.parse(saved));
        } else {
          setSelectedSeats([]); // Якщо нічого немає — скидаємо
        }
      });
    }
  }, [trainId, selectedWagon]);

  // 3. Окремий useEffect, щоб записувати зміни в пам'ять
  useEffect(() => {
    if (selectedWagon && selectedSeats.length > 0) {
      localStorage.setItem(`selected_${trainId}_${selectedWagon.id}`, JSON.stringify(selectedSeats));
    }
  }, [selectedSeats, trainId, selectedWagon]);

  if (!train) return <p className={styles.loading}>Завантаження даних...</p>;

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Бронювання квитків: {train.number}</h1>
        <p className={styles.route}>{train.from} — {train.to}</p>
      </header>
      
      <WagonSelector 
        wagons={train.wagons} 
        selectedWagon={selectedWagon} 
        onSelect={setSelectedWagon} 
      />

      {selectedWagon && (
        <SeatMap 
          wagon={selectedWagon}
          selectedSeats={selectedSeats}
          reservedSeats={reservedSeats}
          onSeatClick={(seat) => {
            if (selectedSeats.includes(seat)) {
              setSelectedSeats(selectedSeats.filter(s => s !== seat));
            } else {
              setSelectedSeats([...selectedSeats, seat]);
            }
          }}
        />
      )}

      {selectedSeats.length > 0 && (
        <BookingForm 
          trainId={trainId}
          wagonId={selectedWagon.id}
          selectedSeats={selectedSeats}
        />
      )}
    </div>
  );
};

export default Booking;