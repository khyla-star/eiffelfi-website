import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LearnPage from './pages/LearnPage';
import LearnCollectionPage from './pages/LearnCollectionPage';
import LearnArticlePage from './pages/LearnArticlePage';
import PlaceholderPage from './pages/PlaceholderPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/help" element={<LearnPage />} />
        <Route path="/help/collections/:slug" element={<LearnCollectionPage />} />
        <Route path="/help/articles/:slug" element={<LearnArticlePage />} />
        <Route path="*" element={<PlaceholderPage />} />
      </Routes>
    </BrowserRouter>
  );
}
