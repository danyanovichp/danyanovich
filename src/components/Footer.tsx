import { useTranslation } from "react-i18next";
import { Youtube, MessageCircle } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

const Footer = () => {
  const { t, i18n } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted/30 backdrop-blur-xl border-t border-border/20 mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="text-sm font-bold px-4 py-2 rounded-xl bg-primary/90 backdrop-blur-sm text-primary-foreground inline-block mb-4">
              {i18n.language === 'ru' ? 'ДЯ' : 'DY'}
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {i18n.language === 'ru' 
                ? 'Эксперт по Notion и AI-решениям. Помогаю оптимизировать рабочие процессы и повышать продуктивность.'
                : 'Notion and AI solutions expert. I help optimize workflows and increase productivity.'}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-xs mb-4 uppercase">
              {i18n.language === 'ru' ? 'Быстрые ссылки' : 'Quick Links'}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/templates" className="text-muted-foreground hover:text-foreground transition-colors">
                  {t('nav.templates')}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
                  {t('nav.contact')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-bold text-xs mb-4 uppercase">
              {i18n.language === 'ru' ? 'Соц. сети' : 'Social'}
            </h4>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                asChild
                className="rounded-xl"
              >
                <a
                  href="https://www.youtube.com/@danyanovich"
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
                className="rounded-xl"
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
        </div>

        <div className="mt-8 pt-8 border-t border-border/20 text-center">
          <p className="text-xs text-muted-foreground">
            © {currentYear} {i18n.language === 'ru' ? 'Дэн Янович. Все права защищены.' : 'Dan Yanovich. All rights reserved.'}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
