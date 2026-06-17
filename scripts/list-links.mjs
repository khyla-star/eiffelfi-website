import fs from 'fs';

const h = fs.readFileSync('src/generated/landing.html', 'utf8');
const hrefs = [...new Set([...h.matchAll(/href="([^"]+)"/g)].map((m) => m[1]))];
hrefs.sort().forEach((u) => console.log(u));
