import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { BookOpen, Clock, Users, CheckCircle } from "lucide-react";
import { useTranslation } from "react-i18next";
import SEO, { getCourseSchema, getBreadcrumbSchema } from "@/components/SEO";

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

  const isRu = i18n.language === 'ru';
  const courseSchema = getCourseSchema(isRu);
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: isRu ? 'Главная' : 'Home', url: 'https://danyanovich.com' },
    { name: isRu ? 'Курсы' : 'Courses', url: 'https://danyanovich.com/courses' },
  ]);

  return (
    <div className="flex flex-col min-h-screen">
      <SEO 
        titleRu="Курсы по Notion | Дэн Янович"
        titleEn="Notion Courses | Dan Yanovich"
        descriptionRu="Обучающие курсы по работе с Notion и AI-инструментами. Практический подход, постоянный доступ к материалам."
        descriptionEn="Training courses on Notion and AI tools. Practical approach, lifetime access to materials."
        url="https://danyanovich.com/courses"
        structuredData={[courseSchema, breadcrumbSchema]}
      />
      
      {/* Hero Section with "In Development" Banner */}
      <section className="bg-muted/30 py-16 md:py-20 border-b">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            {/* In Development Badge */}
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-md text-base font-medium">
              <span>🚧</span>
              <span>{t('common.inDevelopment')}</span>
            </div>

            <h1 className="text-3xl md:text-5xl font-bold">{t('courses.title')}</h1>
            <p className="text-base md:text-lg text-muted-foreground">{t('courses.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-20 bg-muted/30">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {courseFeatures.map((feature, index) => (
              <Card key={index} className="text-center">
                <CardHeader className="space-y-4">
                  <div className="inline-flex p-4 bg-primary text-primary-foreground rounded-lg mx-auto">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-bold">{feature.title}</h3>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 md:py-20">
        <div className="container">
          <h2 className="text-2xl md:text-3xl text-center mb-12 font-bold">
            {i18n.language === 'ru' ? 'Что вы получите' : 'What You Get'}
          </h2>
          <div className="grid md:grid-cols-2 gap-4 max-w-3xl mx-auto">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start gap-3 border rounded-lg p-4 bg-background">
                <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-sm">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Courses;
