import fs from 'fs';
import * as cheerio from 'cheerio';

const html = fs.readFileSync('src/generated/landing.html', 'utf8');
const $ = cheerio.load(html);

function summarize(el, depth = 0) {
  const tag = el.tagName?.toLowerCase();
  if (!tag) return;
  const cls = $(el).attr('class')?.split(/\s+/).slice(0, 4).join(' ') || '';
  const id = $(el).attr('id') || '';
  const label = id ? `#${id}` : cls ? `.${cls.split(' ')[0]}` : tag;
  console.log('  '.repeat(depth) + `<${tag}> ${label}`);

  if (depth < 3) {
    $(el)
      .children()
      .each((_, child) => summarize(child, depth + 1));
  }
}

console.log('=== TOP LEVEL ===');
$('.app-container')
  .children()
  .each((_, el) => {
    const tag = el.tagName?.toLowerCase();
    const cls = $(el).attr('class') || '';
    const id = $(el).attr('id') || '';
    console.log(`<${tag}> id="${id}" class="${cls.slice(0, 120)}"`);
  });

console.log('\n=== SECTIONS ===');
$('section').each((i, el) => {
  const cls = $(el).attr('class') || '';
  const id = $(el).attr('id') || '';
  const h = $(el).find('h1,h2,h3').first().text().trim().slice(0, 60);
  console.log(`${i + 1}. section#${id} | ${cls.slice(0, 80)} | heading: "${h}"`);
});

console.log('\n=== HEADER NAV LINKS ===');
$('header nav a').each((_, el) => {
  console.log($(el).text().trim(), '->', $(el).attr('href'));
});

console.log('\n=== FOOTER COLUMNS ===');
$('footer').find('h3, h4, p').slice(0, 20).each((_, el) => {
  console.log(el.tagName, $(el).text().trim().slice(0, 50));
});
