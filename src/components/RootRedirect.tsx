import { Navigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const PREFERRED_LANG_KEY = 'preferred_language';

export const RootRedirect = () => {
  const location = useLocation();
  const { i18n } = useTranslation();

  let targetLang = 'ru'; // Default fallback

  // 1. Check if we have a saved preference
  const savedLang = localStorage.getItem(PREFERRED_LANG_KEY);
  if (savedLang === 'ru' || savedLang === 'en') {
    targetLang = savedLang;
  } else {
    // 2. Fallback to browser language if we can detect it
    // i18next-browser-languagedetector might have already set it
    const detectedLang = i18n.language?.split('-')[0];
    if (detectedLang === 'ru' || detectedLang === 'en') {
      targetLang = detectedLang;
    } else if (navigator.language) {
      // Direct navigator check
      const navLang = navigator.language.split('-')[0];
      if (navLang === 'ru' || navLang === 'en') {
        targetLang = navLang;
      }
    }
  }

  // Construct the new path
  // If they came from somewhere else (like /cases directly), preserve that path
  const originalPath = location.pathname === '/' ? '' : location.pathname;
  
  // Create final destination - avoid double slashes
  const targetPath = `/${targetLang}${originalPath === '/' ? '' : originalPath}`;

  return <Navigate to={targetPath} replace />;
};

export default RootRedirect;
