export type MarketplaceNavOption = {
  id: string;
  label: string;
};

export type MarketplaceTagFilter = {
  id: string;
  label: string;
  icon: string;
};

export const MARKETPLACE_ALL_MARKETS_ID = 'all-markets';
export const MARKETPLACE_ALL_MANAGERS_ID = 'all-managers';

export const FRENCH_MARKET_CITIES: MarketplaceNavOption[] = [
  { id: 'Paris', label: 'Paris, Île-de-France' },
  { id: 'Lyon', label: 'Lyon, Auvergne-Rhône-Alpes' },
  { id: 'Marseille', label: 'Marseille, Provence-Alpes-Côte d\'Azur' },
  { id: 'Nice', label: 'Nice, Provence-Alpes-Côte d\'Azur' },
  { id: 'Bordeaux', label: 'Bordeaux, Nouvelle-Aquitaine' },
  { id: 'Toulouse', label: 'Toulouse, Occitanie' },
  { id: 'Lille', label: 'Lille, Hauts-de-France' },
  { id: 'Nantes', label: 'Nantes, Pays de la Loire' },
  { id: 'Strasbourg', label: 'Strasbourg, Grand Est' },
  { id: 'Montpellier', label: 'Montpellier, Occitanie' },
];

export const MARKETPLACE_TAG_FILTERS: MarketplaceTagFilter[] = [
  { id: 'Cash Flowing', label: 'Cash Flowing', icon: 'fa-wallet' },
  { id: 'Single Family', label: 'Single Family', icon: 'fa-house' },
  { id: 'Multi Family', label: 'Multi Family', icon: 'fa-building' },
  { id: 'Vacation Rentals', label: 'Vacation Rentals', icon: 'fa-umbrella-beach' },
  { id: 'Commercial', label: 'Commercial', icon: 'fa-store' },
  { id: 'Owner Occupied', label: 'Owner Occupied', icon: 'fa-key' },
  { id: 'Seller Buyback', label: 'Seller Buyback', icon: 'fa-hand-holding-dollar' },
];
