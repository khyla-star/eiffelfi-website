import fs from 'fs';

const html = fs.readFileSync('1.html', 'utf8');
const markers = [
  'animate-routeFadeIn',
  'app-container',
  'intercom-lightweight-app',
  '</footer>',
  'id="root"',
];

for (const m of markers) {
  console.log(m, html.indexOf(m));
}

const start = html.indexOf('<div class="animate-routeFadeIn">');
const intercom = html.indexOf('.intercom-lightweight-app', start);
console.log('content length', intercom - start);

const assetPattern = /\.\/Buy Fractional Real Estate _ Lofty AI Investing App_files\/([^"')]+)/g;
const assets = new Set();
let m;
while ((m = assetPattern.exec(html)) !== null) {
  assets.add(m[1]);
}
console.log('local assets referenced:', assets.size);
console.log([...assets].slice(0, 10));
