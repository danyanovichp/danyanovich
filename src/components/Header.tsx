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
    { href: "/products", label: i18n.language === 'ru' ? 'ПРОДУКТЫ' : 'PRODUCTS' },
    { href: "/cases", label: i18n.language === 'ru' ? 'КЕЙСЫ' : 'CASES' },
    { href: "/contact", label: t('nav.contact') },
  ];

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-2xl border-b border-border/5">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link 
            to="/" 
            className="font-display text-xl font-bold tracking-tight hover:opacity-70 transition-opacity"
          >
            {i18n.language === 'ru' ? 'Дэн Янович' : 'Dan Yanovich'}
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {mainLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`text-sm font-medium transition-all relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-foreground after:transition-transform after:duration-300 ${
                  location.pathname === link.href || (link.href === '/products' && location.pathname.startsWith('/templates'))
                    ? "text-foreground after:scale-x-100" 
                    : "text-muted-foreground hover:text-foreground after:scale-x-0 hover:after:scale-x-100"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Controls */}
          <div className="flex items-center gap-1">
            {/* Express Audit CTA */}
            <a
              href="https://t.me/danyanovich?text=Хочу%20записаться%20на%20аудит"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:flex items-center gap-2 px-5 py-2 bg-pastel-yellow text-foreground rounded-full text-sm font-semibold hover:opacity-80 transition-opacity"
            >
              {i18n.language === 'ru' ? 'Экспресс-аудит' : 'Express Audit'}
            </a>

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
                  {mainLinks.map((link, index) => (
                    <Link
                      key={link.href}
                      to={link.href}
                      className={`mobile-menu-item px-4 py-3 text-sm font-medium rounded-2xl transition-all ${
                        location.pathname === link.href
                          ? "bg-pastel-lavender/30 text-foreground" 
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
