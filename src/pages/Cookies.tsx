import { useTranslation } from "react-i18next";
import SEO, { getBreadcrumbSchema } from "@/components/SEO";
import { SITE_URL } from "@/seo/site";

const Cookies = () => {
  const { i18n } = useTranslation();
  const isRu = i18n.language === 'ru';

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: isRu ? 'Главная' : 'Home', url: SITE_URL },
    { name: isRu ? 'Политика cookies' : 'Cookie Policy', url: `${SITE_URL}/cookies` },
  ]);

  const handleChangePreferences = () => {
    localStorage.removeItem('cookieConsent');
    window.location.reload();
  };

  return (
    <div className="flex flex-col min-h-screen">
      <SEO
        titleRu="Политика cookies | Дэн Янович"
        titleEn="Cookie Policy | Dan Yanovich"
        descriptionRu="Политика использования cookies на сайте danyanovich.site."
        descriptionEn="Cookie policy for danyanovich.site website."
        url="/cookies"
        structuredData={[breadcrumbSchema]}
      />

      <section className="py-16 md:py-20 bg-pastel-mint border-b-2 border-foreground flex-1">
        <div className="container">
          <div className="max-w-3xl mx-auto prose dark:prose-invert bg-card border-4 border-foreground shadow-[12px_12px_0px_0px_currentColor] p-8 md:p-12 mb-12">
            <h1 className="font-display uppercase tracking-wider">{isRu ? 'Политика cookies' : 'Cookie Policy'}</h1>
            <p className="text-muted-foreground">
              {isRu ? 'Последнее обновление: 27 января 2026' : 'Last updated: January 27, 2026'}
            </p>

            {isRu ? (
              <>
                <h2>Что такое cookies?</h2>
                <p>
                  Cookies — это небольшие текстовые файлы, которые сохраняются на вашем устройстве
                  при посещении веб-сайта. Они помогают сайту запоминать ваши предпочтения и
                  улучшать пользовательский опыт.
                </p>

                <h2>Какие cookies мы используем</h2>

                <h3>Необходимые cookies</h3>
                <p>
                  Эти cookies необходимы для работы сайта. Они позволяют запоминать ваши
                  настройки (например, выбранный язык или тему оформления).
                </p>
                <ul>
                  <li><strong>theme</strong> — сохраняет выбранную тему (светлая/тёмная)</li>
                  <li><strong>i18nextLng</strong> — сохраняет выбранный язык</li>
                  <li><strong>cookieConsent</strong> — сохраняет ваше согласие на использование cookies</li>
                </ul>

                <h3>Аналитические cookies</h3>
                <p>
                  Мы используем сервисы аналитики для понимания того, как посетители
                  используют наш сайт. Это помогает нам улучшать контент и функциональность.
                </p>
                <ul>
                  <li><strong>Yandex Metrika</strong> — анализ посещаемости и поведения пользователей</li>
                  <li><strong>Google Analytics</strong> — анализ посещаемости и источников трафика</li>
                </ul>

                <h2>Управление cookies</h2>
                <p>
                  Вы можете управлять cookies через настройки вашего браузера:
                </p>
                <ul>
                  <li>Просматривать сохранённые cookies</li>
                  <li>Удалять отдельные cookies или все сразу</li>
                  <li>Блокировать cookies от определённых сайтов</li>
                  <li>Блокировать все cookies (это может повлиять на работу сайта)</li>
                </ul>

                <h2>Согласие на cookies</h2>
                <p>
                  При первом посещении сайта вы увидите баннер с запросом согласия на
                  использование cookies. Вы можете принять или отклонить использование
                  аналитических cookies.
                </p>

                <h2>Изменения политики</h2>
                <p>
                  Мы можем обновлять данную политику. Актуальная версия всегда доступна
                  на этой странице.
                </p>

                <h2>Контакты</h2>
                <p>
                  Если у вас есть вопросы о cookies, свяжитесь со мной: {' '}
                  <a href="https://t.me/danyanovichp" target="_blank" rel="noopener noreferrer">@danyanovichp</a>
                </p>
              </>
            ) : (
              <>
                <h2>What are cookies?</h2>
                <p>
                  Cookies are small text files that are saved on your device when you visit
                  a website. They help the site remember your preferences and improve user experience.
                </p>

                <h2>What cookies we use</h2>

                <h3>Necessary cookies</h3>
                <p>
                  These cookies are necessary for the website to function. They allow us to
                  remember your settings (e.g., selected language or theme).
                </p>
                <ul>
                  <li><strong>theme</strong> — saves selected theme (light/dark)</li>
                  <li><strong>i18nextLng</strong> — saves selected language</li>
                  <li><strong>cookieConsent</strong> — saves your consent to use cookies</li>
                </ul>

                <h3>Analytics cookies</h3>
                <p>
                  We use analytics services to understand how visitors use our website.
                  This helps us improve content and functionality.
                </p>
                <ul>
                  <li><strong>Yandex Metrika</strong> — traffic and user behavior analysis</li>
                  <li><strong>Google Analytics</strong> — traffic and source analysis</li>
                </ul>

                <h2>Managing cookies</h2>
                <p>
                  You can manage cookies through your browser settings:
                </p>
                <ul>
                  <li>View saved cookies</li>
                  <li>Delete individual cookies or all at once</li>
                  <li>Block cookies from specific sites</li>
                  <li>Block all cookies (this may affect site functionality)</li>
                </ul>

                <h2>Cookie consent</h2>
                <p>
                  On your first visit, you will see a banner requesting consent to use cookies.
                  You can accept or decline the use of analytics cookies.
                </p>

                <h2>Policy changes</h2>
                <p>
                  We may update this policy. The current version is always available on this page.
                </p>

                <h2>Contact</h2>
                <p>
                  If you have questions about cookies, contact me: {' '}
                  <a href="https://t.me/danyanovichp" target="_blank" rel="noopener noreferrer">@danyanovichp</a>
                </p>
              </>
            )}

            <div className="mt-10 pt-8 border-t-2 border-foreground">
              <button
                onClick={handleChangePreferences}
                className="bg-pastel-yellow text-black border-2 border-foreground shadow-[4px_4px_0px_0px_currentColor] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_currentColor] transition-all uppercase font-bold tracking-wider px-6 py-3 text-sm"
              >
                {isRu ? 'Изменить настройки cookies' : 'Change cookie preferences'}
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Cookies;
