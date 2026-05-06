import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Booking from './pages/Booking';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Динамічний маршрут для сторінки бронювання */}
        <Route path="/booking/:trainId" element={<Booking />} />
      </Routes>
    </Router>
  );
}

export default App;