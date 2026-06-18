import { portfolioProjects } from "../data/portfolioProjects";
import { blogPosts } from "../data/blogPosts";
import { allTemplates } from "../data/notionTemplates";

export const SITE_URL = "https://danyanovich.site";
export const SITE_NAME = "Dan Yanovich";
export const DEFAULT_LANGUAGE = "ru" as const;
export const SUPPORTED_LANGUAGES = ["ru", "en"] as const;
export const DEFAULT_OG_IMAGE = "/images/og-default.jpeg";

export type SiteLanguage = (typeof SUPPORTED_LANGUAGES)[number];

type ChangeFrequency = "daily" | "weekly" | "monthly" | "yearly";

interface StaticSeoRoute {
  path: string;
  changefreq: ChangeFrequency;
  priority: number;
}

export interface SeoRouteEntry {
  path: string;
  changefreq: ChangeFrequency;
  priority: number;
}

export interface RedirectRule {
  from: string;
  to: string;
}

const staticSeoRoutes: StaticSeoRoute[] = [
  { path: "", changefreq: "weekly", priority: 1.0 },
  { path: "/notion", changefreq: "weekly", priority: 0.9 },
  { path: "/consulting", changefreq: "monthly", priority: 0.9 },
  { path: "/cases", changefreq: "weekly", priority: 0.8 },
  { path: "/contact", changefreq: "monthly", priority: 0.8 },
  { path: "/ai-training", changefreq: "weekly", priority: 0.8 },
  { path: "/blog", changefreq: "weekly", priority: 0.7 },
  { path: "/courses", changefreq: "monthly", priority: 0.7 },
  { path: "/ai-prompts", changefreq: "monthly", priority: 0.7 },
  { path: "/packages", changefreq: "monthly", priority: 0.7 },
  { path: "/reviews", changefreq: "monthly", priority: 0.6 },
  { path: "/faq", changefreq: "monthly", priority: 0.6 },
  { path: "/support", changefreq: "monthly", priority: 0.5 },
  { path: "/games/pixel-cafe-tycoon", changefreq: "monthly", priority: 0.4 },
  { path: "/businesses", changefreq: "weekly", priority: 0.7 },
  { path: "/workspaces", changefreq: "weekly", priority: 0.8 },
  { path: "/privacy", changefreq: "yearly", priority: 0.2 },
  { path: "/terms", changefreq: "yearly", priority: 0.2 },
  { path: "/cookies", changefreq: "yearly", priority: 0.2 },
];

export function getLocalizedPath(language: SiteLanguage, path = "") {
  return path ? `/${language}${path}` : `/${language}`;
}

export const localizedSeoRoutes: SeoRouteEntry[] = staticSeoRoutes.flatMap((route) =>
  SUPPORTED_LANGUAGES.map((language) => ({
    path: getLocalizedPath(language, route.path),
    changefreq: route.changefreq,
    priority: route.priority,
  })),
);

export const caseSeoRoutes: SeoRouteEntry[] = portfolioProjects.flatMap((project) =>
  SUPPORTED_LANGUAGES.map((language) => ({
    path: getLocalizedPath(language, `/cases/${project.id}`),
    changefreq: "monthly" as const,
    priority: 0.65,
  })),
);

export const blogSeoRoutes: SeoRouteEntry[] = blogPosts.flatMap((post) =>
  SUPPORTED_LANGUAGES.map((language) => ({
    path: getLocalizedPath(language, `/blog/${post.slug}`),
    changefreq: "monthly" as const,
    priority: 0.75,
  })),
);

export const notionTemplateSeoRoutes: SeoRouteEntry[] = allTemplates.flatMap((template) =>
  SUPPORTED_LANGUAGES.map((language) => ({
    path: getLocalizedPath(language, `/notion/${template.slug}`),
    changefreq: "monthly" as const,
    priority: 0.8,
  })),
);

export const sitemapRoutes: SeoRouteEntry[] = [
  ...localizedSeoRoutes,
  ...blogSeoRoutes,
  ...caseSeoRoutes,
  ...notionTemplateSeoRoutes,
];

export const prerenderRoutes = Array.from(
  new Set(sitemapRoutes.map((route) => route.path)),
);

export const legacyRedirects: RedirectRule[] = [
  { from: "/", to: "/ru" },
  { from: "/notiontemplates", to: "/ru/notion" },
  { from: "/portfolio", to: "/ru/cases" },
  ...staticSeoRoutes
    .filter((route) => route.path)
    .map((route) => ({
      from: route.path,
      to: getLocalizedPath(DEFAULT_LANGUAGE, route.path),
    })),
  ...portfolioProjects.map((project) => ({
    from: `/cases/${project.id}`,
    to: getLocalizedPath(DEFAULT_LANGUAGE, `/cases/${project.id}`),
  })),
];
