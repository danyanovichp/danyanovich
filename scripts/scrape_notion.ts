import { chromium } from '@playwright/test';
import fs from 'fs';

(async () => {
  console.log("Launching browser...");
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  console.log("Navigating to danyanovich profile...");
  await page.goto('https://www.notion.com/@danyanovich', { waitUntil: 'networkidle' });

  // Accept cookies / close consent if present
  try {
    const acceptBtn = page.locator('button:has-text("Accept all")');
    if (await acceptBtn.isVisible({ timeout: 3000 })) {
      await acceptBtn.click();
      await page.waitForTimeout(1000);
    }
  } catch {}

  console.log("Starting scroll + click loop...");
  let count = 0;
  let hasMore = true;
  let prevCount = 0;
  let stableCount = 0;

  while (hasMore && count < 60) {
    count++;
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(1200);

    const loadMore = page.locator('button:has-text("Load more")');
    const visible = await loadMore.isVisible().catch(() => false);
    if (visible) {
      console.log(`Clicking Load more (iteration ${count})`);
      await loadMore.click({ force: true });
      await page.waitForTimeout(2500);
    } else {
      // Check if template count stabilized
      const currentCount = await page.evaluate(() => {
        const links = Array.from(document.querySelectorAll('a[href*="/templates/"]'));
        return new Set(links.map(l => l.getAttribute('href'))).size;
      });
      console.log(`No Load more. Templates in DOM: ${currentCount}`);
      if (currentCount === prevCount) {
        stableCount++;
        if (stableCount >= 3) hasMore = false;
      } else {
        stableCount = 0;
        prevCount = currentCount;
      }
      // Scroll again to trigger lazy loading
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.waitForTimeout(1500);
    }
  }

  console.log("Extracting templates...");
  const data = await page.evaluate(() => {
    const templates: any[] = [];
    const seen = new Set<string>();
    const links = Array.from(document.querySelectorAll('a[href*="/templates/"]'));
    for (const link of links) {
      const href = link.getAttribute('href') || '';
      const m = href.match(/\/templates\/([^\/\?]+)/);
      if (!m) continue;
      const slug = m[1];
      if (seen.has(slug)) continue;
      if (['category','creators','work','school','life'].includes(slug)) continue;
      seen.add(slug);

      // Walk up to card container
      let el: HTMLElement | null = link as HTMLElement;
      while (el && el.tagName !== 'BODY') {
        const txt = el.innerText || '';
        if (txt.includes(slug) || txt.includes('$') || txt.includes('Free')) break;
        el = el.parentElement;
      }
      let name = '';
      let price = 'Free';
      if (el) {
        const texts = el.innerText.split('\n').map(t => t.trim()).filter(Boolean);
        // Usually first meaningful line is name
        for (const t of texts) {
          if (t && !t.startsWith('$') && t !== 'Free' && t !== 'Бесплатно') {
            name = t; break;
          }
        }
        for (const t of texts) {
          if (t.startsWith('$') || t === 'Free' || t === 'Бесплатно') {
            price = t; break;
          }
        }
      }
      templates.push({ slug, name, price, href: `https://www.notion.com/templates/${slug}` });
    }
    return templates;
  });

  console.log(`Total templates scraped: ${data.length}`);

  const out = '/Users/danyanovich/Projects/danyanovich/scripts/scraped_notion_templates.json';
  fs.writeFileSync(out, JSON.stringify(data, null, 2));
  console.log(`Saved to ${out}`);

  await browser.close();
})().catch(e => {
  console.error("Scraper failed:", e);
  process.exit(1);
});
