import fs from 'fs';
import * as cheerio from 'cheerio';

const html = fs.readFileSync('src/1/About Lofty _ The team behind fractional real estate.html', 'utf8');
const $ = cheerio.load(html);
const app = $('.app-container').first();
app.find('header, footer').remove();
const $c = cheerio.load(`<div>${app.html()}</div>`);

$c('section').each((i, el) => {
  console.log(i, $c(el).attr('class'));
});
