import fs from 'fs';
import * as cheerio from 'cheerio';

const html = fs.readFileSync('src/1/About Lofty _ The team behind fractional real estate.html', 'utf8');
const $ = cheerio.load(html);
const app = $('.app-container').first();
app.find('header, footer').remove();
const $c = cheerio.load(`<div>${app.html()}</div>`);

$c('section')
  .eq(2)
  .find('img')
  .each((_, el) => {
    console.log('alt:', $c(el).attr('alt'));
    console.log('class:', $c(el).attr('class') ?? '(none)');
    console.log('style:', $c(el).attr('style') ?? '(none)');
    console.log('---');
  });

const grid = $c('section').eq(2).find('.grid').first().attr('class');
console.log('grid:', grid);
