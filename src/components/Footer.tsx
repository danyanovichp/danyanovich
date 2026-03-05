import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";


const Footer = () => {
  const { i18n } = useTranslation();

  const productLinks = [
    { to: 'https://www.notion.com/@danyanovich', labelRu: 'Шаблоны Notion', labelEn: 'Notion Templates', external: true },
    { to: '/packages', labelRu: 'Пакеты', labelEn: 'Packages' },
    { to: '/consulting', labelRu: 'Консалтинг', labelEn: 'Consulting' },
  ];

  const resourceLinks = [
    { to: '/cases', labelRu: 'Кейсы', labelEn: 'Cases' },
    { to: '/reviews', labelRu: 'Отзывы', labelEn: 'Reviews' },
    { to: '/contact', labelRu: 'Обо мне', labelEn: 'About Me' },
    { to: '/support', labelRu: 'Поддержать', labelEn: 'Support' },
  ];

  return (
    <footer className="relative border-t border-foreground/20 bg-card mt-auto">
      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="flex gap-16">
          {/* Products */}
          <div>
            <h4 className="font-display font-semibold text-xs mb-3 uppercase tracking-wider text-muted-foreground/60">
              {i18n.language === 'ru' ? 'Услуги' : 'Services'}
            </h4>
            <ul className="space-y-2 text-sm">
              {productLinks.map((link) => (
                <li key={link.to}>
                  {link.external ? (
                    <a href={link.to} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                      {i18n.language === 'ru' ? link.labelRu : link.labelEn}
                    </a>
                  ) : (
                    <Link to={link.to} className="text-muted-foreground hover:text-foreground transition-colors">
                      {i18n.language === 'ru' ? link.labelRu : link.labelEn}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-display font-semibold text-xs mb-3 uppercase tracking-wider text-muted-foreground/60">
              {i18n.language === 'ru' ? 'Ресурсы' : 'Resources'}
            </h4>
            <ul className="space-y-2 text-sm">
              {resourceLinks.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-muted-foreground hover:text-foreground transition-colors">
                    {i18n.language === 'ru' ? link.labelRu : link.labelEn}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
