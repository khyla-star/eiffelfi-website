import fs from 'fs';
import * as cheerio from 'cheerio';

const html = fs.readFileSync('src/1/About Lofty _ The team behind fractional real estate.html', 'utf8');
const $ = cheerio.load(html);
const app = $('.app-container').first();
app.find('header, footer').remove();
const $c = cheerio.load(`<div>${app.html()}</div>`);

[0,1,2,3,4,6].forEach((i) => {
  const section = $c('section').eq(i);
  fs.writeFileSync(`scripts/about-section-${i}.html`, section.html()?.slice(0, 3500) ?? '', 'utf8');
  console.log('wrote section', i);
});
