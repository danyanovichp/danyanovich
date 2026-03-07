import { useTranslation } from "react-i18next";
import { Calendar, ArrowRight, BookOpen } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import PageTransition from "@/components/PageTransition";
import SEO from "@/components/SEO";
import AnimatedSection from "@/components/AnimatedSection";
import { blogPosts } from "@/data/blogPosts";

const Blog = () => {
    const { t, i18n } = useTranslation();
    const isRu = i18n.language === 'ru';

    return (
        <PageTransition>
            <SEO
                titleRu="Блог | Дэн Янович"
                titleEn="Blog | Dan Yanovich"
                descriptionRu="Заметки о Notion, AI, автоматизации и Vibecoding."
                descriptionEn="Notes about Notion, AI, automation, and Vibecoding."
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
                        {blogPosts.map((post, i) => (
                            <AnimatedSection key={post.id} delay={i * 100}>
                                <Card className={`rounded-none border-2 border-foreground shadow-[6px_6px_0px_0px_currentColor] hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[10px_10px_0px_0px_currentColor] transition-all cursor-pointer group bg-card overflow-hidden`}>
                                    <CardContent className="p-0 flex flex-col md:flex-row">
                                        <div className={`md:w-48 p-6 ${post.colorClass} border-b-2 md:border-b-0 md:border-r-2 border-foreground flex md:flex-col items-center md:items-start justify-between md:justify-center gap-4 shrink-0`}>
                                            <Badge variant="outline" className="bg-background/80 whitespace-nowrap px-3 py-1 font-bold text-xs">
                                                {isRu ? post.categoryRu : post.categoryEn}
                                            </Badge>
                                            <div className="flex items-center gap-2 text-sm font-medium bg-background/50 px-2 py-1 rounded-sm">
                                                <Calendar className="w-4 h-4" />
                                                {post.date}
                                            </div>
                                        </div>

                                        <div className="p-6 md:p-8 flex-1 flex flex-col justify-center">
                                            <h3 className="text-2xl font-bold font-display mb-3 group-hover:underline underline-offset-4">
                                                {isRu ? post.titleRu : post.titleEn}
                                            </h3>
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
