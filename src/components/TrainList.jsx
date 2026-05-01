import { useState, useEffect } from 'react';
import axios from 'axios';
import TrainCard from './TrainCard';
import styles from './TrainList.module.css';

const TrainList = () => {
  const [trains, setTrains] = useState([]); // Стан для списку потягів 
  const [searchTerm, setSearchTerm] = useState(''); // Стан для пошуку 

  useEffect(() => {
    // Виконуємо запит до сервера при завантаженні 
    axios.get('http://localhost:3001/trains')
      .then(response => {
        setTrains(response.data);
      })
      .catch(error => {
        console.error("Помилка завантаження даних:", error);
      });
  }, []);

  // Фільтрація за номером або містом 
  const filteredTrains = trains.filter(train => 
    train.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
    train.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
    train.to.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.container}>
      {/* Поле пошуку  */}
      <input 
        type="text" 
        placeholder="Пошук за номером або маршрутом..." 
        className={styles.searchBar}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      
      {/* Список карток  */}
      <div className={styles.list}>
        {filteredTrains.length > 0 ? (
          filteredTrains.map(train => (
            <TrainCard key={train.id} train={train} />
          ))
        ) : (
          <p>Потягів не знайдено</p>
        )}
      </div>
    </div>
  );
};

export default TrainList;