import { LocalLink as Link } from "@/components/LocalLink";
import { useLocation, useNavigate } from "react-router-dom";
import { Moon, Sun, Globe } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { useTranslation } from "react-i18next";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";

const Header = () => {
  const { theme, setTheme } = useTheme();
  const { t, i18n } = useTranslation();
  const location = useLocation();

  const navigate = useNavigate();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'ru' ? 'en' : 'ru';

    // Replace the current language prefix with the new one
    // We assume the URL matches /ru/something or /en/something
    const pathParts = location.pathname.split('/');
    if (pathParts[1] === 'ru' || pathParts[1] === 'en') {
      pathParts[1] = newLang;
    }

    const newPath = pathParts.join('/') + location.search + location.hash;
    navigate(newPath);
  };

  const mainLinks = [
    { href: "/", label: t('nav.home') },
    { href: "/businesses", label: isRu ? 'БИЗНЕСЫ' : 'BUSINESSES' },
    { href: "/cases", label: i18n.language === 'ru' ? 'КЕЙСЫ' : 'CASES' },
    { href: "/contact", label: i18n.language === 'ru' ? 'ОБО МНЕ' : 'ABOUT' },
    { href: "/support", label: t('nav.support') },
  ];

  const isRu = i18n.language === 'ru';

  return (
    <header className="sticky top-0 z-50 bg-card border-b-2 border-foreground">
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
                className={`text-sm font-medium transition-all relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-foreground after:transition-transform after:duration-300 ${location.pathname === link.href || (link.href === '/templates' && location.pathname.startsWith('/templates'))
                  ? "text-foreground after:scale-x-100"
                  : "text-muted-foreground hover:text-foreground after:scale-x-0 hover:after:scale-x-100"
                  }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Controls */}
          <div className="flex items-center gap-1 md:gap-2">

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              title={theme === "light" ? (i18n.language === 'ru' ? "Тёмная тема" : "Dark Mode") : (i18n.language === 'ru' ? "Светлая тема" : "Light Mode")}
              className="rounded-none border-2 border-transparent h-9 w-9"
            >
              {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={toggleLanguage}
              title={i18n.language === 'ru' ? 'EN' : 'RU'}
              className="rounded-none border-2 border-transparent h-9 w-9"
            >
              <Globe className="h-4 w-4" />
            </Button>

            {/* Mobile Navigation */}
            <Sheet>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="icon" className="rounded-none border-2 border-transparent relative group h-9 w-9">
                  <div className="flex flex-col gap-1">
                    <span className="block w-4 h-[1.5px] bg-current" />
                    <span className="block w-4 h-[1.5px] bg-current" />
                    <span className="block w-4 h-[1.5px] bg-current" />
                  </div>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-card border-l-2 border-foreground">
                <nav className="flex flex-col gap-2 mt-8">
                  {mainLinks.map((link, index) => (
                    <Link
                      key={link.href}
                      to={link.href}
                      className={`mobile-menu-item px-4 py-3 text-sm font-bold border-2 border-foreground shadow-[2px_2px_0px_0px_currentColor] rounded-none transition-all ${location.pathname === link.href
                        ? "bg-pastel-yellow text-foreground"
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
