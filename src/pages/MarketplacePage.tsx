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
import {
  MARKETPLACE_ALL_MANAGERS_ID,
  MARKETPLACE_ALL_MARKETS_ID,
} from '../data/marketplaceNav';
import type { MarketplaceSortOption } from '../types/marketplace';
import { filterProperties, sortProperties } from '../utils/marketplaceFilters';
import '../styles/marketplace.css';

export default function MarketplacePage() {
  const [selectedMarkets, setSelectedMarkets] = useState<Set<string>>(
    () => new Set([MARKETPLACE_ALL_MARKETS_ID]),
  );
  const [selectedManagers, setSelectedManagers] = useState<Set<string>>(
    () => new Set([MARKETPLACE_ALL_MANAGERS_ID]),
  );
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<MarketplaceSortOption>('Default');
  const [visibleCount, setVisibleCount] = useState(MARKETPLACE_INITIAL_VISIBLE);

  const filteredProperties = useMemo(() => {
    const filtered = filterProperties(marketplaceProperties, {
      selectedMarkets,
      selectedManagers,
      activeTag,
    });
    return sortProperties(filtered, sortBy);
  }, [selectedMarkets, selectedManagers, activeTag, sortBy]);

  const resetVisibleCount = () => {
    setVisibleCount(MARKETPLACE_INITIAL_VISIBLE);
  };

  return (
    <div className="animate-routeFadeIn">
      <div className="app-container marketplace-page overflow-x-hidden">
        <Header />
        <main className="dark" id="marketplace-landing">
          <h1 className="sr-only">Fractional Real Estate Marketplace | EiffelFi</h1>
          <p className="sr-only">
            Browse rental properties on EiffelFi. Buy fractional shares from $50, earn daily rent, and sell anytime.
          </p>

          <div className="marketplace-sticky-bar">
            <MarketplaceToolbar
              filters={{ selectedMarkets, selectedManagers, activeTag }}
              sortBy={sortBy}
              onFiltersChange={(filters) => {
                setSelectedMarkets(filters.selectedMarkets);
                setSelectedManagers(filters.selectedManagers);
                setActiveTag(filters.activeTag);
                resetVisibleCount();
              }}
              onSortChange={(sort) => {
                setSortBy(sort);
                resetVisibleCount();
              }}
            />
            <MarketplaceStatsBar />
          </div>

          <div className="marketplace-grid-wrap pb-12">
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
