import fs from 'fs';
import path from 'path';
import * as cheerio from 'cheerio';

const html = fs.readFileSync('1.html', 'utf8');
const start = html.indexOf('<div class="animate-routeFadeIn">');
const styleStart = html.indexOf('id="intercom-lightweight-app-style"', start);
const styleTagStart = html.lastIndexOf('<style', styleStart);
const pageHtml = html.slice(start, styleTagStart);
const $ = cheerio.load(pageHtml);

const assetPrefix = './Buy Fractional Real Estate _ Lofty AI Investing App_files/';
const asset = (file) => `/assets/${file}`;

function toLocalPath(url) {
  if (!url || url.startsWith('/') || url.startsWith('#')) return url || '/';
  if (url.startsWith('mailto:')) return '/support';
  try {
    const parsed = new URL(url);
    if (parsed.hostname === 'www.lofty.ai' || parsed.hostname === 'lofty.ai') return parsed.pathname || '/';
    if (parsed.hostname === 'amm.lofty.ai') return '/amm' + (parsed.pathname === '/' ? '' : parsed.pathname);
    if (parsed.hostname === 'merch.lofty.ai') return '/merch' + (parsed.pathname === '/' ? '' : parsed.pathname);
    if (parsed.hostname === 'www.facebook.com') return '/social/facebook';
    if (parsed.hostname === 'www.linkedin.com') return '/social/linkedin';
    if (parsed.hostname === 'x.com') return '/social/x';
  } catch {
    return url;
  }
  return url;
}

function text(el) {
  return $(el).text().replace(/\s+/g, ' ').trim();
}

function fixAssets(value) {
  return value.replaceAll(assetPrefix, '/assets/');
}

const navLinks = $('header nav a')
  .map((_, el) => ({
    label: text(el),
    to: toLocalPath($(el).attr('href') || '/'),
    external: Boolean($(el).attr('target')),
  }))
  .get();

const heroSection = $('main section').eq(0);
const heroStats = heroSection
  .find('dl > div')
  .map((_, el) => ({
    label: text($(el).find('dt')),
    value: text($(el).find('dd')),
  }))
  .get();

const heroCard = {
  image: asset('hero-hearn.webp'),
  investors: heroSection.find('.fa-users').parent().text().replace(/\s+/g, ' ').trim(),
  lastPrice: text(heroSection.find('.fa-users').closest('.p-4, .p-6, .sm\\:p-6').find('p.text-2xl').first()) || '$35.59',
  change: text(heroSection.find('.text-lofty-green, .text-lofty-red').first()),
};

const tickerItems = [];
$('main section')
  .eq(1)
  .find('.flex.shrink-0.items-center.gap-2\\.5')
  .each((_, el) => {
    const img = $(el).find('img').attr('src')?.replace(assetPrefix, '/assets/') || '';
    const spans = $(el).find('> span');
    const changeEl = spans.last();
    const direction = changeEl.hasClass('text-lofty-green') ? 'up' : 'down';
    tickerItems.push({
      image: img,
      address: text(spans.eq(0)),
      price: text(spans.eq(1)),
      change: text(changeEl).replace(/[▼▲]/g, '').trim(),
      direction,
    });
  });

const uniqueTicker = [];
const seen = new Set();
for (const item of tickerItems) {
  const key = `${item.address}|${item.price}`;
  if (seen.has(key)) continue;
  seen.add(key);
  uniqueTicker.push(item);
}

const pressLogos = $('main section')
  .eq(2)
  .find('img')
  .map((_, el) => ({
    src: fixAssets($(el).attr('src') || ''),
    alt: $(el).attr('alt') || '',
  }))
  .get();

const howItWorks = $('main section')
  .eq(3)
  .find('.grid > div, [class*="grid"] > div')
  .map((_, el) => ({
    title: text($(el).find('h3')),
    description: text($(el).find('p')),
    image: fixAssets($(el).find('img').attr('src') || ''),
  }))
  .get()
  .filter((item) => item.title);

const faqItems = $('#faq details, main section#faq details')
  .map((_, el) => ({
    question: text($(el).find('summary')),
    answer: text($(el).find('p')),
  }))
  .get();

const footerColumns = [];
$('footer .grid > div, footer [class*="grid-cols"] > div').each((_, col) => {
  const heading = text($(col).find('h3').first());
  const links = $(col)
    .find('a')
    .map((__, el) => ({
      label: text(el),
      to: toLocalPath($(el).attr('href') || '/'),
    }))
    .get();
  if (heading || links.length) footerColumns.push({ heading, links });
});

const output = {
  navigation: {
    primary: navLinks,
    auth: {
      login: { label: 'Log In', to: '/login' },
      signup: { label: 'Sign Up', to: '/signup' },
    },
    logo: {
      light: asset('logo-light.ff9fcbf0916e664961e966b23ce0dcc5.svg'),
      dark: asset('logo-dark.26f6d49d3601bfad47d27f20d1ff4d10.svg'),
    },
  },
  hero: {
    title: text(heroSection.find('h1')),
    description: text(heroSection.find('h1').next('p')),
    stats: heroStats,
    cta: { label: text(heroSection.find('a.rounded-full.bg-lofty').first()), to: '/signup' },
    card: heroCard,
  },
  marketplaceTicker: uniqueTicker,
  pressLogos,
  howItWorks: {
    heading: text($('main section').eq(3).find('h2')),
    steps: howItWorks,
  },
  faq: {
    heading: text($('#faq h2, main section#faq h2')),
    items: faqItems,
  },
  footer: {
    tagline: text($('footer p').first()),
    columns: footerColumns,
  },
};

fs.mkdirSync('src/data', { recursive: true });
fs.writeFileSync('src/data/siteContent.json', JSON.stringify(output, null, 2));

function writeTs(name, typeName, importPath = './siteContent.json') {
  fs.writeFileSync(
    `src/data/${name}.ts`,
    `import content from '${importPath}';\n\nexport const ${name} = content.${typeName};\nexport type ${typeName.charAt(0).toUpperCase() + typeName.slice(1)} = typeof ${name};\n`,
  );
}

writeTs('navigation', 'navigation');
writeTs('hero', 'hero');
writeTs('marketplaceTicker', 'marketplaceTicker');
writeTs('pressLogos', 'pressLogos');
writeTs('howItWorks', 'howItWorks');
writeTs('faq', 'faq');
writeTs('footer', 'footer');

console.log('Generated src/data/*');
console.log('Ticker items:', uniqueTicker.length);
console.log('FAQ items:', faqItems.length);
