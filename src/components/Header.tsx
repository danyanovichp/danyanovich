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
    { href: "/cases", label: i18n.language === 'ru' ? 'КЕЙСЫ' : 'CASES' },
    { href: "/blog", label: i18n.language === 'ru' ? 'БЛОГ' : 'BLOG' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-background/70 backdrop-blur-xl border-b border-border/20">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo - glass pill */}
          <Link 
            to="/" 
            className="px-4 py-2 rounded-xl bg-primary/90 backdrop-blur-sm text-primary-foreground text-sm font-bold hover:bg-primary hover:shadow-glass transition-all"
          >
            {i18n.language === 'ru' ? 'ДЯ' : 'DY'}
          </Link>
          
          {/* Desktop Navigation - glass pill container */}
          <nav className="hidden lg:flex items-center gap-2 p-1.5 rounded-2xl bg-muted/30 backdrop-blur-xl border border-border/20">
            {mainLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`px-4 py-2 text-sm font-medium rounded-xl transition-all ${
                  location.pathname === link.href
                    ? "bg-primary text-primary-foreground shadow-glass" 
                    : "text-foreground hover:bg-background/50 hover:backdrop-blur-sm"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Secondary Navigation - Cases & Blog */}
          <nav className="hidden lg:flex items-center gap-4">
            {secondaryLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`text-xs font-bold tracking-wider transition-all ${
                  location.pathname === link.href
                    ? "text-primary" 
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Controls */}
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              title={theme === "light" ? (i18n.language === 'ru' ? "Тёмная тема" : "Dark Mode") : (i18n.language === 'ru' ? "Светлая тема" : "Light Mode")}
              className="rounded-xl"
            >
              {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleLanguage}
              title={i18n.language === 'ru' ? 'EN' : 'RU'}
              className="rounded-xl"
            >
              <Globe className="h-4 w-4" />
            </Button>

            {/* Mobile Navigation */}
            <Sheet>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="icon" className="rounded-xl relative group">
                  <div className="flex flex-col gap-1">
                    <span className="block w-5 h-0.5 bg-current transition-transform group-hover:translate-y-[-1px]" />
                    <span className="block w-5 h-0.5 bg-current" />
                    <span className="block w-5 h-0.5 bg-current transition-transform group-hover:translate-y-[1px]" />
                  </div>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-background/80 backdrop-blur-2xl border-l border-border/20">
                <nav className="flex flex-col gap-3 mt-8">
                  {[...mainLinks, ...secondaryLinks].map((link, index) => (
                    <Link
                      key={link.href}
                      to={link.href}
                      className={`mobile-menu-item px-4 py-3 text-sm font-medium rounded-xl backdrop-blur-sm border border-border/20 transition-all hover:translate-x-1 ${
                        location.pathname === link.href
                          ? "bg-primary text-primary-foreground shadow-glass" 
                          : "bg-background/50 text-foreground hover:bg-background/70"
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
