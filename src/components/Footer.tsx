import { useTranslation } from "react-i18next";
import { Youtube, MessageCircle } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import DecorativeBlobs from "./DecorativeBlobs";

const Footer = () => {
  const { i18n } = useTranslation();
  const currentYear = new Date().getFullYear();

  const productLinks = [
    { to: '/products', labelRu: 'Все продукты', labelEn: 'All Products' },
    { to: '/packages', labelRu: 'Пакеты', labelEn: 'Packages' },
    { to: '/consulting', labelRu: 'Консалтинг', labelEn: 'Consulting' },
  ];

  const resourceLinks = [
    { to: '/cases', labelRu: 'Кейсы', labelEn: 'Cases' },
    { to: '/reviews', labelRu: 'Отзывы', labelEn: 'Reviews' },
    { to: '/contact', labelRu: 'Обо мне', labelEn: 'About Me' },
  ];

  return (
    <footer className="relative border-t border-border/5 mt-auto overflow-hidden">
      <DecorativeBlobs variant="footer" />
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <span className="font-display text-xl font-bold">
              {i18n.language === 'ru' ? 'Дэн Янович' : 'Dan Yanovich'}
            </span>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              {i18n.language === 'ru' 
                ? 'Эксперт по Notion и AI-решениям. Помогаю оптимизировать рабочие процессы.'
                : 'Notion and AI solutions expert. Optimizing workflows and productivity.'}
            </p>
            <div className="flex gap-2 pt-2">
              <Button variant="outline" size="icon" asChild className="rounded-full h-9 w-9">
                <a href="https://www.youtube.com/channel/UCzcTrBkzXgA9aaH05cWVi2g" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                  <Youtube className="h-4 w-4" />
                </a>
              </Button>
              <Button variant="outline" size="icon" asChild className="rounded-full h-9 w-9">
                <a href="https://t.me/danyanovichp" target="_blank" rel="noopener noreferrer" aria-label="Telegram">
                  <MessageCircle className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-display font-semibold text-xs mb-4 uppercase tracking-wider text-muted-foreground">
              {i18n.language === 'ru' ? 'Продукты' : 'Products'}
            </h4>
            <ul className="space-y-3 text-sm">
              {productLinks.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-muted-foreground hover:text-foreground transition-colors">
                    {i18n.language === 'ru' ? link.labelRu : link.labelEn}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-display font-semibold text-xs mb-4 uppercase tracking-wider text-muted-foreground">
              {i18n.language === 'ru' ? 'Ресурсы' : 'Resources'}
            </h4>
            <ul className="space-y-3 text-sm">
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

        <div className="mt-16 pt-8 border-t border-border/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">
            © {currentYear} {i18n.language === 'ru' ? 'Дэн Янович' : 'Dan Yanovich'}
          </p>
          <div className="flex gap-6 text-xs">
            <Link to="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
              {i18n.language === 'ru' ? 'Конфиденциальность' : 'Privacy'}
            </Link>
            <Link to="/terms" className="text-muted-foreground hover:text-foreground transition-colors">
              {i18n.language === 'ru' ? 'Условия' : 'Terms'}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
