import { Youtube, MessageCircle } from "lucide-react";
import { Button } from "./ui/button";

const Footer = () => {
  return (
    <footer className="border-t border-border/40 bg-muted/30">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-bold text-gradient-brand mb-4">
              Дэн Янович
            </h3>
            <p className="text-sm text-muted-foreground">
              Эксперт по Notion и AI-решениям. Помогаю оптимизировать рабочие процессы
              и повышать продуктивность.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Быстрые ссылки</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="/portfolio" className="hover:text-primary transition-colors">
                  Портфолио
                </a>
              </li>
              <li>
                <a href="/templates" className="hover:text-primary transition-colors">
                  Шаблоны
                </a>
              </li>
              <li>
                <a href="/ai-prompts" className="hover:text-primary transition-colors">
                  AI Промпты
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-primary transition-colors">
                  Контакты
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-semibold mb-4">Соц. сети</h4>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                asChild
              >
                <a
                  href="https://www.youtube.com/@262ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                >
                  <Youtube className="h-5 w-5" />
                </a>
              </Button>
              <Button
                variant="outline"
                size="icon"
                asChild
              >
                <a
                  href="https://t.me/notion262"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Telegram"
                >
                  <MessageCircle className="h-5 w-5" />
                </a>
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border/40 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Дэн Янович. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
