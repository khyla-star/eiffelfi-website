import { getPropertyManager } from '../utils/marketplacePropertyMeta';
import { marketplaceProperties } from './marketplace.generated';
import type { MarketplaceProperty, MarketplacePropertyDetail, MarketplaceReview } from '../types/marketplace';

const REVIEW_POOL: Omit<MarketplaceReview, 'date'>[] = [
  {
    author: 'Michael R.',
    rating: 5,
    text: 'Strong rental demand in this market. Daily distributions have been consistent since I invested.',
  },
  {
    author: 'Sarah T.',
    rating: 5,
    text: 'Transparent reporting and easy to track performance from my EiffelFi wallet.',
  },
  {
    author: 'James L.',
    rating: 4,
    text: 'Good yield for the price point. Property management has been responsive to tenant needs.',
  },
  {
    author: 'Priya K.',
    rating: 5,
    text: 'Exactly what I wanted for diversifying beyond stocks. The marketplace makes buying simple.',
  },
  {
    author: 'David M.',
    rating: 4,
    text: 'Solid location fundamentals. I like being able to sell shares when I need liquidity.',
  },
  {
    author: 'Emily W.',
    rating: 5,
    text: 'Clear property documents and fair valuation metrics gave me confidence before investing.',
  },
];

const DETAIL_OVERRIDES: Record<string, Partial<MarketplacePropertyDetail>> = {
  '9-country-club-ln-n': {
    sharePrice: '$17.14',
    avgRentalYield: '4.89%',
    currentRentalYield: '0%',
    beds: 4,
    baths: 6,
    sqft: 4151,
    badges: ['Vacation Rental', 'Airbnb Listing'],
    manager: 'Foncia Gestion',
    marketValue: '$672,487',
    fairValue: '$1,579,698',
    valuationLabel: '57% undervalued',
    about:
      'Hudson River-view retreat in Briarcliff Manor, just 25 miles from Midtown Manhattan, offering a premium short- and medium-term rental experience. Stone Manor features four bedrooms, six bathrooms, spacious living areas, a game room, and a fully equipped kitchen, blending classic charm with modern amenities. Outdoor highlights include a shaded patio with grill, manicured grounds, and proximity to local dining and recreation.',
    reviews: [
      {
        author: 'Alex P.',
        rating: 5,
        date: 'Mar 2026',
        text: 'Premium vacation rental with strong weekend booking demand near NYC.',
      },
      {
        author: 'Jordan H.',
        rating: 5,
        date: 'Feb 2026',
        text: 'Impressive property quality and clear upside in the valuation metrics.',
      },
      {
        author: 'Casey N.',
        rating: 4,
        date: 'Jan 2026',
        text: 'Well-managed asset with transparent investor updates each month.',
      },
      {
        author: 'Riley S.',
        rating: 5,
        date: 'Dec 2025',
        text: 'Great entry price per share for a high-end short-term rental market.',
      },
    ],
  },
};

function hashSlugLocal(slug: string) {
  let hash = 0;
  for (let i = 0; i < slug.length; i++) hash = (hash + slug.charCodeAt(i) * (i + 1)) % 9973;
  return hash;
}

function formatCurrency(value: number) {
  return `$${Math.round(value).toLocaleString('en-US')}`;
}

function buildReviews(slug: string, count: number): MarketplaceReview[] {
  const start = hashSlugLocal(slug) % REVIEW_POOL.length;
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  return Array.from({ length: count }, (_, i) => {
    const template = REVIEW_POOL[(start + i) % REVIEW_POOL.length];
    return {
      ...template,
      date: `${months[(start + i) % 12]} 2026`,
    };
  });
}

function buildDetail(property: MarketplaceProperty): MarketplacePropertyDetail {
  const hash = hashSlugLocal(property.slug);
  const price = parseFloat(property.tokenPrice.replace(/[$,]/g, '')) || 50;
  const yieldPct = parseFloat(property.yield.replace('%', '')) || 8;
  const undervaluedPct = parseFloat(property.undervalued.replace(/[^\d.]/g, '')) || 5 + (hash % 20);

  const marketNum = Math.round(price * (800 + (hash % 400)));
  const fairNum = Math.round(marketNum * (1 + undervaluedPct / 100));

  const isVacation = property.tags.some((t) => t.toLowerCase().includes('vacation'));
  const badges = isVacation ? [...property.tags, 'Airbnb Listing'] : [...property.tags];

  const base: MarketplacePropertyDetail = {
    ...property,
    sharePrice: property.tokenPrice.includes('.') ? property.tokenPrice : `$${price.toFixed(2)}`,
    avgRentalYield: `${yieldPct.toFixed(2)}%`,
    currentRentalYield: hash % 3 === 0 ? '0%' : `${(yieldPct * 0.85).toFixed(2)}%`,
    beds: 2 + (hash % 4),
    baths: 1 + (hash % 4),
    sqft: 1200 + (hash % 30) * 100,
    badges,
    manager: getPropertyManager(property.slug),
    about: `${property.title} is a ${property.tags[0]?.toLowerCase() ?? 'residential'} investment on EiffelFi located in ${property.location}. This tokenized property lets investors earn rental income through fractional ownership with daily distributions and marketplace liquidity.`,
    marketValue: formatCurrency(marketNum),
    fairValue: formatCurrency(fairNum),
    valuationLabel: property.undervalued
      ? property.undervalued.toLowerCase().replace('undervalued', 'undervalued')
      : `${undervaluedPct}% undervalued`,
    reviews: buildReviews(property.slug, 3 + (hash % 2)),
    allPhotos: [...new Set([...property.images, property.image])],
  };

  return { ...base, ...DETAIL_OVERRIDES[property.slug] };
}

export const marketplacePropertyDetails: MarketplacePropertyDetail[] =
  marketplaceProperties.map(buildDetail);

export function getPropertyBySlug(slug: string) {
  return marketplacePropertyDetails.find((p) => p.slug === slug);
}
