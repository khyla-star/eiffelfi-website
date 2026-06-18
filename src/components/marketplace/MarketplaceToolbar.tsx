import { useMemo, useState } from 'react';
import type { MarketplaceSortOption } from '../../types/marketplace';
import {
  FRENCH_MARKET_CITIES,
  MARKETPLACE_ALL_MANAGERS_ID,
  MARKETPLACE_ALL_MARKETS_ID,
  MARKETPLACE_TAG_FILTERS,
} from '../../data/marketplaceNav';
import { marketplaceProperties } from '../../data/marketplace.generated';
import type { MarketplaceFilterState } from '../../utils/marketplaceFilters';
import { getDropdownButtonLabel, getManagerCounts } from '../../utils/marketplaceFilters';
import { MARKETPLACE_MANAGERS } from '../../utils/marketplacePropertyMeta';
import MarketplaceFilterDropdown from './MarketplaceFilterDropdown';

const SORT_OPTIONS: MarketplaceSortOption[] = [
  'Default',
  'Highest Yield',
  'Lowest Price',
  'Most Investors',
];

type MarketplaceToolbarProps = {
  filters: MarketplaceFilterState;
  sortBy: MarketplaceSortOption;
  onFiltersChange: (filters: MarketplaceFilterState) => void;
  onSortChange: (sort: MarketplaceSortOption) => void;
};

export default function MarketplaceToolbar({
  filters,
  sortBy,
  onFiltersChange,
  onSortChange,
}: MarketplaceToolbarProps) {
  const [openDropdown, setOpenDropdown] = useState<'markets' | 'managers' | null>(null);

  const managerCounts = useMemo(() => getManagerCounts(marketplaceProperties), []);
  const managerOptions = useMemo(
    () =>
      MARKETPLACE_MANAGERS.map((manager) => ({
        id: manager,
        label: manager,
        count: managerCounts.get(manager) ?? 0,
      })).filter((option) => option.count > 0),
    [managerCounts],
  );

  const marketsLabel = getDropdownButtonLabel(
    MARKETPLACE_ALL_MARKETS_ID,
    'All Markets',
    filters.selectedMarkets,
    FRENCH_MARKET_CITIES,
  );

  const managersLabel = getDropdownButtonLabel(
    MARKETPLACE_ALL_MANAGERS_ID,
    'All Managers',
    filters.selectedManagers,
    managerOptions,
  );

  function updateFilters(partial: Partial<MarketplaceFilterState>) {
    onFiltersChange({ ...filters, ...partial });
  }

  function toggleTag(tagId: string) {
    updateFilters({
      activeTag: filters.activeTag === tagId ? null : tagId,
    });
  }

  return (
    <section className="marketplace-toolbar">
      <div className="marketplace-toolbar__row">
        <div className="marketplace-toolbar__primary">
          <div className="marketplace-toolbar__dropdowns">
            <MarketplaceFilterDropdown
            label={marketsLabel}
            icon="fa-location-dot"
            allOption={{ id: MARKETPLACE_ALL_MARKETS_ID, label: 'All Markets' }}
            options={FRENCH_MARKET_CITIES}
            selected={filters.selectedMarkets}
            searchPlaceholder="Search markets..."
            isOpen={openDropdown === 'markets'}
            onToggle={() => setOpenDropdown((current) => (current === 'markets' ? null : 'markets'))}
            onClose={() => setOpenDropdown(null)}
            onChange={(selectedMarkets) => updateFilters({ selectedMarkets })}
          />

          <MarketplaceFilterDropdown
            label={managersLabel}
            icon="fa-user-tie"
            allOption={{ id: MARKETPLACE_ALL_MANAGERS_ID, label: 'All Property Managers' }}
            options={managerOptions}
            selected={filters.selectedManagers}
            searchPlaceholder="Search property managers..."
            isOpen={openDropdown === 'managers'}
            onToggle={() => setOpenDropdown((current) => (current === 'managers' ? null : 'managers'))}
            onClose={() => setOpenDropdown(null)}
            onChange={(selectedManagers) => updateFilters({ selectedManagers })}
            />
          </div>

          <div className="marketplace-toolbar__divider" aria-hidden="true" />

          <div className="marketplace-filter-scroll marketplace-toolbar__tags">
            {MARKETPLACE_TAG_FILTERS.map((tag) => {
              const active = filters.activeTag === tag.id;
              return (
                <button
                  key={tag.id}
                  type="button"
                  className={`marketplace-nav-tag${active ? ' marketplace-nav-tag--active' : ''}`}
                  onClick={() => toggleTag(tag.id)}
                  aria-pressed={active}
                >
                  <i className={`fal ${tag.icon} marketplace-nav-tag__icon`} aria-hidden="true" />
                  <span className="marketplace-nav-tag__label">{tag.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="marketplace-toolbar__sort">
          <select
            value={sortBy}
            onChange={(event) => onSortChange(event.target.value as MarketplaceSortOption)}
            aria-label="Sort properties"
            className="marketplace-sort-select"
          >
            {SORT_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <i className="fas fa-chevron-down marketplace-sort-select__icon" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
