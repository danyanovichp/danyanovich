import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Clock, Users, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Courses = () => {
  const { t, i18n } = useTranslation();

  const courseFeatures = [
    {
      icon: BookOpen,
      title: i18n.language === 'ru' ? "Практический подход" : "Practical Approach",
      description: i18n.language === 'ru' 
        ? "Все материалы основаны на реальных кейсах и проектах"
        : "All materials based on real cases and projects",
    },
    {
      icon: Clock,
      title: i18n.language === 'ru' ? "В вашем темпе" : "At Your Pace",
      description: i18n.language === 'ru' 
        ? "Учитесь когда удобно, доступ к материалам навсегда"
        : "Learn at your convenience, lifetime access to materials",
    },
    {
      icon: Users,
      title: i18n.language === 'ru' ? "Поддержка" : "Support",
      description: i18n.language === 'ru' 
        ? "Консультации и помощь в процессе обучения"
        : "Consultation and assistance during training",
    },
  ];

  const benefits = i18n.language === 'ru' ? [
    "Научитесь создавать эффективные системы в Notion",
    "Освоите автоматизацию рабочих процессов",
    "Получите готовые шаблоны для работы",
    "Сможете внедрять Notion в команде",
    "Узнаете лучшие практики организации данных",
    "Получите сертификат о прохождении курса",
  ] : [
    "Learn to create effective systems in Notion",
    "Master workflow automation",
    "Get ready-made templates for work",
    "Be able to implement Notion in a team",
    "Learn best practices for organizing data",
    "Receive a certificate of completion",
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-primary text-primary-foreground py-16 md:py-20 border-b-4 border-border">
        <div className="container">
          <div className="max-w-3xl space-y-6">
            <h1 className="text-2xl md:text-3xl">{t('courses.title')}</h1>
            <p className="text-xs md:text-sm opacity-90">
              {t('courses.subtitle')}
            </p>
            <Button size="lg" variant="secondary" asChild>
              <Link to="/contact">
                {i18n.language === 'ru' ? 'Записаться на курс' : 'Enroll in Course'}
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-20 bg-secondary">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {courseFeatures.map((feature, index) => (
              <div
                key={index}
                className="pixel-border p-6 bg-background space-y-3 text-center"
              >
                <div className="inline-flex p-3 pixel-border bg-primary mx-auto">
                  <feature.icon className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="text-sm font-bold">{feature.title}</h3>
                <p className="text-xs text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 md:py-20">
        <div className="container">
          <h2 className="text-xl md:text-2xl text-center mb-12">
            {i18n.language === 'ru' ? 'Что вы получите' : 'What You Get'}
          </h2>
          <div className="grid md:grid-cols-2 gap-4 max-w-3xl mx-auto">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="flex items-start gap-3 pixel-border p-4 bg-background"
              >
                <CheckCircle className="h-4 w-4 text-primary flex-shrink-0 mt-1" />
                <span className="text-xs">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Courses;
