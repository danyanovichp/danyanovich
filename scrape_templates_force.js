import { chromium } from '@playwright/test';
import fs from 'fs';

(async () => {
  console.log("Launching browser...");
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  console.log("Navigating to danyanovich profile...");
  await page.goto('https://www.notion.com/@danyanovich', { waitUntil: 'networkidle' });
  
  console.log("Loaded. Removing consent banner overlay...");
  await page.evaluate(() => {
    const banners = [
      document.getElementById('transcend-consent-manager'),
      document.querySelector('[id*="consent-manager"]'),
      document.querySelector('[class*="consent-manager"]')
    ];
    banners.forEach(b => {
      if (b) {
        console.log("Removing banner element:", b);
        b.remove();
      }
    });
  });
  
  console.log("Starting scroll and click loop...");
  let count = 0;
  let hasMore = true;
  
  while (hasMore && count < 30) {
    count++;
    // Scroll to bottom
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(1000);
    
    // Find "Load more" button
    const loadMoreButton = page.locator('button:has-text("Load more")');
    const isVisible = await loadMoreButton.isVisible();
    
    if (isVisible) {
      console.log(`Clicking 'Load more' button (iteration ${count})...`);
      // Force click to bypass interception, or click via JS evaluate
      await loadMoreButton.click({ force: true });
      await page.waitForTimeout(2000); // Wait for loading
      
      // Remove banner again just in case it re-appeared
      await page.evaluate(() => {
        const banners = [
          document.getElementById('transcend-consent-manager'),
          document.querySelector('[id*="consent-manager"]'),
          document.querySelector('[class*="consent-manager"]')
        ];
        banners.forEach(b => {
          if (b) b.remove();
        });
      });
    } else {
      console.log(`No 'Load more' button visible at iteration ${count}. Checking template links count...`);
      // Scroll to bottom again to trigger lazy loading
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.waitForTimeout(1500);
      
      const isVisibleNow = await page.locator('button:has-text("Load more")').isVisible();
      if (!isVisibleNow) {
        hasMore = false;
      }
    }
    
    const templateLinksCount = await page.evaluate(() => {
      const links = Array.from(document.querySelectorAll('a[href*="/templates/"]'));
      return new Set(links.map(l => l.getAttribute('href'))).size;
    });
    console.log(`Current templates in DOM: ${templateLinksCount}`);
  }
  
  console.log("Scroll and click loop finished. Extracting all template details...");
  
  const data = await page.evaluate(() => {
    const templates = [];
    const seenSlugs = new Set();
    const links = Array.from(document.querySelectorAll('a[href*="/templates/"]'));
    
    links.forEach(link => {
      const href = link.getAttribute('href') || '';
      const match = href.match(/\/templates\/([^\/\?]+)/);
      if (match) {
        const slug = match[1];
        if (!seenSlugs.has(slug)) {
          seenSlugs.add(slug);
          
          let name = '';
          let price = 'Free';
          
          let card = link.closest('div');
          while (card && !card.innerText.includes(slug) && card.parentElement && card.parentElement !== document.body) {
            card = card.parentElement;
          }
          
          if (card) {
            const texts = card.innerText.split('\n').map(t => t.trim()).filter(Boolean);
            name = texts[0] || '';
            const priceIdx = texts.findIndex(t => t.startsWith('$') || t === 'Free' || t === 'Бесплатно');
            if (priceIdx !== -1) {
              price = texts[priceIdx];
            }
          }
          
          templates.push({ 
            slug, 
            name, 
            price, 
            href: `https://www.notion.com/templates/${slug}`
          });
        }
      }
    });
    
    return templates;
  });
  
  console.log(`Total templates scraped: ${data.length}`);
  
  // Save to file
  fs.writeFileSync('/Users/danyanovich/.gemini/antigravity/brain/7c7479c2-7835-4391-8bbe-225b48d0b7ca/scratch/scraped_all_templates.json', JSON.stringify(data, null, 2));
  
  await browser.close();
  console.log("Done!");
})().catch(e => {
  console.error("Scraper failed:", e);
});
