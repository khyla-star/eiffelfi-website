import { marketplaceFilters, marketplaceStats } from '../data/marketplace.generated';

export const MARKETPLACE_FILTERS = marketplaceFilters;
export const MARKETPLACE_STATS = marketplaceStats;

export const TAG_STYLES: Record<string, string> = {
  Commercial: 'bg-sky-900/70 text-sky-100',
  'Cash Flowing': 'bg-lofty/80 text-white',
  'Single Family': 'bg-emerald-900/70 text-emerald-100',
  'Multi Family': 'bg-violet-900/70 text-violet-100',
  'Vacation Rental': 'bg-amber-900/70 text-amber-100',
  'Vacation Rentals': 'bg-amber-900/70 text-amber-100',
  'Airbnb Listing': 'bg-white/15 text-white border border-white/20',
  'Owner Occupied': 'bg-indigo-900/70 text-indigo-100',
  'Seller Buyback': 'bg-rose-900/70 text-rose-100',
};

export function getTagStyle(tag: string) {
  return TAG_STYLES[tag] ?? 'bg-gray-900/70 text-gray-100';
}
