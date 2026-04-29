import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Сторінку бронювання додамо в 10-й лабі */}
        <Route path="/booking/:trainId" element={<div style={{ padding: '20px' }}>Сторінка бронювання в розробці...</div>} />
      </Routes>
    </Router>
  );
}

export default App;