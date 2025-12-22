import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'product';
  author?: string;
  structuredData?: object;
}

const SEO = ({
  title = 'Дэн Янович | Notion и AI Эксперт',
  description = 'Создаю шаблоны Notion и консультирую по внедрению AI-инструментов. Более 50 проектов, 100+ часов обучения.',
  keywords = 'Notion, AI, автоматизация, шаблоны, консультант, Дэн Янович, продуктивность',
  image = 'https://lovable.dev/opengraph-image-p98pqg.png',
  url = 'https://danyanovich.com',
  type = 'website',
  author = 'Дэн Янович',
  structuredData,
}: SEOProps) => {
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
    description: description,
  };

  return (
    <Helmet>
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
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={url} />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData || defaultStructuredData)}
      </script>
    </Helmet>
  );
};

export default SEO;
