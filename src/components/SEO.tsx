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
  structuredData?: object | object[];
}

// Базовые данные об авторе/организации
const getPersonSchema = (url: string, description: string) => ({
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': 'https://danyanovich.com/#person',
  name: 'Дэн Янович',
  alternateName: 'Dan Yanovich',
  url: 'https://danyanovich.com',
  image: 'https://danyanovich.com/images/dan-yanovich.jpg',
  sameAs: [
    'https://www.youtube.com/channel/UCzcTrBkzXgA9aaH05cWVi2g',
    'https://t.me/danyanovichp',
    'https://www.notion.so/@danyanovich',
  ],
  jobTitle: 'Notion Expert & AI Consultant',
  description: description,
  knowsAbout: ['Notion', 'AI', 'Productivity', 'Automation', 'Templates'],
});

// Схема веб-сайта
const getWebSiteSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': 'https://danyanovich.com/#website',
  name: 'Дэн Янович | Notion и AI Эксперт',
  alternateName: 'Dan Yanovich | Notion and AI Expert',
  url: 'https://danyanovich.com',
  description: 'Создаю шаблоны Notion и консультирую по внедрению AI-инструментов',
  inLanguage: ['ru-RU', 'en-US'],
  publisher: {
    '@id': 'https://danyanovich.com/#person',
  },
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: 'https://danyanovich.com/templates?search={search_term_string}',
    },
    'query-input': 'required name=search_term_string',
  },
});

// Схема для страницы услуг
export const getServiceSchema = (isRu: boolean) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': 'https://danyanovich.com/consulting#service',
  name: isRu ? 'Консультации по Notion и AI' : 'Notion and AI Consulting',
  description: isRu 
    ? 'Персональные консультации по настройке Notion и внедрению AI-инструментов'
    : 'Personal consulting on Notion setup and AI tool implementation',
  provider: {
    '@id': 'https://danyanovich.com/#person',
  },
  serviceType: isRu ? 'Консалтинг' : 'Consulting',
  areaServed: {
    '@type': 'Place',
    name: 'Worldwide',
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: isRu ? 'Услуги консалтинга' : 'Consulting Services',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: isRu ? 'Персональная консультация' : 'Personal Consultation',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: isRu ? 'Настройка Notion' : 'Notion Setup',
        },
      },
    ],
  },
});

// Схема для курсов
export const getCourseSchema = (isRu: boolean) => ({
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  '@id': 'https://danyanovich.com/courses#courselist',
  name: isRu ? 'Курсы по Notion и AI' : 'Notion and AI Courses',
  description: isRu 
    ? 'Обучающие курсы по работе с Notion и AI-инструментами'
    : 'Training courses on Notion and AI tools',
  itemListElement: [
    {
      '@type': 'Course',
      position: 1,
      name: isRu ? 'Notion для начинающих' : 'Notion for Beginners',
      description: isRu ? 'Основы работы с Notion' : 'Notion basics',
      provider: {
        '@id': 'https://danyanovich.com/#person',
      },
    },
  ],
});

// Схема для FAQ
export const getFAQSchema = (faqs: { question: string; answer: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  '@id': 'https://danyanovich.com/faq#faqpage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
});

// Схема для блога
export const getBlogSchema = (isRu: boolean) => ({
  '@context': 'https://schema.org',
  '@type': 'Blog',
  '@id': 'https://danyanovich.com/blog#blog',
  name: isRu ? 'Блог Дэна Яновича' : 'Dan Yanovich Blog',
  description: isRu 
    ? 'Статьи о Notion, AI и продуктивности'
    : 'Articles about Notion, AI and productivity',
  url: 'https://danyanovich.com/blog',
  author: {
    '@id': 'https://danyanovich.com/#person',
  },
  inLanguage: isRu ? 'ru-RU' : 'en-US',
});

// Схема для шаблонов (коллекция продуктов)
export const getTemplatesSchema = (isRu: boolean) => ({
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  '@id': 'https://danyanovich.com/templates#collection',
  name: isRu ? 'Шаблоны Notion' : 'Notion Templates',
  description: isRu 
    ? 'Коллекция профессиональных шаблонов Notion для бизнеса и личного использования'
    : 'Collection of professional Notion templates for business and personal use',
  url: 'https://danyanovich.com/templates',
  author: {
    '@id': 'https://danyanovich.com/#person',
  },
  about: {
    '@type': 'Thing',
    name: 'Notion Templates',
  },
});

// Схема для отдельного шаблона (продукт)
export const getProductSchema = (product: {
  name: string;
  description: string;
  price: number;
  currency: string;
  image: string;
  url: string;
}) => ({
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: product.name,
  description: product.description,
  image: product.image,
  url: product.url,
  brand: {
    '@type': 'Brand',
    name: 'Dan Yanovich',
  },
  author: {
    '@id': 'https://danyanovich.com/#person',
  },
  offers: {
    '@type': 'Offer',
    price: product.price,
    priceCurrency: product.currency,
    availability: 'https://schema.org/InStock',
    seller: {
      '@id': 'https://danyanovich.com/#person',
    },
  },
});

// Схема для отзывов
export const getReviewsSchema = (isRu: boolean) => ({
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': 'https://danyanovich.com/reviews#reviews',
  name: isRu ? 'Отзывы клиентов' : 'Client Reviews',
  description: isRu 
    ? 'Отзывы о шаблонах Notion и консультациях Дэна Яновича'
    : 'Reviews of Dan Yanovich Notion templates and consulting',
  url: 'https://danyanovich.com/reviews',
  mainEntity: {
    '@type': 'ItemList',
    name: isRu ? 'Отзывы' : 'Reviews',
    itemListElement: [],
  },
});

// Схема BreadcrumbList
export const getBreadcrumbSchema = (items: { name: string; url: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: item.url,
  })),
});

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

  // Формируем массив схем для вывода
  const defaultSchemas = [
    getPersonSchema(url, descriptionRu),
    getWebSiteSchema(),
  ];

  const schemas = structuredData 
    ? Array.isArray(structuredData) 
      ? [...defaultSchemas, ...structuredData]
      : [...defaultSchemas, structuredData]
    : defaultSchemas;

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
      
      {/* Structured Data - Multiple schemas */}
      {schemas.map((schema, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
};

export default SEO;
