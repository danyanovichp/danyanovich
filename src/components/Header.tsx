import { Link, useLocation } from "react-router-dom";
import { Moon, Sun, Globe } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { useTranslation } from "react-i18next";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";

const Header = () => {
  const { theme, setTheme } = useTheme();
  const { t, i18n } = useTranslation();
  const location = useLocation();

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'ru' ? 'en' : 'ru');
  };

  const mainLinks = [
    { href: "/", label: t('nav.home') },
    { href: "/templates", label: t('nav.templates') },
    { href: "/contact", label: t('nav.contact') },
  ];

  const secondaryLinks = [
    { href: "/ai-training", label: i18n.language === 'ru' ? 'ИИ ОБУЧЕНИЕ' : 'AI TRAINING' },
    { href: "/cases", label: i18n.language === 'ru' ? 'КЕЙСЫ' : 'CASES' },
    { href: "/portfolio", label: i18n.language === 'ru' ? 'ПОРТФОЛИО' : 'PORTFOLIO' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-2xl border-b border-border/10">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link 
            to="/" 
            className="px-4 py-1.5 rounded-full bg-primary text-primary-foreground text-sm font-bold hover:opacity-90 transition-opacity"
          >
            {i18n.language === 'ru' ? 'ДЯ' : 'DY'}
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 p-1 rounded-full bg-muted/40 border border-border/10">
            {mainLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`px-4 py-1.5 text-sm font-medium rounded-full transition-all ${
                  location.pathname === link.href
                    ? "bg-primary text-primary-foreground" 
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Secondary Navigation */}
          <nav className="hidden lg:flex items-center gap-1 p-1 rounded-full bg-muted/40 border border-border/10">
            {secondaryLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`px-3 py-1.5 text-xs font-semibold tracking-wider rounded-full transition-all ${
                  location.pathname === link.href
                    ? "bg-primary text-primary-foreground" 
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Express Audit CTA */}
          <a
            href="https://t.me/danyanovich?text=Хочу%20записаться%20на%20аудит"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden lg:flex items-center gap-2 px-4 py-1.5 bg-accent-lime/15 text-accent-lime rounded-full text-sm font-medium hover:bg-accent-lime/25 transition-colors"
          >
            {i18n.language === 'ru' ? 'Экспресс-аудит' : 'Express Audit'}
          </a>

          {/* Controls */}
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              title={theme === "light" ? (i18n.language === 'ru' ? "Тёмная тема" : "Dark Mode") : (i18n.language === 'ru' ? "Светлая тема" : "Light Mode")}
              className="rounded-full h-9 w-9"
            >
              {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleLanguage}
              title={i18n.language === 'ru' ? 'EN' : 'RU'}
              className="rounded-full h-9 w-9"
            >
              <Globe className="h-4 w-4" />
            </Button>

            {/* Mobile Navigation */}
            <Sheet>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="icon" className="rounded-full relative group h-9 w-9">
                  <div className="flex flex-col gap-1">
                    <span className="block w-4 h-[1.5px] bg-current" />
                    <span className="block w-4 h-[1.5px] bg-current" />
                    <span className="block w-4 h-[1.5px] bg-current" />
                  </div>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-background/95 backdrop-blur-2xl border-l border-border/10">
                <nav className="flex flex-col gap-2 mt-8">
                  {[...mainLinks, ...secondaryLinks].map((link, index) => (
                    <Link
                      key={link.href}
                      to={link.href}
                      className={`mobile-menu-item px-4 py-3 text-sm font-medium rounded-2xl transition-all ${
                        location.pathname === link.href
                          ? "bg-primary text-primary-foreground" 
                          : "text-foreground hover:bg-muted/50"
                      }`}
                      style={{ animationDelay: `${index * 0.05}s` }}
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
