import fs from "fs";
import path from "path";
import { spawn } from "child_process";
import { chromium } from "playwright";
import { prerenderRoutes } from "../src/seo/site";

const HOST = "127.0.0.1";
const PORT = 4173 + Math.floor(Math.random() * 1000);
const BASE_URL = `http://${HOST}:${PORT}`;
const DIST_DIR = path.resolve("./dist");

function getOutputPath(routePath: string) {
  const route = routePath.replace(/^\//, "");
  return route ? path.join(DIST_DIR, route, "index.html") : path.join(DIST_DIR, "index.html");
}

async function waitForPreviewServer() {
  const timeoutAt = Date.now() + 30_000;

  while (Date.now() < timeoutAt) {
    try {
      const response = await fetch(`${BASE_URL}/ru`);
      if (response.ok) {
        return;
      }
    } catch {
      // Preview server is still starting.
    }

    await new Promise((resolve) => setTimeout(resolve, 500));
  }

  throw new Error("Timed out waiting for preview server.");
}

async function prerenderRoute(browser: Awaited<ReturnType<typeof chromium.launch>>, routePath: string) {
  const page = await browser.newPage();
  const response = await page.goto(`${BASE_URL}${routePath}`, {
    waitUntil: "networkidle",
  });

  if (!response || !response.ok()) {
    throw new Error(`Failed to prerender ${routePath}: ${response?.status() ?? "no response"}`);
  }

  await page.waitForTimeout(250);
  await page.evaluate(() => {
    const duplicateSelectors = [
      'head link[rel="canonical"]:not([data-rh])',
      'head link[rel="alternate"][hreflang]:not([data-rh])',
      'head meta[name="description"]:not([data-rh])',
      'head meta[name="keywords"]:not([data-rh])',
      'head meta[name="author"]:not([data-rh])',
      'head meta[name="robots"]:not([data-rh])',
      'head meta[name="twitter:title"]:not([data-rh])',
      'head meta[name="twitter:description"]:not([data-rh])',
      'head meta[name="twitter:image"]:not([data-rh])',
      'head meta[property="og:title"]:not([data-rh])',
      'head meta[property="og:description"]:not([data-rh])',
      'head meta[property="og:image"]:not([data-rh])',
      'head meta[property="og:url"]:not([data-rh])',
      'head meta[property="og:type"]:not([data-rh])',
      'head meta[property="og:site_name"]:not([data-rh])',
      'head meta[property="og:locale"]:not([data-rh])',
      'head meta[property="og:locale:alternate"]:not([data-rh])',
    ];

    duplicateSelectors.forEach((selector) => {
      document.querySelectorAll(selector).forEach((element) => element.remove());
    });
  });
  const html = await page.content();
  const outputPath = getOutputPath(routePath);

  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, `<!doctype html>\n${html}`);
  await page.close();
}

async function main() {
  if (!fs.existsSync(DIST_DIR)) {
    throw new Error("dist directory not found. Run vite build before prerender.");
  }

  const preview = spawn(
    "npx",
    ["vite", "preview", "--host", HOST, "--port", `${PORT}`, "--strictPort"],
    {
      cwd: process.cwd(),
      env: process.env,
      stdio: "inherit",
    },
  );

  try {
    await waitForPreviewServer();
    const browser = await chromium.launch({ headless: true });

    try {
      for (const route of prerenderRoutes) {
        await prerenderRoute(browser, route);
        console.log(`Prerendered ${route}`);
      }
    } finally {
      await browser.close();
    }
  } finally {
    preview.kill("SIGTERM");
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
