import * as fs from 'fs';

// Read data sources
const parsedPath = '/Users/danyanovich/.gemini/antigravity/brain/7c7479c2-7835-4391-8bbe-225b48d0b7ca/scratch/parsed_templates.json';
const scrapedPath = '/Users/danyanovich/Projects/danyanovich/scripts/scraped_notion_templates.json';
const outPath = '/Users/danyanovich/Projects/danyanovich/src/data/notionTemplates.ts';

const parsed: any[] = JSON.parse(fs.readFileSync(parsedPath, 'utf-8'));
const scraped: any[] = JSON.parse(fs.readFileSync(scrapedPath, 'utf-8'));

// Build lookup by slug
const parsedBySlug: Record<string, any> = {};
for (const t of parsed) parsedBySlug[t.slug] = t;

const scrapedBySlug: Record<string, any> = {};
for (const t of scraped) scrapedBySlug[t.slug] = t;

// Read current file slugs
const currentContent = fs.readFileSync(outPath, 'utf-8');
const existingSlugs = new Set<string>();
const slugMatches = currentContent.matchAll(/slug:\s*"([^"]+)"/g);
for (const m of slugMatches) existingSlugs.add(m[1]);

console.log(`Existing: ${existingSlugs.size}`);
console.log(`Parsed rich: ${parsed.length}`);
console.log(`Scraped total: ${scraped.length}`);

// Category mapping
const categoryGroupMap: Record<string, string> = {
  "Operations": "operations",
  "Startup Operations": "operations",
  "Personal Productivity": "personal-productivity",
  "Work": "operations",
  "Life": "personal-productivity",
  "Real Estate": "real-estate",
  "Freelance": "freelance",
  "Marketing": "marketing",
  "Finance": "finance",
  "Personal Finance": "finance",
  "Investing": "finance",
  "Health & Fitness": "health",
  "Teaching": "teaching",
  "Product": "product",
  "Product Management": "product",
  "Customer Journey": "operations",
  "E-commerce": "operations",
  "Documentation": "operations",
  "Second Brain": "personal-productivity",
  "Idea Management": "personal-productivity",
  "Planning & Goals": "personal-productivity",
  "Student Life": "teaching",
  "Notes & Knowledge": "personal-productivity",
  "Study Planner": "teaching",
  "Standard Operating Procedure (SOP)": "operations",
  "Engineering": "operations",
  "Project Plans": "operations",
  "Docs": "operations",
  "Personal Dashboards": "personal-productivity",
  "Knowledge Base": "operations",
  "Product Knowledge Base": "operations",
  "Wiki": "operations",
  "Startup": "operations",
  "Starting a Startup": "operations",
  "SEO": "marketing",
  "Company Home Page": "operations",
  "Company Goals": "operations",
  "Company Planning": "operations",
  "HR": "operations",
  "Enterprise": "operations",
  "Company Intranet": "operations",
  "Hobbies": "personal-productivity",
  "Books": "personal-productivity",
  "Writing": "personal-productivity",
  "Entertainment": "personal-productivity",
  "Customer Discovery Meeting": "product",
  "Sales": "marketing",
  "Meetings": "operations",
  "Sprint Planning Meeting": "product",
  "Agile": "product",
  "Scrum Board": "product",
  "Issue Tracking": "product",
  "Project Schedule": "operations",
  "Roadmaps & Calendars": "operations",
  "Project Management": "operations",
  "Sprint Planning": "product",
  "Agile": "product",
  "Health & Fitness": "health",
  "Health": "health",
  "Diet & Nutrition": "health",
  "Fitness": "health",
};

function pickCategoryGroup(categories: string[]): string {
  for (const cat of categories) {
    const key = categoryGroupMap[cat];
    if (key) return key;
  }
  return "operations";
}

function pickIcon(name: string): string {
  const lower = name.toLowerCase();
  if (lower.includes("brain") || lower.includes("knowledge")) return "Brain";
  if (lower.includes("real estate") || lower.includes("property") || lower.includes("site inspection")) return "Building2";
  if (lower.includes("freelance") || lower.includes("contractor")) return "Briefcase";
  if (lower.includes("shop") || lower.includes("e-commerce") || lower.includes("commerce")) return "ShoppingCart";
  if (lower.includes("document") || lower.includes("file")) return "FileStack";
  if (lower.includes("idea") || lower.includes("lightbulb")) return "Lightbulb";
  if (lower.includes("goal") || lower.includes("plan") || lower.includes("target")) return "Target";
  if (lower.includes("heart") || lower.includes("success") || lower.includes("customer")) return "Heart";
  if (lower.includes("clock") || lower.includes("time") || lower.includes("hour")) return "Clock";
  if (lower.includes("bot") || lower.includes("ai ") || lower.includes("ai-")) return "Bot";
  if (lower.includes("flask") || lower.includes("test") || lower.includes("hypothesis")) return "FlaskConical";
  if (lower.includes("trend") || lower.includes("growth") || lower.includes("market fit")) return "TrendingUp";
  if (lower.includes("truck") || lower.includes("supplier") || lower.includes("delivery")) return "Truck";
  if (lower.includes("calendar") || lower.includes("schedule") || lower.includes("leave")) return "CalendarOff";
  if (lower.includes("receipt") || lower.includes("invoice") || lower.includes("receivable") || lower.includes("borrow")) return "Receipt";
  if (lower.includes("sales") || lower.includes("script") || lower.includes("objection") || lower.includes("referral")) return "MessageSquareText";
  if (lower.includes("todo") || lower.includes("backlog") || lower.includes("task")) return "ListTodo";
  if (lower.includes("meal") || lower.includes("food") || lower.includes("recipe")) return "UtensilsCrossed";
  if (lower.includes("editorial") || lower.includes("content") || lower.includes("blog")) return "CalendarDays";
  if (lower.includes("timer") || lower.includes("track")) return "Timer";
  if (lower.includes("graduation") || lower.includes("course") || lower.includes("lesson") || lower.includes("lecture") || lower.includes("class")) return "GraduationCap";
  if (lower.includes("shield") || lower.includes("security") || lower.includes("protect")) return "Shield";
  if (lower.includes("sparkle") || lower.includes("beauty") || lower.includes("salon")) return "Sparkles";
  if (lower.includes("user") || lower.includes("team") || lower.includes("people") || lower.includes("segment")) return "Users";
  if (lower.includes("rotate") || lower.includes("return") || lower.includes("refund")) return "RotateCcw";
  if (lower.includes("check circle") || lower.includes("quality") || lower.includes("control")) return "CheckCircle";
  if (lower.includes("pie chart") || lower.includes("segmentation") || lower.includes("analytics")) return "PieChart";
  if (lower.includes("headphone") || lower.includes("support") || lower.includes("ticket")) return "Headphones";
  if (lower.includes("check square") || lower.includes("simple task")) return "CheckSquare";
  if (lower.includes("book") || lower.includes("write") || lower.includes("note")) return "BookOpen";
  if (lower.includes("seo")) return "Search";
  if (lower.includes("company")) return "Building2";
  if (lower.includes("change")) return "RotateCcw";
  if (lower.includes("sprint") || lower.includes("scrum") || lower.includes("agile")) return "ListTodo";
  if (lower.includes("investment") || lower.includes("asset")) return "TrendingUp";
  if (lower.includes("manager") || lower.includes("weekly")) return "CalendarDays";
  if (lower.includes("invoice") || lower.includes("payment")) return "Receipt";
  if (lower.includes("subscription") || lower.includes("subscriber")) return "Users";
  if (lower.includes("contractor")) return "Briefcase";
  if (lower.includes("development") || lower.includes("interview")) return "Users";
  if (lower.includes("equipment") || lower.includes("inventory")) return "Truck";
  if (lower.includes("wellness") || lower.includes("health") || lower.includes("fitness")) return "Heart";
  if (lower.includes("change log") || lower.includes("changelog")) return "RotateCcw";
  if (lower.includes("budget") || lower.includes("finance")) return "PieChart";
  if (lower.includes("travel") || lower.includes("trip")) return "Truck";
  if (lower.includes("meeting") || lower.includes("event")) return "CalendarDays";
  if (lower.includes("habit") || lower.includes("routine")) return "CheckCircle";
  if (lower.includes("journal") || lower.includes("diary")) return "BookOpen";
  if (lower.includes("wiki") || lower.includes("base")) return "BookOpen";
  if (lower.includes("dashboard") || lower.includes("overview")) return "PieChart";
  if (lower.includes("crm") || lower.includes("contact") || lower.includes("lead")) return "Users";
  if (lower.includes("email") || lower.includes("newsletter") || lower.includes("campaign")) return "MessageSquareText";
  if (lower.includes("social") || lower.includes("media") || lower.includes("instagram")) return "CalendarDays";
  if (lower.includes("project") || lower.includes("initiative")) return "ListTodo";
  if (lower.includes("wiki") || lower.includes("sop") || lower.includes("procedure")) return "FileStack";
  if (lower.includes("hr") || lower.includes("employee") || lower.includes("onboard")) return "Users";
  return "Sparkles";
}

function pickColor(name: string): { colorClass: string; bgClass: string } {
  const colors = [
    "pastel-purple",
    "pastel-blue",
    "accent-coral",
    "accent-lime",
    "pastel-pink",
    "pastel-lavender",
  ];
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = (hash * 31 + name.charCodeAt(i)) % colors.length;
  const c = colors[Math.abs(hash) % colors.length];
  return { colorClass: `text-${c}`, bgClass: `bg-${c}/20` };
}

function escapeString(str: string): string {
  return str.replace(/\\/g, "\\\\").replace(/'/g, "\\'").replace(/"/g, '\\"').replace(/\n/g, "\\n").replace(/\r/g, "");
}

function generateRichEntry(t: any): string {
  const group = pickCategoryGroup(t.categories || []);
  const icon = pickIcon(t.name);
  const { colorClass, bgClass } = pickColor(t.name);
  const catName = t.categories && t.categories.length > 0 ? t.categories[0] : "Operations";
  const id = t.id || `free-${t.slug}`;
  const price = typeof t.price === "number" ? t.price : 0;
  const shortDesc = (t.shortDescription || "").slice(0, 300);
  const slug = t.slug;
  const downloadUrl = `https://www.notion.com/templates/${slug}`;

  return `  {
    id: "${id}",
    name: "${escapeString(t.name)}",
    slug: "${slug}",
    price: ${price},
    description: {
      en: "${escapeString(shortDesc)}",
      ru: "${escapeString(shortDesc)}",
    },
    category: { en: "${escapeString(catName)}", ru: "${escapeString(catName)}" },
    categoryGroup: "${group}",
    icon: "${icon}",
    colorClass: "${colorClass}",
    bgClass: "${bgClass}",
    downloadUrl: "${downloadUrl}",
  },`;
}

function generateMinimalEntry(t: any): string {
  const name = t.name || t.slug.replace(/-/g, " ");
  const slug = t.slug;
  const priceStr: string = t.price || "Free";
  const price = priceStr.startsWith("$") ? parseFloat(priceStr.replace("$", "")) : 0;
  const icon = pickIcon(name);
  const { colorClass, bgClass } = pickColor(name);
  const downloadUrl = `https://www.notion.com/templates/${slug}`;

  return `  {
    id: "free-${slug}",
    name: "${escapeString(name)}",
    slug: "${slug}",
    price: ${price},
    description: {
      en: "Notion template by danyanovich. Open the template page to learn more and duplicate it into your workspace.",
      ru: "Шаблон Notion от danyanovich. Откройте страницу шаблона, чтобы узнать больше и скопировать в свой воркспейс.",
    },
    category: { en: "Operations", ru: "Operations" },
    categoryGroup: "operations",
    icon: "${icon}",
    colorClass: "${colorClass}",
    bgClass: "${bgClass}",
    downloadUrl: "${downloadUrl}",
  },`;
}

const newEntries: string[] = [];
for (const t of scraped) {
  if (existingSlugs.has(t.slug)) continue;
  const rich = parsedBySlug[t.slug];
  if (rich) {
    newEntries.push(generateRichEntry(rich));
  } else {
    newEntries.push(generateMinimalEntry(t));
  }
}

console.log(`New templates to add: ${newEntries.length}`);

if (newEntries.length === 0) {
  console.log("Nothing new to add.");
  process.exit(0);
}

const marker = "export const allTemplates: NotionTemplate[] = [...paidTemplatesData, ...freeTemplatesData];";
const idx = currentContent.indexOf(marker);
if (idx === -1) {
  console.error("Marker not found");
  process.exit(1);
}

const before = currentContent.slice(0, idx);
const after = currentContent.slice(idx);

// Find last `];` before marker
const lastArrayEnd = before.lastIndexOf("];");
if (lastArrayEnd === -1) {
  console.error("Array end not found");
  process.exit(1);
}

const insertBlock = newEntries.join("\n") + "\n";
const newContent = before.slice(0, lastArrayEnd) + insertBlock + before.slice(lastArrayEnd) + after;

fs.writeFileSync(outPath, newContent, 'utf-8');
console.log(`Updated ${outPath}. Total added: ${newEntries.length}`);
