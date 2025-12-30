import { useTranslation } from 'react-i18next';
import { ExternalLink, CheckCircle2, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import AnimatedSection from '@/components/AnimatedSection';
import SEO from '@/components/SEO';
import { Link } from 'react-router-dom';

const Cases = () => {
  const { i18n } = useTranslation();
  const isRu = i18n.language === 'ru';

  const cases = [
    {
      title: isRu ? 'Вторая Голова — Second Brain Система' : 'Second Brain System',
      category: 'Notion Template',
      description: isRu 
        ? 'Полноценная система для организации жизни, проектов и знаний. Включает управление задачами, заметками, привычками и целями.'
        : 'Complete life organization system for projects and knowledge. Includes task management, notes, habits and goals.',
      challenge: isRu 
        ? 'Клиенту нужна была единая система для хранения всех заметок, планирования задач и отслеживания привычек.'
        : 'Client needed a unified system for storing notes, planning tasks and tracking habits.',
      solution: isRu 
        ? 'Создал комплексную базу данных с связанными модулями, автоматизациями и красивым интерфейсом.'
        : 'Created comprehensive database with linked modules, automations and beautiful interface.',
      results: [
        isRu ? 'Экономия 2+ часов в день' : '2+ hours saved daily',
        isRu ? 'Все знания в одном месте' : 'All knowledge in one place',
        isRu ? '100+ довольных клиентов' : '100+ satisfied customers',
      ],
      tags: ['Notion', 'Productivity', 'Templates'],
      link: '/templates',
    },
    {
      title: isRu ? 'AI Промпты для Бизнеса' : 'AI Prompts for Business',
      category: 'AI Solutions',
      description: isRu 
        ? 'Набор из 50+ оптимизированных промптов для автоматизации бизнес-процессов с помощью ChatGPT и Claude.'
        : 'Collection of 50+ optimized prompts for automating business processes with ChatGPT and Claude.',
      challenge: isRu 
        ? 'Компания тратила много времени на рутинные задачи написания контента и анализа данных.'
        : 'Company spent too much time on routine content writing and data analysis tasks.',
      solution: isRu 
        ? 'Разработал систему промптов для генерации контента, анализа конкурентов, email-маркетинга.'
        : 'Developed prompts system for content generation, competitor analysis, email marketing.',
      results: [
        isRu ? 'Снижение затрат на контент на 60%' : '60% content cost reduction',
        isRu ? 'Ускорение процессов в 3 раза' : '3x faster processes',
        isRu ? 'Рост конверсии на 25%' : '25% conversion increase',
      ],
      tags: ['AI', 'ChatGPT', 'Automation'],
      link: '/ai-prompts',
    },
    {
      title: isRu ? 'Персональный Сайт Консультанта' : 'Consultant Personal Website',
      category: 'Web Development',
      description: isRu 
        ? 'Современный персональный сайт с портфолио, блогом и системой бронирования консультаций.'
        : 'Modern personal website with portfolio, blog and consultation booking system.',
      challenge: isRu 
        ? 'Консультанту нужен был профессиональный сайт для привлечения клиентов и демонстрации экспертизы.'
        : 'Consultant needed professional website to attract clients and showcase expertise.',
      solution: isRu 
        ? 'Разработал адаптивный сайт с интеграцией Calendly, формой связи и оптимизацией SEO.'
        : 'Developed responsive website with Calendly integration, contact form and SEO optimization.',
      results: [
        isRu ? 'Рост заявок на 150%' : '150% increase in leads',
        isRu ? 'Первая страница Google' : 'First page on Google',
        isRu ? 'Время загрузки < 2 сек' : 'Load time < 2 sec',
      ],
      tags: ['React', 'SEO', 'Consulting'],
      link: '/consulting',
    },
  ];

  return (
    <>
      <SEO 
        titleRu="Кейсы | Дэн Янович"
        titleEn="Cases | Dan Yanovich"
        descriptionRu="Примеры реальных проектов: Notion шаблоны, AI автоматизации, веб-разработка. Узнайте как я решаю задачи клиентов."
        descriptionEn="Real project examples: Notion templates, AI automations, web development. See how I solve client challenges."
        url="https://danyanovich.com/cases"
      />
      
      <div className="min-h-screen py-20">
        <div className="container mx-auto px-4">
          {/* Hero */}
          <AnimatedSection className="text-center mb-16">
            <Badge variant="outline" className="mb-4">
              {isRu ? 'Портфолио проектов' : 'Project Portfolio'}
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {isRu ? 'Кейсы и Проекты' : 'Cases & Projects'}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {isRu 
                ? 'Реальные примеры работ: от идеи до результата. Каждый проект — это решённая задача клиента.'
                : 'Real work examples: from idea to result. Each project is a solved client challenge.'}
            </p>
          </AnimatedSection>

          {/* Cases Grid */}
          <div className="space-y-12">
            {cases.map((caseItem, index) => (
              <AnimatedSection key={index}>
                <Card className="glass-card overflow-hidden">
                  <CardHeader className="pb-4">
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <Badge>{caseItem.category}</Badge>
                      {caseItem.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <CardTitle className="text-2xl">{caseItem.title}</CardTitle>
                    <p className="text-muted-foreground">{caseItem.description}</p>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold mb-2 text-sm uppercase tracking-wide text-muted-foreground">
                          {isRu ? 'Задача' : 'Challenge'}
                        </h4>
                        <p className="text-foreground">{caseItem.challenge}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2 text-sm uppercase tracking-wide text-muted-foreground">
                          {isRu ? 'Решение' : 'Solution'}
                        </h4>
                        <p className="text-foreground">{caseItem.solution}</p>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-3 text-sm uppercase tracking-wide text-muted-foreground">
                        {isRu ? 'Результаты' : 'Results'}
                      </h4>
                      <div className="flex flex-wrap gap-3">
                        {caseItem.results.map((result, i) => (
                          <div key={i} className="flex items-center gap-2 bg-primary/10 rounded-lg px-3 py-2">
                            <CheckCircle2 className="h-4 w-4 text-primary" />
                            <span className="text-sm font-medium">{result}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-border/20">
                      <Link to={caseItem.link}>
                        <Button variant="outline" className="group">
                          {isRu ? 'Подробнее' : 'Learn More'}
                          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>

          {/* CTA Section */}
          <AnimatedSection className="mt-16 text-center">
            <Card className="glass-card p-8">
              <h2 className="text-2xl font-bold mb-4">
                {isRu ? 'Готовы обсудить ваш проект?' : 'Ready to discuss your project?'}
              </h2>
              <p className="text-muted-foreground mb-6">
                {isRu 
                  ? 'Напишите мне и расскажите о своей задаче. Первая консультация — бесплатно.'
                  : 'Write me and tell about your challenge. First consultation is free.'}
              </p>
              <Link to="/contact">
                <Button size="lg" className="group">
                  {isRu ? 'Связаться' : 'Contact Me'}
                  <ExternalLink className="ml-2 h-4 w-4 group-hover:rotate-12 transition-transform" />
                </Button>
              </Link>
            </Card>
          </AnimatedSection>
        </div>
      </div>
    </>
  );
};

export default Cases;
