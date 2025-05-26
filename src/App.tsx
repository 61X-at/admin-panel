import { Routes, Route, Navigate } from 'react-router-dom';
import GatewayLayout from './pages/GatewayLayout';
import ScraperPage from './pages/ScraperPage';
import BotPage from './pages/BotPage';
import Layout from './components/Layout/Layout';
import RulesPage from './pages/RulesPage';
import MarketplacesPage from './pages/MarketplacePage';

export default function App() {
  return (
    <Routes>
      {/* Общий layout */}
      <Route path="/" element={<Layout />}>
        {/* По умолчанию перенаправляем на Gateway → Marketplaces */}
        <Route index element={<Navigate to="gateway/marketplaces" replace />} />

        {/* Раздел Gateway с дочерними маршрутами */}
        <Route path="gateway" element={<GatewayLayout />}>
          <Route index element={<Navigate to="marketplaces" replace />} />
          <Route path="marketplaces" element={<MarketplacesPage />} />
          <Route path="rules" element={<RulesPage />} />
        </Route>

        {/* Прямые маршруты Scraper и Bot */}
        <Route path="scraper" element={<ScraperPage />} />
        <Route path="bot" element={<BotPage />} />

        {/* На всё остальное — редирект на корень */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}