import { useTranslation } from "react-i18next";
import { Youtube, MessageCircle } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import NewsletterSignup from "./NewsletterSignup";

const Footer = () => {
  const { t, i18n } = useTranslation();
  const currentYear = new Date().getFullYear();

  const productLinks = [
    { to: '/templates', labelRu: 'Шаблоны', labelEn: 'Templates' },
    { to: '/courses', labelRu: 'Курсы', labelEn: 'Courses' },
    { to: '/ai-prompts', labelRu: 'AI Промпты', labelEn: 'AI Prompts' },
    { to: '/packages', labelRu: 'Пакеты', labelEn: 'Packages' },
  ];

  const resourceLinks = [
    { to: '/faq', labelRu: 'FAQ', labelEn: 'FAQ' },
    { to: '/consulting', labelRu: 'Консалтинг', labelEn: 'Consulting' },
    { to: '/portfolio', labelRu: 'Портфолио', labelEn: 'Portfolio' },
    { to: '/reviews', labelRu: 'Отзывы', labelEn: 'Reviews' },
  ];

  return (
    <footer className="bg-muted/30 backdrop-blur-xl border-t border-border/20 mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="text-sm font-bold px-4 py-2 rounded-xl bg-primary/90 backdrop-blur-sm text-primary-foreground inline-block">
              {i18n.language === 'ru' ? 'ДЯ' : 'DY'}
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {i18n.language === 'ru' 
                ? 'Эксперт по Notion и AI-решениям. Помогаю оптимизировать рабочие процессы и повышать продуктивность.'
                : 'Notion and AI solutions expert. I help optimize workflows and increase productivity.'}
            </p>
            {/* Social Icons */}
            <div className="flex gap-2 pt-2">
              <Button
                variant="outline"
                size="icon"
                asChild
                className="rounded-xl h-9 w-9"
              >
                <a
                  href="https://www.youtube.com/channel/UCzcTrBkzXgA9aaH05cWVi2g"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                >
                  <Youtube className="h-4 w-4" />
                </a>
              </Button>
              <Button
                variant="outline"
                size="icon"
                asChild
                className="rounded-xl h-9 w-9"
              >
                <a
                  href="https://t.me/danyanovichp"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Telegram"
                >
                  <MessageCircle className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-bold text-xs mb-4 uppercase">
              {i18n.language === 'ru' ? 'Продукты' : 'Products'}
            </h4>
            <ul className="space-y-2 text-xs">
              {productLinks.map((link) => (
                <li key={link.to}>
                  <Link 
                    to={link.to} 
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {i18n.language === 'ru' ? link.labelRu : link.labelEn}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-bold text-xs mb-4 uppercase">
              {i18n.language === 'ru' ? 'Ресурсы' : 'Resources'}
            </h4>
            <ul className="space-y-2 text-xs">
              {resourceLinks.map((link) => (
                <li key={link.to}>
                  <Link 
                    to={link.to} 
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {i18n.language === 'ru' ? link.labelRu : link.labelEn}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-bold text-xs mb-4 uppercase">
              {i18n.language === 'ru' ? 'Рассылка' : 'Newsletter'}
            </h4>
            <NewsletterSignup />
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border/20 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">
            © {currentYear} {i18n.language === 'ru' ? 'Дэн Янович. Все права защищены.' : 'Dan Yanovich. All rights reserved.'}
          </p>
          <div className="flex gap-4 text-xs">
            <Link 
              to="/contact" 
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              {i18n.language === 'ru' ? 'Обо мне' : 'About Me'}
            </Link>
            <span className="text-muted-foreground/50">|</span>
            <Link 
              to="/privacy" 
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              {i18n.language === 'ru' ? 'Конфиденциальность' : 'Privacy'}
            </Link>
            <span className="text-muted-foreground/50">|</span>
            <Link 
              to="/terms" 
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              {i18n.language === 'ru' ? 'Условия' : 'Terms'}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
