import fs from 'fs';
import path from 'path';
import * as cheerio from 'cheerio';

const root = path.resolve('src/1');
const htmlPath = path.join(root, 'Fractional Real Estate Marketplace _ Lofty.html');
const filesDir = path.join(root, 'Fractional Real Estate Marketplace _ Lofty_files');
const outDir = path.resolve('public/assets/marketplace');
const dataOut = path.resolve('src/data/marketplace.generated.ts');
const LIMIT = 30;
const MIN_IMAGES = 3;
const CONCURRENCY = 12;

fs.mkdirSync(outDir, { recursive: true });

const html = fs.readFileSync(htmlPath, 'utf8');
const $ = cheerio.load(html);

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function localPathForFile(fileName) {
  return path.join(outDir, fileName);
}

function publicPathForFile(fileName) {
  return `/assets/marketplace/${fileName}`;
}

function resolveLocalScrapedFile(fileName) {
  const candidates = [
    path.join(filesDir, fileName),
    path.join(filesDir, fileName.replace(/\.webp$/i, '.jpg')),
    path.join(filesDir, fileName.replace(/\.jpg$/i, '.webp')),
  ];
  return candidates.find((candidate) => fs.existsSync(candidate)) ?? null;
}

async function downloadImage(url, fileName) {
  const dest = localPathForFile(fileName);
  if (fs.existsSync(dest)) return publicPathForFile(fileName);

  const local = resolveLocalScrapedFile(fileName);
  if (local) {
    fs.copyFileSync(local, dest);
    return publicPathForFile(path.basename(local));
  }

  if (!url) return '';

  try {
    let response = await fetch(url, { signal: AbortSignal.timeout(15000) });
    if (!response.ok && url.endsWith('.webp')) {
      response = await fetch(url.replace(/\.webp$/i, '.jpg'), { signal: AbortSignal.timeout(15000) });
      if (response.ok) fileName = fileName.replace(/\.webp$/i, '.jpg');
    }
    if (!response.ok) return '';
    fs.writeFileSync(localPathForFile(fileName), Buffer.from(await response.arrayBuffer()));
    return publicPathForFile(fileName);
  } catch {
    return '';
  }
}

async function runPool(tasks, limit) {
  const results = new Array(tasks.length);
  let next = 0;

  async function worker() {
    while (next < tasks.length) {
      const index = next++;
      results[index] = await tasks[index]();
    }
  }

  await Promise.all(Array.from({ length: Math.min(limit, tasks.length) }, worker));
  return results;
}

function parseSrcsetUrl(srcset) {
  const match = srcset.match(/https:\/\/images\.lofty\.ai\/[^\s]+/);
  return match?.[0] ?? '';
}

function collectCardImageEntries(card) {
  const seen = new Set();
  const entries = [];

  card.find('.swiper-slide').each((_, slideEl) => {
    const slide = $(slideEl);
    const webpSrcset = slide.find('source[type="image/webp"]').attr('srcset') ?? '';
    const jpgSrcset = slide.find('source[type="image/jpeg"]').attr('srcset') ?? '';
    const cdnUrl = parseSrcsetUrl(webpSrcset) || parseSrcsetUrl(jpgSrcset);
    if (!cdnUrl) return;
    const fileName = path.basename(cdnUrl.split('?')[0]);
    if (seen.has(fileName)) return;
    seen.add(fileName);
    entries.push({ fileName, cdnUrl });
  });

  return entries;
}

function parseYield(text) {
  const m = text.match(/(\d+(?:\.\d+)?%)/);
  return m ? m[1] : '';
}

function parseInvestors(text) {
  const m = text.match(/([\d,]+)\s*investors?/i);
  return m ? m[1] : '';
}

function parsePrice(text) {
  const m = text.match(/\$[\d,]+(?:\.\d+)?/);
  return m ? m[0] : '';
}

function parseLocationFromHref(href) {
  const m = href.match(/_([A-Za-z .'-]+)-([A-Z]{2})-(\d{5})/);
  if (!m) return '';
  return `${m[1].replace(/-/g, ' ')}, ${m[2]} ${m[3]}`;
}

function parseUndervalued(text) {
  const m = text.match(/(\d+(?:\.\d+)?%)\s*Undervalued/i);
  return m ? `${m[1]} Undervalued` : '';
}

const stats = [];
$('#marketplace-landing')
  .find('.hidden.sm\\:flex span.whitespace-nowrap')
  .each((_, el) => {
    const t = $(el).text().replace(/\s+/g, ' ').trim();
    if (t) stats.push(t);
  });

const filters = [];
$('#marketplace-landing')
  .find('button')
  .each((_, el) => {
    const t = $(el).text().replace(/\s+/g, ' ').trim();
    if (
      t &&
      !['Log In', 'Sign Up', 'Grid', 'List', 'Filters', 'Default'].includes(t) &&
      t.length < 40
    ) {
      filters.push(t);
    }
  });
const uniqueFilters = [...new Set(filters)];

const cardEls = $('#marketplace-landing').find('[class*="group/card"]');
console.log('Found cards:', cardEls.length);

const cardData = [];
cardEls.each((index, el) => {
  const card = $(el);
  const entries = collectCardImageEntries(card);
  if (entries.length < MIN_IMAGES) return;

  let title = card.find('h3').first().text().trim();
  if (!title) {
    title = card.find('[class*="font-semibold"], [class*="font-bold"]').first().text().trim();
  }

  const linkEl = card.closest('a').length ? card.closest('a') : card.find('a').first();
  const href = linkEl.attr('href') ?? '#';
  const fullText = card.text().replace(/\s+/g, ' ').trim();

  let location = card.find('p.text-xs.text-gray-500').first().text().trim();
  if (!location) {
    card.find('p').each((_, s) => {
      const t = $(s).text().trim();
      if (/^[A-Za-z .'-]+,\s*[A-Z]{2}\s*\d{5}$/.test(t) && !location) location = t;
    });
  }
  if (!location) location = parseLocationFromHref(href);

  cardData.push({
    index,
    entries,
    title: title || `Property ${index + 1}`,
    href,
    location,
    tags: card
      .find('span.backdrop-blur-sm')
      .map((_, s) => $(s).text().trim())
      .get()
      .filter(Boolean),
    yield: parseYield(fullText),
    investors: parseInvestors(fullText),
    tokenPrice: parsePrice(fullText),
    undervalued: parseUndervalued(fullText),
  });
});

const uniqueDownloads = new Map();
for (const card of cardData) {
  for (const entry of card.entries) {
    if (!uniqueDownloads.has(entry.fileName)) {
      uniqueDownloads.set(entry.fileName, entry.cdnUrl);
    }
  }
}

console.log('Downloading', uniqueDownloads.size, 'unique images...');
const downloadTasks = [...uniqueDownloads.entries()].map(
  ([fileName, cdnUrl]) => async () => {
    const saved = await downloadImage(cdnUrl, fileName);
    return [fileName, saved];
  },
);
const downloaded = await runPool(downloadTasks, CONCURRENCY);
const imageMap = new Map(downloaded);

const properties = [];
for (const card of cardData) {
  const images = card.entries
    .map((entry) => imageMap.get(entry.fileName) ?? '')
    .filter(Boolean)
    .filter((value, idx, arr) => arr.indexOf(value) === idx);

  if (images.length < MIN_IMAGES) {
    console.warn(`Skipping ${card.title}: only ${images.length} images available`);
    continue;
  }

  properties.push({
    slug: slugify(card.title),
    href: card.href,
    title: card.title,
    location: card.location,
    tags: card.tags,
    image: images[0],
    images: images.slice(0, 5),
    yield: card.yield,
    investors: card.investors,
    tokenPrice: card.tokenPrice,
    undervalued: card.undervalued,
  });

  if (properties.length >= LIMIT) break;
}

console.log('Extracted:', properties.length);

const data = `import type { MarketplaceProperty, MarketplaceStats, MarketplaceFilters } from '../types/marketplace';

export const marketplaceStats = ${JSON.stringify(stats, null, 2)} satisfies MarketplaceStats;

export const marketplaceFilters = ${JSON.stringify(uniqueFilters, null, 2)} satisfies MarketplaceFilters;

export const marketplaceProperties = ${JSON.stringify(properties, null, 2)} satisfies MarketplaceProperty[];
`;

fs.writeFileSync(dataOut, data, 'utf8');
console.log('Wrote', dataOut);
