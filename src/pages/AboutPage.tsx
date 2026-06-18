import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import AboutHeroSection from '../components/about/AboutHeroSection';
import AboutStatsSection from '../components/about/AboutStatsSection';
import AboutBackersSection from '../components/about/AboutBackersSection';
import AboutPressSection from '../components/about/AboutPressSection';
import AboutStorySection from '../components/about/AboutStorySection';
import AboutTeamSection from '../components/about/AboutTeamSection';
import AboutContactSection from '../components/about/AboutContactSection';

export default function AboutPage() {
  return (
    <div className="animate-routeFadeIn">
      <div className="app-container overflow-x-hidden bg-white text-lofty-purple-700">
        <Header />
        <main className="dark">
          <AboutHeroSection />
          <AboutStatsSection />
          <AboutBackersSection />
          <AboutPressSection />
          <AboutStorySection />
          <AboutTeamSection />
          <AboutContactSection />
        </main>
        <Footer />
      </div>
    </div>
  );
}
