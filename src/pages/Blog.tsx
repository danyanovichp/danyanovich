import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Calendar, ArrowRight, BookOpen } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LocalLink as Link } from "@/components/LocalLink";
import PageTransition from "@/components/PageTransition";
import SEO, { getBlogSchema, getBreadcrumbSchema } from "@/components/SEO";
import AnimatedSection from "@/components/AnimatedSection";
import { blogPosts } from "@/data/blogPosts";
import { SITE_URL } from "@/seo/site";

const Blog = () => {
    const { i18n } = useTranslation();
    const isRu = i18n.language === "ru";
    const [activeCategory, setActiveCategory] = useState<string>("all");

    const categories = Array.from(
        new Set(blogPosts.map((post) => (isRu ? post.categoryRu : post.categoryEn))),
    );

    const filteredPosts = activeCategory === "all"
        ? blogPosts
        : blogPosts.filter((post) => (isRu ? post.categoryRu : post.categoryEn) === activeCategory);

    const blogListSchema = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        itemListElement: filteredPosts.map((post, index) => ({
            "@type": "ListItem",
            position: index + 1,
            url: `${SITE_URL}/${i18n.language}/blog/${post.slug}`,
            name: isRu ? post.titleRu : post.titleEn,
        })),
    };

    const breadcrumbSchema = getBreadcrumbSchema([
        { name: isRu ? "Главная" : "Home", url: `${SITE_URL}/${i18n.language}` },
        { name: isRu ? "Блог" : "Blog", url: `${SITE_URL}/${i18n.language}/blog` },
    ]);

    const archiveCountLabel = isRu
        ? `В архиве ${filteredPosts.length} ${filteredPosts.length === 1 ? "статья" : filteredPosts.length < 5 ? "статьи" : "статей"}`
        : `${filteredPosts.length} posts in this archive`;

    return (
        <PageTransition>
            <SEO
                titleRu="Блог | Дэн Янович"
                titleEn="Blog | Dan Yanovich"
                descriptionRu="Заметки о Notion, AI, автоматизации и Vibecoding."
                descriptionEn="Notes about Notion, AI, automation, and Vibecoding."
                url="/blog"
                structuredData={[getBlogSchema(isRu), blogListSchema, breadcrumbSchema]}
            />

            <section className="pt-32 pb-16 md:pt-40 md:pb-24 bg-background">
                <div className="container relative z-10">
                    <div className="max-w-4xl mx-auto text-center space-y-6">
                        <AnimatedSection>
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-none bg-pastel-yellow border-2 border-foreground shadow-[4px_4px_0px_0px_currentColor] mb-6">
                                <BookOpen className="h-8 w-8 text-foreground" />
                            </div>
                            <h1 className="text-4xl md:text-6xl font-bold tracking-tight font-display mb-6">
                                {isRu ? "Блог и " : "Blog & "}
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-pastel-pink to-pastel-blue">
                                    {isRu ? "Заметки" : "Notes"}
                                </span>
                            </h1>
                            <p className="text-xl text-muted-foreground mx-auto font-light leading-relaxed max-w-2xl">
                                {isRu
                                    ? "Делюсь мыслями об искусственном интеллекте, разработке без кода и личной продуктивности."
                                    : "Sharing thoughts on AI, no-code development, and personal productivity."}
                            </p>
                        </AnimatedSection>
                    </div>
                </div>
            </section>

            <section className="py-12 md:py-20 border-t-2 border-foreground bg-muted/30">
                <div className="container">
                    <div className="max-w-4xl mx-auto space-y-8">
                        <AnimatedSection>
                            <div className="flex flex-wrap items-center gap-3">
                                <button
                                    type="button"
                                    onClick={() => setActiveCategory("all")}
                                    className={`px-4 py-2 text-xs font-bold uppercase tracking-wider border-2 border-foreground rounded-none transition-all ${activeCategory === "all" ? "bg-foreground text-background shadow-[3px_3px_0px_0px_currentColor]" : "bg-card text-foreground hover:bg-pastel-yellow"}`}
                                >
                                    {isRu ? "Все статьи" : "All Posts"}
                                </button>
                                {categories.map((category) => (
                                    <button
                                        key={category}
                                        type="button"
                                        onClick={() => setActiveCategory(category)}
                                        className={`px-4 py-2 text-xs font-bold uppercase tracking-wider border-2 border-foreground rounded-none transition-all ${activeCategory === category ? "bg-pastel-blue text-foreground shadow-[3px_3px_0px_0px_currentColor]" : "bg-card text-foreground hover:bg-pastel-pink"}`}
                                    >
                                        {category}
                                    </button>
                                ))}
                            </div>
                        </AnimatedSection>

                        <AnimatedSection>
                            <p className="text-sm font-medium text-muted-foreground">
                                {archiveCountLabel}
                            </p>
                        </AnimatedSection>

                        {filteredPosts.map((post, i) => (
                            <AnimatedSection key={post.id} delay={i * 100}>
                                <Link to={`/blog/${post.slug}`} className="block">
                                    <Card className="rounded-none border-2 border-foreground shadow-[6px_6px_0px_0px_currentColor] hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[10px_10px_0px_0px_currentColor] transition-all cursor-pointer group bg-card overflow-hidden">
                                        <CardContent className="p-0 flex flex-col md:flex-row">
                                            <div className={`md:w-48 p-6 ${post.colorClass} border-b-2 md:border-b-0 md:border-r-2 border-foreground flex md:flex-col items-center md:items-start justify-between md:justify-center gap-4 shrink-0`}>
                                                <Badge variant="outline" className="bg-background/80 whitespace-nowrap px-3 py-1 font-bold text-xs">
                                                    {isRu ? post.categoryRu : post.categoryEn}
                                                </Badge>
                                                <div className="space-y-2">
                                                    <div className="flex items-center gap-2 text-sm font-medium bg-background/50 px-2 py-1 rounded-sm">
                                                        <Calendar className="w-4 h-4" />
                                                        {post.date}
                                                    </div>
                                                    <div className="text-xs font-bold uppercase tracking-wider text-foreground/70">
                                                        {isRu ? post.readingTimeRu : post.readingTimeEn}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="p-6 md:p-8 flex-1 flex flex-col justify-center">
                                                <h2 className="text-2xl font-bold font-display mb-3 group-hover:underline underline-offset-4">
                                                    {isRu ? post.titleRu : post.titleEn}
                                                </h2>
                                                <p className="text-muted-foreground leading-relaxed mb-6">
                                                    {isRu ? post.excerptRu : post.excerptEn}
                                                </p>
                                                <div className="mt-auto flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-foreground">
                                                    {isRu ? "Читать" : "Read More"}
                                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </Link>
                            </AnimatedSection>
                        ))}
                    </div>

                    <AnimatedSection delay={400}>
                        <div className="mt-16 text-center">
                            <Badge variant="outline" className="px-4 py-2 text-sm font-medium">
                                {isRu ? "Больше статей скоро появится..." : "More articles coming soon..."}
                            </Badge>
                        </div>
                    </AnimatedSection>
                </div>
            </section>
        </PageTransition>
    );
};

export default Blog;
