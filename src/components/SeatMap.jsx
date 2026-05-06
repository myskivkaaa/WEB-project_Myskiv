import styles from './SeatMap.module.css';

const SeatMap = ({ wagon, selectedSeats, reservedSeats, onSeatClick }) => {
  const isPlatskart = wagon.type.toLowerCase().includes('плацкарт');
  const isLux = wagon.type.toLowerCase().includes('люкс');
  
  // Визначаємо кількість місць у блоці (купе)
  const seatsPerComp = isLux ? 2 : 4;
  // Основні місця (у плацкарті це 1-36)
  const mainAreaSeats = isPlatskart ? 36 : wagon.seatsCount;

  const compartments = [];
  for (let i = 0; i < mainAreaSeats; i += seatsPerComp) {
    compartments.push(Array.from({ length: seatsPerComp }, (_, j) => i + j + 1));
  }

  // Бокові місця для плацкарта (37-54)
  const sidePairs = [];
  if (isPlatskart) {
    for (let i = 54; i >= 37; i -= 2) {
      sidePairs.push([i, i - 1]);
    }
  }

  const renderSeat = (num) => {
    const isReserved = reservedSeats.includes(num);
    const isSelected = selectedSeats.includes(num);
    const seatClass = `${styles.seat} ${isReserved ? styles.reserved : isSelected ? styles.selected : styles.available}`;
    
    return (
      <button key={num} className={seatClass} disabled={isReserved} onClick={() => onSeatClick(num)}>
        {num}
      </button>
    );
  };

  return (
    <div className={styles.wagonContainer}>
      <div className={styles.wagonScroll}>
        <div className={styles.wagonFrame}>
          {/* Сервісна зона зліва */}
          <div className={styles.serviceZone}>WC</div>
          
          <div className={styles.innerLayout}>
            {/* Ряд основних купе */}
            <div className={styles.mainSeatsRow}>
              {compartments.map((comp, i) => (
                <div key={i} className={`${styles.compBlock} ${isLux ? styles.luxComp : ''}`}>
                  {comp.map(n => renderSeat(n))}
                </div>
              ))}
            </div>

            {/* Прохід з написом */}
            <div className={styles.aisle}></div>

            {/* Бокові місця */}
            {isPlatskart && (
              <div className={styles.sideSeatsRow}>
                {sidePairs.map((pair, i) => (
                  <div key={i} className={styles.sideBlock}>
                    {renderSeat(pair[0])}
                    {renderSeat(pair[1])}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Сервісна зона справа з текстовим написом */}
          <div className={styles.serviceZone}>
             <span className={styles.serviceText}>ПРОВІДНИК</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeatMap;