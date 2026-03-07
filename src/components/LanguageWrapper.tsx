import { useEffect } from 'react';
import { useParams, Navigate, Outlet, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const PREFERRED_LANG_KEY = 'preferred_language';

export const LanguageWrapper = () => {
  const { lang } = useParams<{ lang: string }>();
  const { i18n } = useTranslation();
  const location = useLocation();

  // Validate language
  if (lang !== 'ru' && lang !== 'en') {
    // If not valid, redirect to root which will handle finding the right language
    return <Navigate to="/" replace state={{ from: location.pathname }} />;
  }

  // Effect to sync URL language with i18next and save preference
  useEffect(() => {
    if (lang && i18n.language !== lang) {
      i18n.changeLanguage(lang);
      localStorage.setItem(PREFERRED_LANG_KEY, lang);
    }
  }, [lang, i18n]);

  // Don't render outlet until language is synced to avoid flashes of wrong language
  if (i18n.language !== lang) {
    return null; // Or a loading spinner
  }

  return <Outlet />;
};

export default LanguageWrapper;
