import { Link, useLocation } from "react-router-dom";
import { Moon, Sun, Globe, Menu } from "lucide-react";
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

  const navLinks = [
    { href: "/", label: t('nav.home') },
    { href: "/portfolio", label: t('nav.portfolio') },
    { href: "/templates", label: t('nav.templates') },
    { href: "/courses", label: t('nav.courses') },
    { href: "/ai-prompts", label: t('nav.aiPrompts') },
    { href: "/packages", label: t('nav.packages') },
    { href: "/contact", label: t('nav.contact') },
  ];

  return (
    <header className="border-b-4 border-border bg-background sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-sm font-bold pixel-border px-3 py-2 bg-primary text-primary-foreground">
            [ДЯ]
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`px-3 py-2 text-xs font-bold uppercase pixel-border transition-all ${
                  location.pathname === link.href
                    ? "bg-primary text-primary-foreground" 
                    : "bg-background text-foreground hover:translate-x-[-2px] hover:translate-y-[-2px]"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              title={theme === "light" ? "DARK" : "LIGHT"}
            >
              {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleLanguage}
              title={i18n.language === 'ru' ? 'EN' : 'RU'}
            >
              <Globe className="h-4 w-4" />
            </Button>

            {/* Mobile Navigation */}
            <Sheet>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="icon" className="relative group">
                  <div className="flex flex-col gap-1">
                    <span className="block w-5 h-0.5 bg-current transition-transform group-hover:translate-y-[-1px]" />
                    <span className="block w-5 h-0.5 bg-current" />
                    <span className="block w-5 h-0.5 bg-current transition-transform group-hover:translate-y-[1px]" />
                  </div>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="pixel-border bg-background/95 backdrop-blur-sm">
                {/* Pixel grid overlay */}
                <div className="absolute inset-0 opacity-5 pointer-events-none" style={{
                  backgroundImage: `
                    linear-gradient(to right, hsl(var(--foreground)) 1px, transparent 1px),
                    linear-gradient(to bottom, hsl(var(--foreground)) 1px, transparent 1px)
                  `,
                  backgroundSize: '8px 8px'
                }} />
                
                <nav className="flex flex-col gap-3 mt-8 relative z-10">
                  {navLinks.map((link, index) => (
                    <Link
                      key={link.href}
                      to={link.href}
                      className={`mobile-menu-item px-4 py-3 text-xs font-bold uppercase pixel-border transition-all hover:translate-x-1 ${
                        location.pathname === link.href
                          ? "bg-primary text-primary-foreground animate-pixel-pulse" 
                          : "bg-background text-foreground hover:bg-accent"
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
