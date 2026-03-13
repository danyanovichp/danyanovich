import fs from "fs";
import { portfolioProjects } from "../src/data/portfolioProjects";
import { blogPosts } from "../src/data/blogPosts";
import { SITE_URL } from "../src/seo/site";

async function generateRSS() {
    const items: string[] = [];

    // Add blog posts
    blogPosts.forEach((post) => {
        const url = `${SITE_URL}/ru/blog/${post.slug}`;
        items.push(`
    <item>
      <title><![CDATA[${post.titleRu}]]></title>
      <link>${url}</link>
      <guid isPermaLink="false">blog-${post.id}</guid>
      <description><![CDATA[${post.excerptRu}]]></description>
      <pubDate>${new Date(post.publishedAt).toUTCString()}</pubDate>
    </item>`);
    });

    // Add portfolio projects
    portfolioProjects.forEach((project) => {
        const url = `${SITE_URL}/ru/cases/${project.id}`;
        let description = project.summary_ru;
        if (project.results_ru && project.results_ru.length > 0) {
            description += `\n\nРезультаты:\n- ` + project.results_ru.join('\n- ');
        }

        items.push(`
    <item>
      <title><![CDATA[${project.title_ru}]]></title>
      <link>${url}</link>
      <guid isPermaLink="false">case-${project.id}</guid>
      <description><![CDATA[${description}]]></description>
      <pubDate>${new Date().toUTCString()}</pubDate>
    </item>`);
    });

    const rss = `<?xml version="1.0" encoding="utf-8"?>
<rss version="2.0">
  <channel>
    <title>Dan Yanovich Blog &amp; Cases</title>
    <link>${SITE_URL}</link>
    <description>Notes about Notion, AI, automation, and Vibecoding. Showcase of cases and products.</description>
    <language>ru</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${items.join('')}
  </channel>
</rss>`;

    if (!fs.existsSync('./public')) {
        fs.mkdirSync('./public');
    }
    fs.writeFileSync('./public/rss.xml', rss);
    console.log('RSS feed generated at public/rss.xml');
}

generateRSS();
