import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Замените на ваш ID счётчика Яндекс.Метрики
const YANDEX_METRIKA_ID = 'XXXXXXXXX';

declare global {
  interface Window {
    ym: (id: string, action: string, url?: string) => void;
  }
}

const YandexMetrika = () => {
  const location = useLocation();

  useEffect(() => {
    // Не инициализировать, если ID не установлен
    if (YANDEX_METRIKA_ID === 'XXXXXXXXX') {
      console.warn('Яндекс.Метрика: ID счётчика не установлен');
      return;
    }

    // Инициализация Яндекс.Метрики
    const script = document.createElement('script');
    script.innerHTML = `
      (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
      m[i].l=1*new Date();
      for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
      k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
      (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

      ym(${YANDEX_METRIKA_ID}, "init", {
        clickmap:true,
        trackLinks:true,
        accurateTrackBounce:true,
        webvisor:true,
        trackHash:true
      });
    `;
    document.head.appendChild(script);

    // Noscript fallback
    const noscript = document.createElement('noscript');
    noscript.innerHTML = `<div><img src="https://mc.yandex.ru/watch/${YANDEX_METRIKA_ID}" style="position:absolute; left:-9999px;" alt="" /></div>`;
    document.body.appendChild(noscript);

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
      if (noscript.parentNode) {
        noscript.parentNode.removeChild(noscript);
      }
    };
  }, []);

  // Отслеживание переходов между страницами
  useEffect(() => {
    if (YANDEX_METRIKA_ID !== 'XXXXXXXXX' && window.ym) {
      window.ym(YANDEX_METRIKA_ID, 'hit', location.pathname + location.search);
    }
  }, [location]);

  return null;
};

export default YandexMetrika;
