import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

interface SEOProps {
  titleRu?: string;
  titleEn?: string;
  descriptionRu?: string;
  descriptionEn?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'product';
  author?: string;
  structuredData?: object;
}

const SEO = ({
  titleRu = 'Дэн Янович | Notion и AI Эксперт',
  titleEn = 'Dan Yanovich | Notion and AI Expert',
  descriptionRu = 'Создаю шаблоны Notion и консультирую по внедрению AI-инструментов. Более 50 проектов, 100+ часов обучения.',
  descriptionEn = 'I create Notion templates and consult on AI tool implementation. 50+ projects, 100+ hours of training.',
  keywords = 'Notion, AI, автоматизация, шаблоны, консультант, Дэн Янович, продуктивность',
  image = 'https://lovable.dev/opengraph-image-p98pqg.png',
  url = 'https://danyanovich.com',
  type = 'website',
  author = 'Дэн Янович',
  structuredData,
}: SEOProps) => {
  const { i18n } = useTranslation();
  const isRu = i18n.language === 'ru';
  
  const title = isRu ? titleRu : titleEn;
  const description = isRu ? descriptionRu : descriptionEn;
  const locale = isRu ? 'ru_RU' : 'en_US';
  const alternateLocale = isRu ? 'en_US' : 'ru_RU';

  const defaultStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Дэн Янович',
    url: url,
    sameAs: [
      'https://www.youtube.com/channel/UCzcTrBkzXgA9aaH05cWVi2g',
      'https://t.me/danyanovichp',
      'https://www.notion.so/@danyanovich',
    ],
    jobTitle: 'Notion Expert & AI Consultant',
    description: descriptionRu,
  };

  return (
    <Helmet>
      {/* Language */}
      <html lang={isRu ? 'ru' : 'en'} />
      
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      
      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:locale" content={locale} />
      <meta property="og:locale:alternate" content={alternateLocale} />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={url} />
      
      {/* Hreflang for multilingual */}
      <link rel="alternate" hrefLang="ru" href={url} />
      <link rel="alternate" hrefLang="en" href={url} />
      <link rel="alternate" hrefLang="x-default" href={url} />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData || defaultStructuredData)}
      </script>
    </Helmet>
  );
};

export default SEO;
