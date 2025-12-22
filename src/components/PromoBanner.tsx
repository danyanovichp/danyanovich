import { useState, useEffect } from 'react';
import { X, Sparkles } from 'lucide-react';
import { Button } from './ui/button';
import { useTranslation } from 'react-i18next';

interface PromoBannerProps {
  discount: number;
  endsAt: string;
  templateName: string;
  link: string;
}

const PromoBanner = ({ discount, endsAt, templateName, link }: PromoBannerProps) => {
  const { i18n } = useTranslation();
  const [isVisible, setIsVisible] = useState(true);
  const [timeLeft, setTimeLeft] = useState<{ days: number; hours: number; minutes: number; seconds: number } | null>(null);

  const storageKey = `promo-banner-${templateName}-closed`;

  useEffect(() => {
    const isClosed = localStorage.getItem(storageKey);
    if (isClosed) {
      setIsVisible(false);
    }
  }, [storageKey]);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const endDate = new Date(endsAt);
      const now = new Date();
      const difference = endDate.getTime() - now.getTime();

      if (difference <= 0) {
        setTimeLeft(null);
        return;
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      });
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [endsAt]);

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem(storageKey, 'true');
  };

  if (!isVisible || !timeLeft) return null;

  return (
    <div className="relative bg-gradient-to-r from-primary/90 to-primary/70 text-primary-foreground py-3 px-4">
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-center sm:text-left">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5" />
          <span className="font-bold">
            -{discount}% {i18n.language === 'ru' ? 'на' : 'off'} {templateName}
          </span>
        </div>
        
        <div className="flex items-center gap-2 text-sm">
          <span>{i18n.language === 'ru' ? 'Осталось:' : 'Ends in:'}</span>
          <div className="flex gap-1 font-mono font-bold">
            {timeLeft.days > 0 && (
              <span className="bg-background/20 rounded px-2 py-0.5">
                {timeLeft.days}{i18n.language === 'ru' ? 'д' : 'd'}
              </span>
            )}
            <span className="bg-background/20 rounded px-2 py-0.5">
              {String(timeLeft.hours).padStart(2, '0')}
            </span>
            <span>:</span>
            <span className="bg-background/20 rounded px-2 py-0.5">
              {String(timeLeft.minutes).padStart(2, '0')}
            </span>
            <span>:</span>
            <span className="bg-background/20 rounded px-2 py-0.5">
              {String(timeLeft.seconds).padStart(2, '0')}
            </span>
          </div>
        </div>

        <a href={link} target="_blank" rel="noopener noreferrer">
          <Button size="sm" variant="secondary" className="font-bold">
            {i18n.language === 'ru' ? 'Получить скидку' : 'Get Discount'}
          </Button>
        </a>
      </div>

      <button
        onClick={handleClose}
        className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-background/20 rounded transition-colors"
        aria-label="Close banner"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
};

export default PromoBanner;
