import puppeteer from 'puppeteer';

const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
const page = await browser.newPage();
await page.setViewport({ width: 1400, height: 900, deviceScaleFactor: 3 });

const pages = [
  { hash: 'bevels', name: 'bevels' },
  { hash: 'glows', name: 'glows' },
  { hash: 'forms', name: 'forms' },
  { hash: 'animations', name: 'animations' },
];

for (const p of pages) {
  await page.goto(`http://localhost:5173/#/${p.hash}`, { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1500));
  await page.screenshot({ path: `/tmp/page-${p.name}-top.png`, fullPage: false });
  
  // Scroll down to see more
  await page.evaluate(() => window.scrollBy(0, 800));
  await new Promise(r => setTimeout(r, 500));
  await page.screenshot({ path: `/tmp/page-${p.name}-mid.png`, fullPage: false });
  
  await page.evaluate(() => window.scrollBy(0, 800));
  await new Promise(r => setTimeout(r, 500));
  await page.screenshot({ path: `/tmp/page-${p.name}-bot.png`, fullPage: false });
}

await browser.close();
console.log('Done');
