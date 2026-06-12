import { chromium } from '@playwright/test';
import fs from 'fs';

(async () => {
  console.log("Launching browser...");
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  console.log("Navigating to danyanovich profile...");
  await page.goto('https://www.notion.com/@danyanovich', { waitUntil: 'networkidle' });
  
  console.log("Loaded. Starting scroll loop to load all templates...");
  let previousHeight = 0;
  let currentHeight = await page.evaluate(() => document.body.scrollHeight);
  let noChangeCount = 0;
  let count = 0;
  
  while (noChangeCount < 10) {
    // Scroll to bottom
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(1500); // Wait for new templates to load
    
    // Check how many templates are currently in the DOM
    const templateCount = await page.evaluate(() => {
      // Find all links containing /templates/
      const links = Array.from(document.querySelectorAll('a[href*="/templates/"]'));
      return new Set(links.map(l => l.getAttribute('href'))).size;
    });
    
    console.log(`Scroll iteration ${++count}. Current template links in DOM: ${templateCount}`);
    
    previousHeight = currentHeight;
    currentHeight = await page.evaluate(() => document.body.scrollHeight);
    
    if (currentHeight === previousHeight) {
      noChangeCount++;
    } else {
      noChangeCount = 0;
    }
  }
  
  console.log("Scroll loop finished. Extracting template details from page state...");
  
  // Let's extract templates from the Next.js page state or DOM
  const data = await page.evaluate(() => {
    // Look at __NEXT_DATA__ if updated, or extract directly from DOM
    // Let's try to extract from the DOM first
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
          
          // Try to find name, category, and price in the parent cards
          let name = '';
          let price = 'Free';
          let category = '';
          
          // Let's traverse up to card container
          let card = link.closest('div'); // typical container
          while (card && !card.innerText.includes(slug) && card.parentElement && card.parentElement !== document.body) {
            card = card.parentElement;
          }
          
          // Find text content
          if (card) {
            const texts = card.innerText.split('\n').map(t => t.trim()).filter(Boolean);
            name = texts[0] || '';
            // Try to find price like $20 or Free
            const priceIdx = texts.findIndex(t => t.startsWith('$') || t === 'Free' || t === 'Бесплатно');
            if (priceIdx !== -1) {
              price = texts[priceIdx];
            }
          }
          
          templates.push({ slug, name, price, href: `https://www.notion.com${href.split('?')[0]}` });
        }
      }
    });
    
    return templates;
  });
  
  console.log(`Extracted ${data.length} templates.`);
  
  // Save to file
  fs.writeFileSync('/Users/danyanovich/.gemini/antigravity/brain/7c7479c2-7835-4391-8bbe-225b48d0b7ca/scratch/scraped_templates.json', JSON.stringify(data, null, 2));
  
  await browser.close();
  console.log("Browser closed. Done!");
})().catch(e => {
  console.error("Error running scraper:", e);
});
