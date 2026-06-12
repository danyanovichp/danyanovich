import { chromium } from '@playwright/test';
import fs from 'fs';

(async () => {
  console.log("Launching browser...");
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  const capturedResponses = [];
  
  // Listen for responses
  page.on('response', async (response) => {
    const url = response.url();
    if (url.includes('notion.com') && (response.status() === 200)) {
      try {
        const text = await response.text();
        if (text.includes('slug') || text.includes('template') || text.includes('pinned')) {
          const json = JSON.parse(text);
          console.log(`Captured matching response from: ${url}`);
          capturedResponses.push({ url, data: json });
        }
      } catch (e) {
        // Not a JSON response or failed to read
      }
    }
  });

  console.log("Navigating to danyanovich profile...");
  await page.goto('https://www.notion.com/@danyanovich', { waitUntil: 'networkidle' });
  
  console.log("Removing banners...");
  await page.evaluate(() => {
    const b = document.getElementById('transcend-consent-manager') || document.querySelector('[class*="consent-manager"]');
    if (b) b.remove();
  });
  
  let count = 0;
  let hasMore = true;
  
  while (hasMore && count < 15) {
    count++;
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(1000);
    
    const loadMoreButton = page.locator('button:has-text("Load more")');
    if (await loadMoreButton.isVisible()) {
      console.log(`Clicking Load More (iteration ${count})...`);
      await loadMoreButton.click({ force: true });
      await page.waitForTimeout(2000);
    } else {
      hasMore = false;
    }
  }
  
  console.log(`Captured ${capturedResponses.length} potential response payloads.`);
  
  // Save captured responses to file
  fs.writeFileSync('/Users/danyanovich/.gemini/antigravity/brain/7c7479c2-7835-4391-8bbe-225b48d0b7ca/scratch/captured_responses.json', JSON.stringify(capturedResponses, null, 2));
  
  // Let's analyze the captured responses to find templates list
  const templatesMap = new Map();
  
  // Let's helper-parse a template object
  const addTemplate = (t) => {
    if (t && t.slug && (t.name || t.title) && t.id) {
      // Avoid categories
      if (t.slug === 'work' || t.slug === 'personal' || t.slug === 'operations') return;
      templatesMap.set(t.slug, {
        id: t.id,
        name: t.name || t.title,
        slug: t.slug,
        price: t.priceAmount !== undefined ? t.priceAmount : (t.price || 0),
        description: t.description || t.summary || ""
      });
    }
  };
  
  // Search recursively in all captured JSON payloads
  function search(obj) {
    if (!obj || typeof obj !== 'object') return;
    if (Array.isArray(obj)) {
      obj.forEach(search);
      return;
    }
    if (obj.slug && (obj.name || obj.title) && obj.id) {
      addTemplate(obj);
    }
    for (const key in obj) {
      search(obj[key]);
    }
  }
  
  capturedResponses.forEach(r => search(r.data));
  
  const finalTemplates = Array.from(templatesMap.values());
  console.log(`Total templates extracted from API responses: ${finalTemplates.length}`);
  
  fs.writeFileSync('/Users/danyanovich/.gemini/antigravity/brain/7c7479c2-7835-4391-8bbe-225b48d0b7ca/scratch/api_extracted_templates.json', JSON.stringify(finalTemplates, null, 2));
  
  await browser.close();
  console.log("Done!");
})().catch(e => {
  console.error("Network capture failed:", e);
});
