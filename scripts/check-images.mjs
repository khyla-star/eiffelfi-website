import fs from 'fs';

const h = fs.readFileSync('src/generated/landing.html', 'utf8');
const imgs = [...h.matchAll(/src="([^"]+)"/g)].map((m) => m[1]);
const unique = [...new Set(imgs)];
console.log('total imgs', unique.length);
unique.filter((u) => !u.startsWith('/assets/')).forEach((u) => console.log(u));
