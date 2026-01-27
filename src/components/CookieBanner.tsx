import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

const COOKIE_CONSENT_KEY = 'cookieConsent';

const CookieBanner = () => {
  const { i18n } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const isRu = i18n.language === 'ru';

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!consent) {
      // Small delay for better UX
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, 'accepted');
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, 'declined');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 animate-in slide-in-from-bottom-5 duration-300">
      <div className="container">
        <div className="relative bg-card border border-border rounded-xl p-4 md:p-6 shadow-lg max-w-2xl mx-auto md:mx-0">
          <button
            onClick={handleDecline}
            className="absolute top-2 right-2 p-1 rounded-md hover:bg-muted transition-colors"
            aria-label={isRu ? 'Закрыть' : 'Close'}
          >
            <X className="h-4 w-4 text-muted-foreground" />
          </button>
          
          <div className="pr-6">
            <h3 className="font-semibold text-sm mb-2">
              {isRu ? '🍪 Мы используем cookies' : '🍪 We use cookies'}
            </h3>
            <p className="text-xs text-muted-foreground mb-4">
              {isRu 
                ? 'Мы используем cookies для улучшения работы сайта и анализа посещаемости. ' 
                : 'We use cookies to improve website performance and analyze traffic. '}
              <Link to="/cookies" className="underline hover:text-foreground">
                {isRu ? 'Подробнее' : 'Learn more'}
              </Link>
            </p>
            
            <div className="flex flex-wrap gap-2">
              <Button size="sm" onClick={handleAccept} className="text-xs">
                {isRu ? 'Принять все' : 'Accept all'}
              </Button>
              <Button size="sm" variant="outline" onClick={handleDecline} className="text-xs">
                {isRu ? 'Только необходимые' : 'Necessary only'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;
