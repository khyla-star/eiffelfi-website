import { useMemo, useState } from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import MarketplaceToolbar from '../components/marketplace/MarketplaceToolbar';
import MarketplaceStatsBar from '../components/marketplace/MarketplaceStatsBar';
import MarketplaceGrid, {
  MARKETPLACE_INITIAL_VISIBLE,
  MARKETPLACE_PAGE_SIZE,
} from '../components/marketplace/MarketplaceGrid';
import { marketplaceProperties } from '../data/marketplace.generated';
import type { MarketplaceSortOption } from '../types/marketplace';
import { filterProperties, sortProperties } from '../utils/marketplaceFilters';
import '../styles/marketplace.css';

export default function MarketplacePage() {
  const [activeFilter, setActiveFilter] = useState('All Markets');
  const [sortBy, setSortBy] = useState<MarketplaceSortOption>('Default');
  const [visibleCount, setVisibleCount] = useState(MARKETPLACE_INITIAL_VISIBLE);

  const filteredProperties = useMemo(() => {
    const filtered = filterProperties(marketplaceProperties, activeFilter);
    return sortProperties(filtered, sortBy);
  }, [activeFilter, sortBy]);

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
    setVisibleCount(MARKETPLACE_INITIAL_VISIBLE);
  };

  const handleSortChange = (sort: MarketplaceSortOption) => {
    setSortBy(sort);
    setVisibleCount(MARKETPLACE_INITIAL_VISIBLE);
  };

  return (
    <div className="animate-routeFadeIn">
      <div className="app-container overflow-x-hidden bg-white text-lofty-purple-700 dark:bg-lofty-purple-800 dark:text-white">
        <Header />
        <main className="dark" id="marketplace-landing">
          <h1 className="sr-only">Fractional Real Estate Marketplace | EiffelFi</h1>
          <p className="sr-only">
            Browse rental properties on EiffelFi. Buy fractional shares from $50, earn daily rent, and sell anytime.
          </p>

          <div className="sticky z-40 bg-white dark:bg-lofty-purple-800" style={{ top: 'var(--top-mkt-bar-offset, 64px)' }}>
            <MarketplaceToolbar
              activeFilter={activeFilter}
              sortBy={sortBy}
              onFilterChange={handleFilterChange}
              onSortChange={handleSortChange}
            />
            <MarketplaceStatsBar />
          </div>

          <div className="pb-12 bg-white dark:bg-lofty-purple-800">
            <MarketplaceGrid
              properties={filteredProperties}
              visibleCount={visibleCount}
              onShowMore={() =>
                setVisibleCount((count) => Math.min(count + MARKETPLACE_PAGE_SIZE, filteredProperties.length))
              }
              onShowLess={() =>
                setVisibleCount((count) => Math.max(count - MARKETPLACE_PAGE_SIZE, MARKETPLACE_INITIAL_VISIBLE))
              }
            />
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}
