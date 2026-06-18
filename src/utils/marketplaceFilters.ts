import type { MarketplaceProperty, MarketplaceSortOption } from '../types/marketplace';

function parseYield(value: string) {
  return parseFloat(value.replace('%', '')) || 0;
}

function parsePrice(value: string) {
  return parseFloat(value.replace(/[$,]/g, '')) || 0;
}

function parseInvestors(value: string) {
  return parseInt(value.replace(/,/g, ''), 10) || 0;
}

function tagMatchesFilter(property: MarketplaceProperty, filter: string) {
  const tags = property.tags.map((t) => t.toLowerCase());

  switch (filter) {
    case 'All Markets':
    case 'All Managers':
      return true;
    case 'Cash Flowing':
      return tags.some((t) => t.includes('cash flowing'));
    case 'Single Family':
      return tags.some((t) => t.includes('single family'));
    case 'Multi Family':
      return tags.some((t) => t.includes('multi family'));
    case 'Vacation Rentals':
      return tags.some((t) => t.includes('vacation rental'));
    case 'Commercial':
      return tags.some((t) => t.includes('commercial'));
    case 'Owner Occupied':
      return tags.some((t) => t.includes('owner occupied'));
    case 'Seller Buyback':
      return tags.some((t) => t.includes('seller buyback'));
    default:
      return true;
  }
}

export function filterProperties(properties: MarketplaceProperty[], activeFilter: string) {
  return properties.filter((property) => tagMatchesFilter(property, activeFilter));
}

export function sortProperties(properties: MarketplaceProperty[], sortBy: MarketplaceSortOption) {
  const sorted = [...properties];

  switch (sortBy) {
    case 'Highest Yield':
      return sorted.sort((a, b) => parseYield(b.yield) - parseYield(a.yield));
    case 'Lowest Price':
      return sorted.sort((a, b) => parsePrice(a.tokenPrice) - parsePrice(b.tokenPrice));
    case 'Most Investors':
      return sorted.sort((a, b) => parseInvestors(b.investors) - parseInvestors(a.investors));
    default:
      return sorted;
  }
}
