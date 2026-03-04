import { useTranslation } from "react-i18next";
import SEO, { getBreadcrumbSchema } from "@/components/SEO";

const Privacy = () => {
  const { i18n } = useTranslation();
  const isRu = i18n.language === 'ru';

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: isRu ? 'Главная' : 'Home', url: 'https://danyanovich.com' },
    { name: isRu ? 'Политика конфиденциальности' : 'Privacy Policy', url: 'https://danyanovich.com/privacy' },
  ]);

  return (
    <div className="flex flex-col min-h-screen">
      <SEO
        titleRu="Политика конфиденциальности | Дэн Янович"
        titleEn="Privacy Policy | Dan Yanovich"
        descriptionRu="Политика конфиденциальности сайта danyanovich.com. Информация о сборе и обработке персональных данных."
        descriptionEn="Privacy policy of danyanovich.com. Information about collection and processing of personal data."
        url="https://danyanovich.com/privacy"
        structuredData={[breadcrumbSchema]}
      />

      <section className="py-16 md:py-20 bg-pastel-lavender border-b-2 border-foreground flex-1">
        <div className="container">
          <div className="max-w-3xl mx-auto prose dark:prose-invert bg-card border-4 border-foreground shadow-[12px_12px_0px_0px_currentColor] p-8 md:p-12 mb-12">
            <h1 className="font-display uppercase tracking-wider">{isRu ? 'Политика конфиденциальности' : 'Privacy Policy'}</h1>
            <p className="text-muted-foreground">
              {isRu ? 'Последнее обновление: 27 января 2026' : 'Last updated: January 27, 2026'}
            </p>

            {isRu ? (
              <>
                <h2>1. Общие положения</h2>
                <p>
                  Настоящая Политика конфиденциальности определяет порядок обработки и защиты
                  персональных данных пользователей сайта danyanovich.com (далее — «Сайт»).
                </p>
                <p>
                  Используя Сайт, вы соглашаетесь с условиями данной Политики конфиденциальности.
                </p>

                <h2>2. Какие данные мы собираем</h2>
                <ul>
                  <li><strong>Контактные данные:</strong> имя, адрес электронной почты (при подписке на рассылку или оставлении отзыва)</li>
                  <li><strong>Данные об использовании:</strong> информация о посещённых страницах, времени посещения</li>
                  <li><strong>Технические данные:</strong> IP-адрес, тип браузера, операционная система</li>
                </ul>

                <h2>3. Цели обработки данных</h2>
                <p>Мы используем собранные данные для:</p>
                <ul>
                  <li>Отправки информационных рассылок (с вашего согласия)</li>
                  <li>Улучшения работы Сайта и пользовательского опыта</li>
                  <li>Анализа посещаемости и поведения пользователей</li>
                  <li>Обработки отзывов и обратной связи</li>
                </ul>

                <h2>4. Защита данных</h2>
                <p>
                  Мы принимаем разумные меры для защиты ваших персональных данных от
                  несанкционированного доступа, изменения, раскрытия или уничтожения.
                </p>

                <h2>5. Передача данных третьим лицам</h2>
                <p>
                  Мы не продаём и не передаём ваши персональные данные третьим лицам,
                  за исключением случаев, предусмотренных законодательством.
                </p>
                <p>Мы используем следующие сервисы:</p>
                <ul>
                  <li>Yandex Metrika — для анализа посещаемости</li>
                  <li>Google Analytics — для анализа посещаемости</li>
                  <li>Gumroad, Boosty — для обработки платежей</li>
                </ul>

                <h2>6. Ваши права</h2>
                <p>Вы имеете право:</p>
                <ul>
                  <li>Запросить информацию о хранящихся у нас данных</li>
                  <li>Потребовать исправления или удаления ваших данных</li>
                  <li>Отозвать согласие на обработку данных</li>
                  <li>Отписаться от рассылки в любой момент</li>
                </ul>

                <h2>7. Контактная информация</h2>
                <p>
                  По вопросам, связанным с обработкой персональных данных, вы можете связаться
                  со мной через Telegram: <a href="https://t.me/danyanovichp" target="_blank" rel="noopener noreferrer">@danyanovichp</a>
                </p>

                <h2>8. Изменения в политике</h2>
                <p>
                  Мы оставляем за собой право изменять данную Политику конфиденциальности.
                  Актуальная версия всегда доступна на этой странице.
                </p>
              </>
            ) : (
              <>
                <h2>1. General Provisions</h2>
                <p>
                  This Privacy Policy defines the procedure for processing and protecting
                  personal data of users of danyanovich.com (hereinafter — "Website").
                </p>
                <p>
                  By using the Website, you agree to the terms of this Privacy Policy.
                </p>

                <h2>2. What Data We Collect</h2>
                <ul>
                  <li><strong>Contact data:</strong> name, email address (when subscribing to newsletter or leaving reviews)</li>
                  <li><strong>Usage data:</strong> information about visited pages, visit time</li>
                  <li><strong>Technical data:</strong> IP address, browser type, operating system</li>
                </ul>

                <h2>3. Purposes of Data Processing</h2>
                <p>We use collected data for:</p>
                <ul>
                  <li>Sending newsletters (with your consent)</li>
                  <li>Improving Website operation and user experience</li>
                  <li>Analyzing traffic and user behavior</li>
                  <li>Processing reviews and feedback</li>
                </ul>

                <h2>4. Data Protection</h2>
                <p>
                  We take reasonable measures to protect your personal data from
                  unauthorized access, modification, disclosure, or destruction.
                </p>

                <h2>5. Data Transfer to Third Parties</h2>
                <p>
                  We do not sell or transfer your personal data to third parties,
                  except as required by law.
                </p>
                <p>We use the following services:</p>
                <ul>
                  <li>Yandex Metrika — for traffic analysis</li>
                  <li>Google Analytics — for traffic analysis</li>
                  <li>Gumroad, Boosty — for payment processing</li>
                </ul>

                <h2>6. Your Rights</h2>
                <p>You have the right to:</p>
                <ul>
                  <li>Request information about data we store</li>
                  <li>Request correction or deletion of your data</li>
                  <li>Withdraw consent for data processing</li>
                  <li>Unsubscribe from newsletters at any time</li>
                </ul>

                <h2>7. Contact Information</h2>
                <p>
                  For questions regarding personal data processing, you can contact
                  me via Telegram: <a href="https://t.me/danyanovichp" target="_blank" rel="noopener noreferrer">@danyanovichp</a>
                </p>

                <h2>8. Policy Changes</h2>
                <p>
                  We reserve the right to change this Privacy Policy.
                  The current version is always available on this page.
                </p>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Privacy;
