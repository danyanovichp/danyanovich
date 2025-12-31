import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Замените на ваш Measurement ID от Google Analytics 4
const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX';

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
    dataLayer: unknown[];
  }
}

const GoogleAnalytics = () => {
  const location = useLocation();

  useEffect(() => {
    // Не инициализировать, если ID не установлен
    if (GA_MEASUREMENT_ID === 'G-XXXXXXXXXX') {
      console.warn('Google Analytics: Measurement ID не установлен');
      return;
    }

    // Загрузка gtag.js
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(script);

    // Инициализация dataLayer и gtag
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag(...args: unknown[]) {
      window.dataLayer.push(args);
    };
    window.gtag('js', new Date());
    window.gtag('config', GA_MEASUREMENT_ID, {
      send_page_view: false, // Отключаем автоматический page_view, отправляем вручную
    });

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  // Отслеживание переходов между страницами
  useEffect(() => {
    if (GA_MEASUREMENT_ID !== 'G-XXXXXXXXXX' && window.gtag) {
      window.gtag('event', 'page_view', {
        page_path: location.pathname + location.search,
        page_title: document.title,
      });
    }
  }, [location]);

  return null;
};

export default GoogleAnalytics;
