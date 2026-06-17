import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import * as cheerio from 'cheerio';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');

const SECTION_NAMES = [
  'HeroSection',
  'MarketplaceSection',
  'PressLogosSection',
  'HowItWorksSection',
  'JerryQuoteSection',
  'LegacyMarketSection',
  'PropertyFractionsSection',
  'ProInvestSection',
  'EveryoneSection',
  'FaqSection',
  'FinalCtaSection',
];

const BOOLEAN_ATTRS = new Set([
  'async',
  'autofocus',
  'autoplay',
  'checked',
  'controls',
  'defer',
  'disabled',
  'formnovalidate',
  'hidden',
  'inert',
  'loop',
  'multiple',
  'muted',
  'novalidate',
  'open',
  'playsinline',
  'readonly',
  'required',
  'selected',
]);

const VOID_TAGS = new Set([
  'area',
  'base',
  'br',
  'col',
  'embed',
  'hr',
  'img',
  'input',
  'link',
  'meta',
  'param',
  'source',
  'track',
  'wbr',
]);

const ATTR_MAP = {
  class: 'className',
  for: 'htmlFor',
  tabindex: 'tabIndex',
  readonly: 'readOnly',
  autofocus: 'autoFocus',
  colspan: 'colSpan',
  rowspan: 'rowSpan',
  charset: 'charSet',
  crossorigin: 'crossOrigin',
  fillrule: 'fillRule',
  cliprule: 'clipRule',
  'stroke-width': 'strokeWidth',
  'stroke-linecap': 'strokeLinecap',
  'stroke-linejoin': 'strokeLinejoin',
  'fill-opacity': 'fillOpacity',
  'clip-path': 'clipPath',
  'stop-color': 'stopColor',
  'stop-opacity': 'stopOpacity',
  viewbox: 'viewBox',
  preserveaspectratio: 'preserveAspectRatio',
  allowfullscreen: 'allowFullScreen',
  fetchpriority: 'fetchPriority',
  nomodule: 'noModule',
  datetime: 'dateTime',
  enctype: 'encType',
  formaction: 'formAction',
  srcset: 'srcSet',
  'xlink:href': 'xlinkHref',
  'xmlns:xlink': 'xmlnsXlink',
};

function toLocalPath(url) {
  if (!url || url.startsWith('#') || url.startsWith('/')) return url || '/';
  if (url.startsWith('mailto:')) return '/support';
  try {
    const parsed = new URL(url);
    if (parsed.hostname === 'www.lofty.ai' || parsed.hostname === 'lofty.ai') {
      return parsed.pathname || '/';
    }
    if (parsed.hostname === 'amm.lofty.ai') {
      return '/amm' + (parsed.pathname === '/' ? '' : parsed.pathname);
    }
    if (parsed.hostname === 'merch.lofty.ai') {
      return '/merch' + (parsed.pathname === '/' ? '' : parsed.pathname);
    }
    if (parsed.hostname === 'www.facebook.com') return '/social/facebook';
    if (parsed.hostname === 'www.linkedin.com') return '/social/linkedin';
    if (parsed.hostname === 'x.com') return '/social/x';
  } catch {
    return url;
  }
  return url;
}

function isLocalPath(url) {
  if (!url || url.startsWith('#')) return false;
  const local = toLocalPath(url);
  return local.startsWith('/') && !local.startsWith('//');
}

function escapeJsxText(text) {
  if (text.includes('{') || text.includes('}')) {
    return `{'${text.replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'}`;
  }
  return text;
}

function jsxAttrValue(value) {
  return value.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
}

function convertStyle(styleStr) {
  const parts = styleStr
    .split(';')
    .map((pair) => pair.trim())
    .filter(Boolean)
    .map((pair) => {
      const colon = pair.indexOf(':');
      if (colon === -1) return null;
      const key = pair.slice(0, colon).trim();
      const value = pair.slice(colon + 1).trim();
      const camelKey = key.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
      return `${camelKey}: '${jsxAttrValue(value)}'`;
    })
    .filter(Boolean);

  return `{${parts.join(', ')}}`;
}

function renderAttributes(el, tagName) {
  const attribs = el.attribs || {};
  const parts = [];
  let useLocalLink = false;

  for (const [rawName, rawValue] of Object.entries(attribs)) {
    const name = ATTR_MAP[rawName.toLowerCase()] || ATTR_MAP[rawName] || rawName;

    if (name === 'className') {
      parts.push(`className="${jsxAttrValue(rawValue)}"`);
      continue;
    }

    if (name === 'style') {
      parts.push(`style={${convertStyle(rawValue)}}`);
      continue;
    }

    if (tagName === 'a' && name === 'href') {
      if (isLocalPath(rawValue)) {
        useLocalLink = true;
        parts.push(`to="${jsxAttrValue(toLocalPath(rawValue))}"`);
      } else {
        parts.push(`href="${jsxAttrValue(rawValue)}"`);
      }
      continue;
    }

    if (rawValue === '' || rawValue === undefined) {
      if (BOOLEAN_ATTRS.has(rawName.toLowerCase())) {
        parts.push(name);
      } else {
        parts.push(`${name}=""`);
      }
      continue;
    }

    if (rawValue === rawName && BOOLEAN_ATTRS.has(rawName.toLowerCase())) {
      parts.push(name);
      continue;
    }

    parts.push(`${name}="${jsxAttrValue(rawValue)}"`);
  }

  return { attrs: parts.length ? ' ' + parts.join(' ') : '', useLocalLink };
}

function renderNode(el, depth = 0) {
  if (el.type === 'text') {
    const text = el.data ?? '';
    if (!text.trim()) return '';
    return escapeJsxText(text);
  }

  if (el.type === 'comment') return '';

  if (el.type !== 'tag') return '';

  const tagName = el.name;
  const indent = '  '.repeat(depth);
  const childIndent = '  '.repeat(depth + 1);

  if (tagName === 'a') {
    const { attrs, useLocalLink } = renderAttributes(el, tagName);
    const open = useLocalLink ? 'LocalLink' : 'a';
    const children = (el.children || [])
      .map((child) => renderNode(child, depth + 1))
      .filter(Boolean)
      .join('\n');

    if (VOID_TAGS.has(tagName)) {
      return `${indent}<${open}${attrs} />`;
    }

    if (!children) {
      return `${indent}<${open}${attrs} />`;
    }

    return `${indent}<${open}${attrs}>\n${children}\n${indent}</${open}>`;
  }

  const { attrs } = renderAttributes(el, tagName);
  const children = (el.children || [])
    .map((child) => renderNode(child, depth + 1))
    .filter(Boolean);

  if (VOID_TAGS.has(tagName)) {
    return `${indent}<${tagName}${attrs} />`;
  }

  if (!children.length) {
    return `${indent}<${tagName}${attrs} />`;
  }

  return `${indent}<${tagName}${attrs}>\n${children.join('\n')}\n${indent}</${tagName}>`;
}

function htmlToJsx(html, depth = 0) {
  const $ = cheerio.load(`<wrapper>${html}</wrapper>`, { xml: false }, false);
  const wrapper = $.root().children().first();
  const nodes = wrapper.children().toArray();

  if (nodes.length === 1) {
    return renderNode(nodes[0], depth);
  }

  return nodes
    .map((node) => renderNode(node, depth))
    .filter(Boolean)
    .join('\n');
}

function usesLocalLink(jsx) {
  return jsx.includes('<LocalLink') || jsx.includes('</LocalLink>');
}

function wrapComponent(name, jsx) {
  const importLocalLink = usesLocalLink(jsx);
  const imports = importLocalLink
    ? "import LocalLink from '../common/LocalLink';\n\n"
    : '';

  return `${imports}export default function ${name}() {
  return (
${jsx}
  );
}
`;
}

function writeComponent(relativePath, name, html) {
  const jsx = htmlToJsx(html.trim(), 2);
  const content = wrapComponent(name, jsx);
  const outPath = path.join(root, relativePath);
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, content, 'utf8');
  console.log('Wrote', relativePath);
}

const extractedDir = path.join(__dirname, 'extracted');

writeComponent(
  'src/components/layout/Header.tsx',
  'Header',
  `<header class="sticky top-0 z-50 w-full border-b border-lofty-gray-300/60 bg-white/85 backdrop-blur-md">${fs.readFileSync(path.join(extractedDir, 'header.html'), 'utf8')}</header>`,
);

writeComponent(
  'src/components/layout/Footer.tsx',
  'Footer',
  `<footer class="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen overflow-x-hidden bg-lofty-purple-700 border-t border-white/10">${fs.readFileSync(path.join(extractedDir, 'footer.html'), 'utf8')}</footer>`,
);

SECTION_NAMES.forEach((name, index) => {
  const html = fs.readFileSync(path.join(extractedDir, `section-${index}.html`), 'utf8');
  writeComponent(`src/components/landing/${name}.tsx`, name, html);
});

const landingPage = `import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import HeroSection from '../components/landing/HeroSection';
import MarketplaceSection from '../components/landing/MarketplaceSection';
import PressLogosSection from '../components/landing/PressLogosSection';
import HowItWorksSection from '../components/landing/HowItWorksSection';
import JerryQuoteSection from '../components/landing/JerryQuoteSection';
import LegacyMarketSection from '../components/landing/LegacyMarketSection';
import PropertyFractionsSection from '../components/landing/PropertyFractionsSection';
import ProInvestSection from '../components/landing/ProInvestSection';
import EveryoneSection from '../components/landing/EveryoneSection';
import FaqSection from '../components/landing/FaqSection';
import FinalCtaSection from '../components/landing/FinalCtaSection';

export default function LandingPage() {
  return (
    <div className="animate-routeFadeIn">
      <div className="app-container overflow-x-hidden bg-white text-lofty-purple-700">
        <Header />
        <main>
          <HeroSection />
          <MarketplaceSection />
          <PressLogosSection />
          <HowItWorksSection />
          <JerryQuoteSection />
          <LegacyMarketSection />
          <PropertyFractionsSection />
          <ProInvestSection />
          <EveryoneSection />
          <FaqSection />
          <FinalCtaSection />
        </main>
        <Footer />
      </div>
    </div>
  );
}
`;

fs.writeFileSync(path.join(root, 'src/pages/LandingPage.tsx'), landingPage, 'utf8');
console.log('Wrote src/pages/LandingPage.tsx');
