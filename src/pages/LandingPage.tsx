import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import HeroSection from '../components/landing/HeroSection';
import MarketplaceSection from '../components/landing/MarketplaceSection';
import PressLogosSection from '../components/landing/PressLogosSection';
import HowItWorksSection from '../components/landing/HowItWorksSection';
import JerryQuoteSection from '../components/landing/JerryQuoteSection';
import LegacyMarketSection from '../components/landing/LegacyMarketSection';
import PropertyFractionsSection from '../components/landing/PropertyFractionsSection';
import ProInvestSection from '../components/landing/ProInvestSection';
import EveryoneSection from '../components/landing/EveryoneSection';
import FaqSection from '../components/landing/FaqSection';
import FinalCtaSection from '../components/landing/FinalCtaSection';

export default function LandingPage() {
  return (
    <div className="animate-routeFadeIn">
      <div className="app-container overflow-x-hidden bg-white text-lofty-purple-700">
        <Header />
        <main>
          <HeroSection />
          <MarketplaceSection />
          <PressLogosSection />
          <HowItWorksSection />
          <JerryQuoteSection />
          <LegacyMarketSection />
          <PropertyFractionsSection />
          <ProInvestSection />
          <EveryoneSection />
          <FaqSection />
          <FinalCtaSection />
        </main>
        <Footer />
      </div>
    </div>
  );
}
