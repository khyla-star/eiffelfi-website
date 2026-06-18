export const MARKETPLACE_MANAGERS = [
  'Foncia Gestion',
  'Nexity Property Services',
  'Citya Immobilier',
  'BNP Paribas Real Estate',
  'Orpi Asset Management',
  'Immobilier Paris Sécurité',
  'Lyon Habitat Partners',
] as const;

export function hashSlug(slug: string) {
  let hash = 0;
  for (let i = 0; i < slug.length; i += 1) {
    hash = (hash << 5) - hash + slug.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

export function getPropertyManager(slug: string) {
  return MARKETPLACE_MANAGERS[hashSlug(slug) % MARKETPLACE_MANAGERS.length];
}

export function getPropertyCity(location: string) {
  return location.split(',')[0]?.trim() ?? location;
}
