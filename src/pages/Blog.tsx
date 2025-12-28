import { useTranslation } from 'react-i18next';
import { BookOpen, Bell, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import AnimatedSection from '@/components/AnimatedSection';
import SEO from '@/components/SEO';
import { Link } from 'react-router-dom';

const Blog = () => {
  const { i18n } = useTranslation();
  const isRu = i18n.language === 'ru';

  const upcomingTopics = [
    {
      title: isRu ? 'Как создать Second Brain в Notion' : 'How to Create Second Brain in Notion',
      category: 'Notion',
    },
    {
      title: isRu ? '10 AI инструментов для продуктивности' : '10 AI Tools for Productivity',
      category: 'AI',
    },
    {
      title: isRu ? 'Автоматизация с Make.com: Полный гайд' : 'Make.com Automation: Complete Guide',
      category: 'Automation',
    },
    {
      title: isRu ? 'ChatGPT для бизнеса: лучшие практики' : 'ChatGPT for Business: Best Practices',
      category: 'AI',
    },
  ];

  return (
    <>
      <SEO 
        title={isRu ? 'Блог | Дэн Янович' : 'Blog | Dan Yanovich'}
        description={isRu 
          ? 'Статьи о Notion, AI, автоматизации и продуктивности. Практические гайды и советы.'
          : 'Articles about Notion, AI, automation and productivity. Practical guides and tips.'}
        url="https://danyanovich.com/blog"
      />
      
      <div className="min-h-screen py-20">
        <div className="container mx-auto px-4">
          {/* Hero */}
          <AnimatedSection className="text-center mb-16">
            <Badge variant="outline" className="mb-4">
              {isRu ? 'Скоро' : 'Coming Soon'}
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 flex items-center justify-center gap-3">
              <BookOpen className="h-10 w-10" />
              {isRu ? 'Блог' : 'Blog'}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {isRu 
                ? 'Здесь появятся статьи о Notion, AI, автоматизации и продуктивности. Практические гайды и реальные кейсы.'
                : 'Articles about Notion, AI, automation and productivity will appear here. Practical guides and real cases.'}
            </p>
          </AnimatedSection>

          {/* Coming Soon Card */}
          <AnimatedSection>
            <Card className="glass-card max-w-2xl mx-auto text-center p-8 mb-12">
              <CardContent className="space-y-6 pt-6">
                <div className="w-20 h-20 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                  <Bell className="h-10 w-10 text-primary animate-pulse" />
                </div>
                <h2 className="text-2xl font-bold">
                  {isRu ? 'Блог в разработке' : 'Blog Under Development'}
                </h2>
                <p className="text-muted-foreground">
                  {isRu 
                    ? 'Я работаю над созданием полезного контента. Первые статьи появятся совсем скоро!'
                    : 'I am working on creating useful content. First articles will appear very soon!'}
                </p>
                <a 
                  href="https://t.me/danyanovichp" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <Button className="group">
                    {isRu ? 'Подписаться в Telegram' : 'Subscribe on Telegram'}
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </a>
              </CardContent>
            </Card>
          </AnimatedSection>

          {/* Upcoming Topics */}
          <AnimatedSection>
            <h3 className="text-xl font-bold text-center mb-6">
              {isRu ? 'Планируемые темы' : 'Upcoming Topics'}
            </h3>
            <div className="grid md:grid-cols-2 gap-4 max-w-3xl mx-auto">
              {upcomingTopics.map((topic, index) => (
                <Card key={index} className="glass-card p-4 opacity-70 hover:opacity-100 transition-opacity">
                  <div className="flex items-center gap-3">
                    <Badge variant="outline" className="shrink-0">{topic.category}</Badge>
                    <span className="text-sm font-medium">{topic.title}</span>
                  </div>
                </Card>
              ))}
            </div>
          </AnimatedSection>

          {/* Back Link */}
          <AnimatedSection className="text-center mt-12">
            <Link to="/">
              <Button variant="outline">
                {isRu ? '← На главную' : '← Back Home'}
              </Button>
            </Link>
          </AnimatedSection>
        </div>
      </div>
    </>
  );
};

export default Blog;
