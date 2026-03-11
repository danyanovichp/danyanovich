import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { DEFAULT_OG_IMAGE, SITE_URL } from '@/seo/site';

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
  noindex?: boolean;
  imageAlt?: string;
}

const BASE_URL = SITE_URL;
const DEFAULT_IMAGE = `${BASE_URL}${DEFAULT_OG_IMAGE}`;

const toAbsoluteUrl = (value: string) => {
  if (/^https?:\/\//.test(value)) {
    return value;
  }

  return `${BASE_URL}${value.startsWith('/') ? value : `/${value}`}`;
};

// Базовые данные об авторе/организации
const getPersonSchema = (url: string, description: string) => ({
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': `${BASE_URL}/#person`,
  name: 'Дэн Янович',
  alternateName: 'Dan Yanovich',
  url: BASE_URL,
  image: DEFAULT_IMAGE,
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
const getWebSiteSchema = (isRu: boolean) => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${BASE_URL}/#website`,
  name: 'Дэн Янович | Notion и AI Эксперт',
  alternateName: 'Dan Yanovich | Notion and AI Expert',
  url: BASE_URL,
  description: isRu
    ? 'Создаю шаблоны Notion и консультирую по внедрению AI-инструментов'
    : 'I create Notion templates and consult on AI tool implementation',
  inLanguage: ['ru-RU', 'en-US'],
  publisher: {
    '@id': `${BASE_URL}/#person`,
  },
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${BASE_URL}/templates?search={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
});

// Схема для страницы услуг
export const getServiceSchema = (isRu: boolean) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': `${BASE_URL}/consulting#service`,
  name: isRu ? 'Консультации по Notion и AI' : 'Notion and AI Consulting',
  description: isRu
    ? 'Персональные консультации по настройке Notion и внедрению AI-инструментов'
    : 'Personal consulting on Notion setup and AI tool implementation',
  provider: {
    '@id': `${BASE_URL}/#person`,
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
  '@id': `${BASE_URL}/courses#courselist`,
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
        '@id': `${BASE_URL}/#person`,
      },
    },
  ],
});

// Схема для FAQ
export const getFAQSchema = (faqs: { question: string; answer: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  '@id': `${BASE_URL}/faq#faqpage`,
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
  '@id': `${BASE_URL}/blog#blog`,
  name: isRu ? 'Блог Дэна Яновича' : 'Dan Yanovich Blog',
  description: isRu
    ? 'Статьи о Notion, AI и продуктивности'
    : 'Articles about Notion, AI and productivity',
  url: `${BASE_URL}/blog`,
  author: {
    '@id': `${BASE_URL}/#person`,
  },
  inLanguage: isRu ? 'ru-RU' : 'en-US',
});

// Схема для шаблонов (коллекция продуктов)
export const getTemplatesSchema = (isRu: boolean) => ({
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  '@id': `${BASE_URL}/templates#collection`,
  name: isRu ? 'Шаблоны Notion' : 'Notion Templates',
  description: isRu
    ? 'Коллекция профессиональных шаблонов Notion для бизнеса и личного использования'
    : 'Collection of professional Notion templates for business and personal use',
  url: `${BASE_URL}/templates`,
  author: {
    '@id': `${BASE_URL}/#person`,
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
    '@id': `${BASE_URL}/#person`,
  },
  offers: {
    '@type': 'Offer',
    price: product.price,
    priceCurrency: product.currency,
    availability: 'https://schema.org/InStock',
    seller: {
      '@id': `${BASE_URL}/#person`,
    },
  },
});

// Схема для отзывов
export const getReviewsSchema = (isRu: boolean) => ({
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${BASE_URL}/reviews#reviews`,
  name: isRu ? 'Отзывы клиентов' : 'Client Reviews',
  description: isRu
    ? 'Отзывы о шаблонах Notion и консультациях Дэна Яновича'
    : 'Reviews of Dan Yanovich Notion templates and consulting',
  url: `${BASE_URL}/reviews`,
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
  image = DEFAULT_IMAGE,
  url,
  type = 'website',
  author = 'Дэн Янович',
  structuredData,
  noindex = false,
  imageAlt = 'Dan Yanovich',
}: SEOProps) => {
  const { i18n } = useTranslation();
  const location = useLocation();
  const isRu = i18n.language === 'ru';

  const title = isRu ? titleRu : titleEn;
  const description = isRu ? descriptionRu : descriptionEn;
  const locale = isRu ? 'ru_RU' : 'en_US';
  const alternateLocale = isRu ? 'en_US' : 'ru_RU';
  const imageUrl = toAbsoluteUrl(image);
  const sourcePath = url
    ? (url.startsWith('http') ? new URL(url).pathname : url)
    : location.pathname;

  // Calculate paths
  const currentPath = sourcePath.replace(BASE_URL, '');
  const cleanPath = currentPath.replace(/^\/(ru|en)(?=\/|$)/, '');
  const pathSuffix = cleanPath === '/' ? '' : cleanPath.startsWith('/') ? cleanPath : `/${cleanPath}`;

  const currentUrl = `${BASE_URL}/${i18n.language}${pathSuffix}`;
  const ruUrl = `${BASE_URL}/ru${pathSuffix}`;
  const enUrl = `${BASE_URL}/en${pathSuffix}`;
  const xDefaultUrl = ruUrl; // Set ru as the x-default

  // Формируем массив схем для вывода
  const defaultSchemas = [
    getPersonSchema(currentUrl, description),
    getWebSiteSchema(isRu),
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
      <meta name="robots" content={noindex ? 'noindex, follow' : 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1'} />

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:alt" content={imageAlt} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={isRu ? 'Дэн Янович' : 'Dan Yanovich'} />
      <meta property="og:locale" content={locale} />
      <meta property="og:locale:alternate" content={alternateLocale} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
      <meta name="twitter:image:alt" content={imageAlt} />

      {/* Canonical URL */}
      <link rel="canonical" href={currentUrl} />

      {/* Hreflang for multilingual */}
      <link rel="alternate" hrefLang="ru" href={ruUrl} />
      <link rel="alternate" hrefLang="en" href={enUrl} />
      <link rel="alternate" hrefLang="x-default" href={xDefaultUrl} />

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
