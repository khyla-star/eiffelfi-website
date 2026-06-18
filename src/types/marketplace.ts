export type MarketplaceProperty = {
  slug: string;
  href: string;
  title: string;
  location: string;
  tags: string[];
  image: string;
  images: string[];
  yield: string;
  investors: string;
  tokenPrice: string;
  undervalued: string;
};

export type MarketplaceReview = {
  author: string;
  rating: number;
  date: string;
  text: string;
};

export type MarketplacePropertyDetail = MarketplaceProperty & {
  sharePrice: string;
  avgRentalYield: string;
  currentRentalYield: string;
  beds: number;
  baths: number;
  sqft: number;
  badges: string[];
  manager: string;
  about: string;
  marketValue: string;
  fairValue: string;
  valuationLabel: string;
  reviews: MarketplaceReview[];
  allPhotos: string[];
};

export type MarketplaceStats = string[];

export type MarketplaceFilters = string[];

export type MarketplaceSortOption = 'Default' | 'Highest Yield' | 'Lowest Price' | 'Most Investors';

export const MARKETPLACE_INITIAL_VISIBLE = 15;
export const MARKETPLACE_PAGE_SIZE = 10;
