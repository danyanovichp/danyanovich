import { LocalLink as Link } from "@/components/LocalLink";
import { LinkProps, useLocation } from "react-router-dom";
import { useTranslation } from 'react-i18next';

interface LocalLinkProps extends Omit<LinkProps, 'to'> {
  to: string;
}

/**
 * A wrapper around react-router-dom's Link that automatically 
 * prepends the current language prefix to absolute paths.
 * 
 * E.g., if language is 'en' and to='/cases', the actual link will be '/en/cases'.
 */
export const LocalLink = ({ to, children, ...props }: LocalLinkProps) => {
  const { i18n } = useTranslation();
  const lang = i18n.language === 'en' ? 'en' : 'ru'; // Validate to ensure only supported langs

  // If it's an absolute path that doesn't already start with our language prefixes
  let localizedTo = to;
  if (to.startsWith('/')) {
    // Check if it already has a lang prefix to avoid double prefixing (/ru/ru/cases)
    if (!to.startsWith('/ru/') && !to.startsWith('/en/') && to !== '/ru' && to !== '/en') {
      localizedTo = `/${lang}${to === '/' ? '' : to}`;
    }
  }

  return (
    <Link to={localizedTo} {...props}>
      {children}
    </Link>
  );
};

export default LocalLink;
