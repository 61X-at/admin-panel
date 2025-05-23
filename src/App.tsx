import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {/* Дополнительные маршруты можно добавить здесь */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}