import { chromium } from '@playwright/test';

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  page.on('request', request => {
    console.log(`REQ: [${request.method()}] ${request.url()}`);
  });
  
  page.on('response', response => {
    console.log(`RES: [${response.status()}] ${response.url()}`);
  });

  await page.goto('https://www.notion.com/@danyanovich', { waitUntil: 'networkidle' });
  
  await page.evaluate(() => {
    const b = document.getElementById('transcend-consent-manager') || document.querySelector('[class*="consent-manager"]');
    if (b) b.remove();
  });
  
  const loadMoreButton = page.locator('button:has-text("Load more")');
  if (await loadMoreButton.isVisible()) {
    console.log("CLICKING LOAD MORE...");
    await loadMoreButton.click({ force: true });
    await page.waitForTimeout(3000);
  }
  
  await browser.close();
})();
