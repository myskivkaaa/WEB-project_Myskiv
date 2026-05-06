import styles from './WagonSelector.module.css';

const WagonSelector = ({ wagons, selectedWagon, onSelect }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.infoLine}>
        <span>Виберіть вагон</span>
        <div className={styles.legend}>
          <span className={styles.available}></span> Вільно
          <span className={styles.selected}></span> Ваша вибір
        </div>
      </div>
      
      <div className={styles.wagonLine}>
        {wagons.map((wagon) => (
          <button
            key={wagon.id}
            className={`${styles.wagonCard} ${selectedWagon?.id === wagon.id ? styles.active : ''}`}
            onClick={() => onSelect(wagon)}
          >
            <div className={styles.wagonTop}>
              <span className={styles.wagonNum}>{wagon.id}</span>
              <span className={styles.comfortIcon}>❄️</span>
            </div>
            <div className={styles.wagonType}>{wagon.type}</div>
          </button>
        ))}
      </div>

      {selectedWagon && (
        <div className={styles.wagonDetail}>
          <div className={styles.detailHeader}>
            <h4>Вагон №{selectedWagon.id}</h4>
            <span className={styles.freeSeats}>{selectedWagon.seatsCount} місць</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default WagonSelector;