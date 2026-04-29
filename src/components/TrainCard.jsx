//import React from 'react';
import styles from './TrainCard.module.css';

const TrainCard = ({ train }) => {
  // Форматуємо дату для зручного читання
  const departureDate = new Date(train.departure).toLocaleString('uk-UA', {
    day: 'numeric',
    month: 'long',
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <span className={styles.number}>№ {train.number}</span>
      </div>
      <div className={styles.route}>
        <p className={styles.city}>{train.from} → {train.to}</p>
      </div>
      <div className={styles.details}>
        <p>📅 {departureDate}</p>
        <p>⏱️ Тривалість: {train.duration}</p>
      </div>
      <button className={styles.button}>Вибрати квитки</button>
    </div>
  );
};

export default TrainCard;