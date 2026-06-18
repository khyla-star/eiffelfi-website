import type { MarketplaceSortOption } from '../../types/marketplace';
import { MARKETPLACE_FILTERS } from '../../data/marketplace';

const SORT_OPTIONS: MarketplaceSortOption[] = [
  'Default',
  'Highest Yield',
  'Lowest Price',
  'Most Investors',
];

type MarketplaceToolbarProps = {
  activeFilter: string;
  sortBy: MarketplaceSortOption;
  onFilterChange: (filter: string) => void;
  onSortChange: (sort: MarketplaceSortOption) => void;
};

export default function MarketplaceToolbar({
  activeFilter,
  sortBy,
  onFilterChange,
  onSortChange,
}: MarketplaceToolbarProps) {
  return (
    <section
      className="z-40 border-b border-gray-100 bg-white dark:border-transparent dark:bg-lofty-purple-800"
      style={{ paddingTop: 'env(safe-area-inset-top, 0px)' }}
    >
      <div className="hidden w-full justify-center bg-transparent px-8 py-3 lg:flex xl:px-16">
        <div className="flex w-full flex-1 items-center justify-between gap-4">
          <div className="marketplace-filter-scroll flex min-w-0 flex-1 items-center gap-2 overflow-x-auto">
            {MARKETPLACE_FILTERS.map((filter) => {
              const active = activeFilter === filter;
              return (
                <button
                  key={filter}
                  type="button"
                  onClick={() => onFilterChange(filter)}
                  className={`whitespace-nowrap rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors ${
                    active
                      ? 'bg-lofty-purple-700 text-white dark:bg-white/15 dark:text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-white/5 dark:text-white/60 dark:hover:bg-white/10 dark:hover:text-white/80'
                  }`}
                >
                  {filter}
                </button>
              );
            })}
          </div>

          <div className="relative shrink-0">
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value as MarketplaceSortOption)}
              aria-label="Sort properties"
              className="appearance-none rounded-lg border border-gray-200 bg-white py-1.5 pl-3 pr-8 text-xs font-medium text-gray-700 dark:border-white/10 dark:bg-white/5 dark:text-white/80"
            >
              {SORT_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <i
              className="fas fa-chevron-down pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] text-gray-400"
              aria-hidden="true"
            />
          </div>
        </div>
      </div>

      <div className="marketplace-filter-scroll flex items-center gap-2 overflow-x-auto px-4 py-2.5 lg:hidden">
        {MARKETPLACE_FILTERS.map((filter) => {
          const active = activeFilter === filter;
          return (
            <button
              key={filter}
              type="button"
              onClick={() => onFilterChange(filter)}
              className={`shrink-0 whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                active
                  ? 'bg-lofty-purple-700 text-white dark:bg-white/15 dark:text-white'
                  : 'bg-gray-100 text-gray-600 dark:bg-white/5 dark:text-white/60'
              }`}
            >
              {filter}
            </button>
          );
        })}
      </div>
    </section>
  );
}
