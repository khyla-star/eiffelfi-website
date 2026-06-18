import { Navigate, useParams } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import PropertyGallery from '../components/marketplace/PropertyGallery';
import PropertyInvestCard from '../components/marketplace/PropertyInvestCard';
import PropertyHeaderSection, {
  PropertyAboutSection,
  PropertyChartSection,
  PropertyReviewsSection,
} from '../components/marketplace/PropertyDetailSections';
import LocalLink from '../components/common/LocalLink';
import { getPropertyBySlug } from '../data/marketplaceDetails';
import '../styles/marketplace.css';

export default function MarketplacePropertyPage() {
  const { slug } = useParams<{ slug: string }>();
  const property = slug ? getPropertyBySlug(slug) : undefined;

  if (!property) {
    return <Navigate to="/marketplace" replace />;
  }

  return (
    <div className="animate-routeFadeIn">
      <div className="app-container overflow-x-hidden bg-lofty-purple-800 text-white">
        <Header />
        <main className="dark pb-16">
          <div className="border-b border-white/10 px-6 py-3 sm:px-12 lg:px-16">
            <LocalLink
              to="/marketplace"
              className="inline-flex items-center gap-2 text-sm text-white/60 no-underline transition-colors hover:text-white"
            >
              <i className="fas fa-arrow-left text-xs" aria-hidden="true" />
              Back to Marketplace
            </LocalLink>
          </div>

          <PropertyGallery property={property} />

          <div className="mx-auto grid max-w-7xl gap-8 px-6 py-8 sm:px-12 lg:grid-cols-[minmax(0,1fr)_320px] lg:px-16 xl:grid-cols-[minmax(0,1fr)_360px]">
            <div className="space-y-8">
              <PropertyHeaderSection property={property} />
              <PropertyChartSection property={property} />
              <PropertyAboutSection property={property} />
              <PropertyReviewsSection property={property} />
            </div>

            <div className="lg:sticky lg:top-20 lg:self-start">
              <PropertyInvestCard property={property} />
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}
