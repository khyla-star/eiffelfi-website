import fs from 'fs';
import * as cheerio from 'cheerio';

const html = fs.readFileSync('src/generated/landing.html', 'utf8');
const $ = cheerio.load(html);

const header = $('header').html() || '';
const footer = $('footer').html() || '';
const sections = $('main section')
  .map((i, el) => ({
    index: i,
    id: $(el).attr('id') || `section-${i}`,
    className: $(el).attr('class') || '',
    heading: $(el).find('h1,h2,h3').first().text().trim().slice(0, 80),
    html: $.html(el),
    length: $.html(el).length,
  }))
  .get();

console.log('header length:', header.length);
console.log('footer length:', footer.length);
sections.forEach((s) => {
  console.log(`${s.index}: ${s.length} chars | #${s.id} | "${s.heading}"`);
});

fs.mkdirSync('scripts/extracted', { recursive: true });
fs.writeFileSync('scripts/extracted/header.html', header);
fs.writeFileSync('scripts/extracted/footer.html', footer);
sections.forEach((s) => {
  fs.writeFileSync(`scripts/extracted/section-${s.index}.html`, s.html);
});
