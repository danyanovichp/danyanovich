import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
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
          </div>
        </div>
      </section>
    </article>
  );
};

export default BlogPostDetail;
