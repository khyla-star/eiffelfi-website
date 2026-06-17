import fs from 'fs';
import * as cheerio from 'cheerio';

const html = fs.readFileSync('src/generated/landing.html', 'utf8');
const $ = cheerio.load(html);

console.log('main > * tags:');
$('main')
  .children()
  .each((i, el) => {
    console.log(i, el.tagName, ($(el).attr('class') || '').slice(0, 60));
  });

console.log('\napp-container > * tags:');
$('.app-container')
  .children()
  .each((i, el) => {
    console.log(i, el.tagName, el.attribs?.id || '', ($(el).attr('class') || '').slice(0, 60));
  });
