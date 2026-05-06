import { useNavigate } from 'react-router-dom';
import styles from './TrainCard.module.css';

const TrainCard = ({ train }) => {
  const navigate = useNavigate();

  const departureDate = new Date(train.departure).toLocaleString('uk-UA', {
    day: 'numeric',
    month: 'long',
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <div className={styles.card}>
      {/* Ліва частина: Маршрут та час */}
      <div className={styles.mainInfo}>
        <div className={styles.header}>
          <span className={styles.number}>{train.number}</span>
        </div>
        <div className={styles.route}>
          <p className={styles.city}>{train.from} → {train.to}</p>
          <p className={styles.date}>📅 {departureDate}</p>
        </div>
        <div className={styles.duration}>⏱️ {train.duration}</div>
      </div>

      {/* Права частина: Вибір типу вагона (як на сайті УЗ) */}
      <div className={styles.wagonTypes}>
        {train.wagons.map((wagon) => (
          <div 
            key={wagon.id} 
            className={styles.typeBlock} 
            onClick={() => navigate(`/booking/${train.id}`)}
          >
            <div className={styles.typeInfo}>
              <span className={styles.typeName}>{wagon.type}</span>
              <span className={styles.seatsCount}>{wagon.seatsCount} місць</span>
            </div>
            <div className={styles.price}>{wagon.price} ₴</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrainCard;