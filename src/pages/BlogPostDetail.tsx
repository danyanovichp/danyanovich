import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowLeft, ArrowRight, Calendar, Clock } from "lucide-react";
import SEO, { getBreadcrumbSchema } from "@/components/SEO";
import { LocalLink as Link } from "@/components/LocalLink";
import { Badge } from "@/components/ui/badge";
import { blogPosts } from "@/data/blogPosts";
import { DEFAULT_OG_IMAGE, SITE_URL } from "@/seo/site";

const BlogPostDetail = () => {
  const { slug } = useParams();
  const { i18n } = useTranslation();
  const isRu = i18n.language === "ru";

  const post = useMemo(
    () => blogPosts.find((entry) => entry.slug === slug),
    [slug],
  );

  if (!post) {
    return (
      <div className="container py-32">
        <SEO
          titleRu="Пост не найден | Дэн Янович"
          titleEn="Post Not Found | Dan Yanovich"
          descriptionRu="Запрошенная статья не найдена."
          descriptionEn="The requested article could not be found."
          noindex
        />
        <div className="max-w-2xl mx-auto space-y-6 text-center">
          <h1 className="text-4xl font-bold font-display">
            {isRu ? "Статья не найдена" : "Article not found"}
          </h1>
          <p className="text-muted-foreground">
            {isRu
              ? "Похоже, ссылка устарела или статья была перемещена."
              : "This link may be outdated or the article has been moved."}
          </p>
          <Link to="/blog" className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider">
            <ArrowLeft className="h-4 w-4" />
            {isRu ? "Вернуться в блог" : "Back to blog"}
          </Link>
        </div>
      </div>
    );
  }

  const title = isRu ? post.titleRu : post.titleEn;
  const description = isRu ? post.excerptRu : post.excerptEn;
  const articleUrl = `${SITE_URL}/${i18n.language}/blog/${post.slug}`;
  const localizedHomeUrl = `${SITE_URL}/${i18n.language}`;
  const localizedBlogUrl = `${SITE_URL}/${i18n.language}/blog`;
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    inLanguage: isRu ? "ru-RU" : "en-US",
    mainEntityOfPage: articleUrl,
    image: `${SITE_URL}${DEFAULT_OG_IMAGE}`,
    author: {
      "@type": "Person",
      name: "Dan Yanovich",
      url: SITE_URL,
    },
    publisher: {
      "@type": "Person",
      name: "Dan Yanovich",
      url: SITE_URL,
    },
  };

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: isRu ? "Главная" : "Home", url: localizedHomeUrl },
    { name: isRu ? "Блог" : "Blog", url: localizedBlogUrl },
    { name: title, url: articleUrl },
  ]);

  const content = isRu ? post.contentRu : post.contentEn;
  const relatedPosts = blogPosts
    .filter((entry) => entry.slug !== post.slug)
    .sort((left, right) => {
      const leftScore = (left.categoryEn === post.categoryEn ? 2 : 0) + (left.categoryRu === post.categoryRu ? 1 : 0);
      const rightScore = (right.categoryEn === post.categoryEn ? 2 : 0) + (right.categoryRu === post.categoryRu ? 1 : 0);
      return rightScore - leftScore;
    })
    .slice(0, 2);

  const exploreLinks = (() => {
    if (post.categoryEn === "Notion") {
      return [
        {
          to: "/notion",
          title: isRu ? "Посмотреть шаблоны Notion" : "Explore Notion templates",
          description: isRu
            ? "Готовые рабочие пространства, базы данных и операционные системы."
            : "Ready-made workspaces, databases, and operating systems.",
        },
        {
          to: "/cases",
          title: isRu ? "Разобрать кейсы внедрения" : "Review implementation cases",
          description: isRu
            ? "Реальные проекты по структуре знаний, CRM и операционным процессам."
            : "Real projects across knowledge systems, CRM, and operations.",
        },
      ];
    }

    if (post.categoryEn === "AI Automation") {
      return [
        {
          to: "/cases?type=automation",
          title: isRu ? "Посмотреть AI и automation кейсы" : "View AI and automation cases",
          description: isRu
            ? "Email-агенты, отчёты, Telegram-пайплайны и другие рабочие сценарии."
            : "Email agents, reports, Telegram pipelines, and other live workflows.",
        },
        {
          to: "/contact",
          title: isRu ? "Обсудить свой процесс" : "Discuss your workflow",
          description: isRu
            ? "Если у вас уже есть повторяющаяся рутина, можно быстро оценить, что стоит автоматизировать."
            : "If you already have repeatable work, we can quickly assess what is worth automating.",
        },
      ];
    }

    return [
      {
        to: "/cases?type=vibecoding",
        title: isRu ? "Посмотреть vibecoding кейсы" : "Browse vibecoding cases",
        description: isRu
          ? "Продукты и интерфейсы, собранные в AI-assisted режиме."
          : "Products and interfaces built in an AI-assisted workflow.",
      },
      {
        to: "/cases",
        title: isRu ? "Открыть все кейсы" : "Open all cases",
        description: isRu
          ? "Больше примеров по продуктам, автоматизации и системам."
          : "More examples across products, automations, and systems.",
      },
    ];
  })();

  return (
    <article className="bg-background">
      <SEO
        titleRu={`${post.titleRu} | Блог | Дэн Янович`}
        titleEn={`${post.titleEn} | Blog | Dan Yanovich`}
        descriptionRu={post.excerptRu}
        descriptionEn={post.excerptEn}
        url={`/blog/${post.slug}`}
        type="article"
        structuredData={[articleSchema, breadcrumbSchema]}
      />

      <section className="pt-28 pb-20 md:pt-36 md:pb-24">
        <div className="container">
          <div className="max-w-3xl mx-auto space-y-8">
            <Link to="/blog" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="h-4 w-4" />
              {isRu ? "Назад в блог" : "Back to blog"}
            </Link>

            <header className="space-y-5">
              <Badge variant="outline" className="px-3 py-1 font-bold text-xs">
                {isRu ? post.categoryRu : post.categoryEn}
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight font-display">
                {title}
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                {description}
              </p>
              <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-muted-foreground">
                <span className="inline-flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  {post.date}
                </span>
                <span className="inline-flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  {isRu ? post.readingTimeRu : post.readingTimeEn}
                </span>
              </div>
            </header>

            <div className="space-y-6 text-base md:text-lg leading-8">
              {content.map((paragraph, index) => (
                <p key={`${post.slug}-${index}`} className="text-foreground/90">
                  {paragraph}
                </p>
              ))}
            </div>

            <section className="space-y-4 border-t border-foreground/10 pt-8">
              <div className="space-y-1">
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-muted-foreground">
                  {isRu ? "Продолжить изучение" : "Continue Exploring"}
                </p>
                <h2 className="text-2xl md:text-3xl font-bold font-display">
                  {isRu ? "Куда перейти дальше" : "Where to go next"}
                </h2>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                {exploreLinks.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    className="group rounded-none border-2 border-foreground bg-card p-5 shadow-[4px_4px_0px_0px_currentColor] transition-all hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[6px_6px_0px_0px_currentColor]"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-2">
                        <h3 className="text-base font-semibold">{item.title}</h3>
                        <p className="text-sm leading-relaxed text-muted-foreground">
                          {item.description}
                        </p>
                      </div>
                      <ArrowRight className="mt-0.5 h-4 w-4 shrink-0" />
                    </div>
                  </Link>
                ))}
              </div>
            </section>

            <section className="space-y-4 border-t border-foreground/10 pt-8">
              <div className="flex items-end justify-between gap-4">
                <div className="space-y-1">
                  <p className="text-xs font-bold uppercase tracking-[0.24em] text-muted-foreground">
                    {isRu ? "Похожие материалы" : "Related posts"}
                  </p>
                  <h2 className="text-2xl md:text-3xl font-bold font-display">
                    {isRu ? "Похожие статьи" : "More articles"}
                  </h2>
                </div>
                <Link
                  to="/blog"
                  className="hidden text-sm font-medium text-muted-foreground transition-colors hover:text-foreground md:inline-flex md:items-center md:gap-2"
                >
                  {isRu ? "Весь блог" : "All posts"}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                {relatedPosts.map((entry) => (
                  <Link
                    key={entry.slug}
                    to={`/blog/${entry.slug}`}
                    className="group rounded-none border-2 border-foreground bg-card p-5 shadow-[4px_4px_0px_0px_currentColor] transition-all hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[6px_6px_0px_0px_currentColor]"
                  >
                    <div className="space-y-3">
                      <Badge variant="outline" className="w-fit px-3 py-1 font-bold text-xs">
                        {isRu ? entry.categoryRu : entry.categoryEn}
                      </Badge>
                      <div className="space-y-2">
                        <h3 className="text-xl font-semibold leading-tight">
                          {isRu ? entry.titleRu : entry.titleEn}
                        </h3>
                        <p className="text-sm leading-relaxed text-muted-foreground">
                          {isRu ? entry.excerptRu : entry.excerptEn}
                        </p>
                      </div>
                      <div className="inline-flex items-center gap-2 text-sm font-medium">
                        {isRu ? "Читать статью" : "Read article"}
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          </div>
        </div>
      </section>
    </article>
  );
};

export default BlogPostDetail;
