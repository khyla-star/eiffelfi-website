import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ScrollToTop from './components/common/ScrollToTop';
import LandingPage from './pages/LandingPage';
import AboutPage from './pages/AboutPage';
import LearnPage from './pages/LearnPage';
import LearnCollectionPage from './pages/LearnCollectionPage';
import LearnArticlePage from './pages/LearnArticlePage';
import MarketplacePage from './pages/MarketplacePage';
import MarketplacePropertyPage from './pages/MarketplacePropertyPage';
import PlaceholderPage from './pages/PlaceholderPage';

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/marketplace" element={<MarketplacePage />} />
        <Route path="/marketplace/:slug" element={<MarketplacePropertyPage />} />
        <Route path="/help" element={<LearnPage />} />
        <Route path="/help/collections/:slug" element={<LearnCollectionPage />} />
        <Route path="/help/articles/:slug" element={<LearnArticlePage />} />
        <Route path="*" element={<PlaceholderPage />} />
      </Routes>
    </BrowserRouter>
  );
}
