import { BookingService } from '../services/BookingService';
import { useBooking } from '../context/BookingContext'; // Глобальний стан
import toast, { Toaster } from 'react-hot-toast'; // Гарні повідомлення
import styles from './BookingForm.module.css';

const BookingForm = ({ trainId, wagonId, selectedSeats }) => {
  const { resetBooking } = useBooking();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const bookingData = {
      trainId: trainId,
      wagonId: wagonId,
      seatNumber: selectedSeats,
      passengerName: e.target.name.value,
      phone: e.target.phone.value,
      email: e.target.email.value,
      date: new Date().toISOString()
    };

    // Створюємо "проміс" для повідомлення
    const bookingPromise = BookingService.saveBooking(bookingData);

    toast.promise(bookingPromise, {
      loading: 'Зберігаємо ваше бронювання...',
      success: 'Квитки успішно заброньовано! 🎫',
      error: 'Помилка при збереженні. Спробуйте ще раз.',
    });

    try {
      await bookingPromise;
      resetBooking(); // Очищаємо глобальний стан
      
      // Повертаємо на головну через 2 секунди, щоб встигли прочитати повідомлення
      setTimeout(() => {
        window.location.href = '/';
      }, 2500);
    } catch (error) {
      console.error("Помилка:", error);
    }
  };

  return (
    <div className={styles.formContainer}>
      {/* Контейнер для повідомлень (Toast) */}
      <Toaster position="top-center" reverseOrder={false} />
      
      <h3>Оформлення квитків</h3>
      
      <div className={styles.info}>
        <p>Потяг №: <strong>{trainId}</strong></p>
        <p>Вагон №: <strong>{wagonId}</strong></p>
        <p>Вибрані місця: <span className={styles.selectedBadge}>{selectedSeats.join(', ')}</span></p>
      </div>

      <form className={styles.form} onSubmit={handleSubmit}>
        <input name="name" type="text" placeholder="Ваше ім’я" className={styles.input} required />
        <input name="phone" type="tel" placeholder="Телефон" className={styles.input} required />
        <input name="email" type="email" placeholder="Email" className={styles.input} required />
        
        <button type="submit" className={styles.submitBtn}>
          Підтвердити бронювання
        </button>
      </form>
    </div>
  );
};

export default BookingForm;