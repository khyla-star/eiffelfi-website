import type { MarketplaceProperty, MarketplaceSortOption } from '../types/marketplace';
import {
  MARKETPLACE_ALL_MANAGERS_ID,
  MARKETPLACE_ALL_MARKETS_ID,
} from '../data/marketplaceNav';
import { getPropertyCity, getPropertyManager } from './marketplacePropertyMeta';

export type MarketplaceFilterState = {
  selectedMarkets: Set<string>;
  selectedManagers: Set<string>;
  activeTag: string | null;
};

function parseYield(value: string) {
  return parseFloat(value.replace('%', '')) || 0;
}

function parsePrice(value: string) {
  return parseFloat(value.replace(/[$,€]/g, '')) || 0;
}

function parseInvestors(value: string) {
  return parseInt(value.replace(/,/g, ''), 10) || 0;
}

function tagMatchesFilter(property: MarketplaceProperty, filter: string) {
  const tags = property.tags.map((t) => t.toLowerCase());

  switch (filter) {
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

function matchesMarketFilter(property: MarketplaceProperty, selectedMarkets: Set<string>) {
  if (selectedMarkets.has(MARKETPLACE_ALL_MARKETS_ID) || selectedMarkets.size === 0) {
    return true;
  }

  const city = getPropertyCity(property.location);
  return selectedMarkets.has(city);
}

function matchesManagerFilter(property: MarketplaceProperty, selectedManagers: Set<string>) {
  if (selectedManagers.has(MARKETPLACE_ALL_MANAGERS_ID) || selectedManagers.size === 0) {
    return true;
  }

  return selectedManagers.has(getPropertyManager(property.slug));
}

export function filterProperties(properties: MarketplaceProperty[], filters: MarketplaceFilterState) {
  return properties.filter((property) => {
    if (!matchesMarketFilter(property, filters.selectedMarkets)) {
      return false;
    }

    if (!matchesManagerFilter(property, filters.selectedManagers)) {
      return false;
    }

    if (filters.activeTag && !tagMatchesFilter(property, filters.activeTag)) {
      return false;
    }

    return true;
  });
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

export function getManagerCounts(properties: MarketplaceProperty[]) {
  const counts = new Map<string, number>();

  for (const property of properties) {
    const manager = getPropertyManager(property.slug);
    counts.set(manager, (counts.get(manager) ?? 0) + 1);
  }

  return counts;
}

export function getDropdownButtonLabel(
  allId: string,
  allLabel: string,
  selected: Set<string>,
  options: Array<{ id: string; label: string }>,
) {
  if (selected.has(allId) || selected.size === 0) {
    return allLabel;
  }

  const selectedOptions = options.filter((option) => selected.has(option.id));

  if (selectedOptions.length === 1) {
    return selectedOptions[0].label.split(',')[0];
  }

  if (selectedOptions.length > 1) {
    return `${selectedOptions[0].label.split(',')[0]} +${selectedOptions.length - 1}`;
  }

  return allLabel;
}
