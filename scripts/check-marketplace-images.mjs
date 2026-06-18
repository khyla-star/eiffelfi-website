import fs from 'fs';
import path from 'path';

const data = fs.readFileSync('src/data/marketplace.generated.ts', 'utf8');
const imgs = [...data.matchAll(/"(\/assets\/marketplace\/[^"]+)"/g)].map((m) => m[1]);
const unique = [...new Set(imgs)];
const missing = unique.filter((p) => !fs.existsSync(path.join('public', p)));
console.log('total refs', unique.length, 'missing', missing.length);
missing.forEach((p) => console.log('MISSING', p));

const props = [...data.matchAll(/"images": \[([\s\S]*?)\]/g)];
let short = 0;
props.forEach((m, i) => {
  const count = (m[1].match(/\/assets\/marketplace\//g) ?? []).length;
  if (count < 3) {
    short++;
    console.log(`Property ${i + 1} has ${count} images`);
  }
});
console.log('properties with <3 images:', short);
