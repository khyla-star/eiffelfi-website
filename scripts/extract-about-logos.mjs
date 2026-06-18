import fs from 'fs';
import path from 'path';
import * as cheerio from 'cheerio';

const root = path.resolve('src/1');
const html = fs.readFileSync(
  path.join(root, 'About Lofty _ The team behind fractional real estate.html'),
  'utf8',
);
const outDir = path.resolve('public/assets/about');
fs.mkdirSync(outDir, { recursive: true });

const $ = cheerio.load(html);
const app = $('.app-container').first();
app.find('header, footer').remove();
const $c = cheerio.load(`<div>${app.html()}</div>`);

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function saveLogo(sectionIndex, label) {
  const logos = [];
  $c('section')
    .eq(sectionIndex)
    .find('img')
    .each((_, el) => {
      const alt = ($c(el).attr('alt') ?? 'logo').trim();
      const src = $c(el).attr('src') ?? '';
      let fileName = '';

      if (src.includes('_files/')) {
        fileName = path.basename(src);
        if (!fs.existsSync(path.join(outDir, fileName))) {
          fs.copyFileSync(path.join(root, 'About Lofty _ The team behind fractional real estate_files', fileName), path.join(outDir, fileName));
        }
      } else if (src.startsWith('data:image/')) {
        const match = src.match(/^data:image\/(\w+);base64,(.+)$/);
        if (!match) return;
        const ext = match[1] === 'svg+xml' ? 'svg' : match[1];
        fileName = `${slugify(alt)}.${ext}`;
        fs.writeFileSync(path.join(outDir, fileName), Buffer.from(match[2], 'base64'));
      }

      if (fileName) {
        logos.push({ alt, src: `/assets/about/${fileName}` });
        console.log(`${label}: saved ${fileName} (${alt})`);
      }
    });

  return logos;
}

const backers = saveLogo(2, 'backer');
const press = saveLogo(3, 'press');

const ts = `import type { AboutLogo } from '../types/about';

export const aboutBackerLogos = ${JSON.stringify(backers, null, 2)} satisfies AboutLogo[];

export const aboutPressLogos = ${JSON.stringify(press, null, 2)} satisfies AboutLogo[];
`;

fs.writeFileSync(path.resolve('src/data/aboutLogos.generated.ts'), ts, 'utf8');
console.log('\nWrote src/data/aboutLogos.generated.ts');
