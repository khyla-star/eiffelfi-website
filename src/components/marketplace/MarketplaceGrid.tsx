import type { MarketplaceProperty } from '../../types/marketplace';
import { MARKETPLACE_INITIAL_VISIBLE, MARKETPLACE_PAGE_SIZE } from '../../types/marketplace';
import MarketplacePropertyCard from './MarketplacePropertyCard';

type MarketplaceGridProps = {
  properties: MarketplaceProperty[];
  visibleCount: number;
  onShowMore: () => void;
  onShowLess: () => void;
};

export default function MarketplaceGrid({
  properties,
  visibleCount,
  onShowMore,
  onShowLess,
}: MarketplaceGridProps) {
  const visible = properties.slice(0, visibleCount);
  const canShowMore = visibleCount < properties.length;
  const canShowLess = visibleCount > MARKETPLACE_INITIAL_VISIBLE;

  return (
    <div className="bg-white px-6 dark:bg-lofty-purple-800 sm:px-12 lg:px-16">
      <h2 className="sr-only">Available investment properties</h2>

      {visible.length === 0 ? (
        <p className="py-16 text-center text-sm text-gray-500 dark:text-white/50">
          No properties match this filter. Try another category.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-6 py-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8 xl:grid-cols-4 xl:gap-10 3xl:grid-cols-5">
          {visible.map((property) => (
            <MarketplacePropertyCard key={property.slug} property={property} />
          ))}
        </div>
      )}

      {(canShowMore || canShowLess) && visible.length > 0 && (
        <div className="flex justify-center gap-3 pb-10">
          {canShowLess && (
            <button
              type="button"
              onClick={onShowLess}
              className="rounded-full border border-lofty/40 px-6 py-2.5 text-sm font-semibold text-lofty transition-colors hover:bg-lofty/10 dark:border-white/20 dark:text-white dark:hover:bg-white/10"
            >
              Show Less
            </button>
          )}
          {canShowMore && (
            <button
              type="button"
              onClick={onShowMore}
              className="rounded-full bg-lofty px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-lofty-purple-300"
            >
              View More
            </button>
          )}
        </div>
      )}

      {visible.length > 0 && (
        <p className="pb-6 text-center text-xs text-gray-400 dark:text-white/40">
          Showing {visible.length} of {properties.length} properties
        </p>
      )}
    </div>
  );
}

export { MARKETPLACE_INITIAL_VISIBLE, MARKETPLACE_PAGE_SIZE };
