import fs from 'fs';
import * as cheerio from 'cheerio';

const html = fs.readFileSync('src/1/About Lofty _ The team behind fractional real estate.html', 'utf8');
const $ = cheerio.load(html);
const app = $('.app-container').first();
app.find('header, footer').remove();
const $c = cheerio.load(`<div>${app.html()}</div>`);

function dumpSection(i, label) {
  console.log(`\n=== ${label} (section ${i}) ===`);
  $c('section')
    .eq(i)
    .find('img')
    .each((_, el) => {
      const src = $c(el).attr('src') ?? '';
      const alt = $c(el).attr('alt') ?? '';
      const isLocal = src.includes('_files/');
      const isData = src.startsWith('data:');
      console.log({ alt, isLocal, isData, src: src.slice(0, 120) });
    });
}

dumpSection(2, 'Backed by the best');
dumpSection(3, 'As seen in the press');
