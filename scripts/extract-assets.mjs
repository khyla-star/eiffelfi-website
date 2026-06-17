import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const srcAssets = path.join(root, '1');
const destAssets = path.join(root, 'public', 'assets');

fs.mkdirSync(destAssets, { recursive: true });

const exts = new Set(['.webp', '.png', '.svg', '.jpg', '.jpeg', '.gif', '.ico']);
for (const file of fs.readdirSync(srcAssets)) {
  const ext = path.extname(file).toLowerCase();
  if (exts.has(ext)) {
    fs.copyFileSync(path.join(srcAssets, file), path.join(destAssets, file));
  }
}

fs.mkdirSync(path.join(root, 'src', 'styles'), { recursive: true });
const cssDest = path.join(root, 'src', 'styles', 'lofty.css');
fs.copyFileSync(path.join(srcAssets, 'main.d601f9c5.css'), cssDest);

let css = fs.readFileSync(cssDest, 'utf8');
css = css.replace(/url\(\/static\//g, 'url(https://www.lofty.ai/static/');
fs.writeFileSync(cssDest, css, 'utf8');

console.log('Copied assets to public/assets and CSS to src/styles/lofty.css');
