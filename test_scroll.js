import { chromium } from '@playwright/test';

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto('https://www.notion.com/@danyanovich', { waitUntil: 'networkidle' });
  
  // Find all elements with scroll height > client height
  const scrollables = await page.evaluate(() => {
    const elms = [];
    const walk = (node) => {
      if (node.scrollHeight > node.clientHeight && (window.getComputedStyle(node).overflowY === 'auto' || window.getComputedStyle(node).overflowY === 'scroll')) {
        elms.push({
          tagName: node.tagName,
          id: node.id,
          className: node.className,
          scrollHeight: node.scrollHeight,
          clientHeight: node.clientHeight
        });
      }
      for (let i = 0; i < node.children.length; i++) {
        walk(node.children[i]);
      }
    };
    walk(document.body);
    return elms;
  });
  
  console.log("Scrollable elements:", JSON.stringify(scrollables, null, 2));
  
  // Check if there are any buttons for loading more
  const buttons = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('button')).map(b => ({
      text: b.innerText,
      className: b.className
    }));
  });
  console.log("Buttons on the page:", JSON.stringify(buttons, null, 2));
  
  await browser.close();
})();
