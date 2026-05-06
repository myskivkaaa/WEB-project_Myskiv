import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BookingProvider } from './context/BookingContext' // Імпортуй провайдер
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* Обгортаємо весь додаток у Провайдер */}
    <BookingProvider>
      <App />
    </BookingProvider>
  </React.StrictMode>,
)