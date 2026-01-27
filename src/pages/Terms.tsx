import { useTranslation } from "react-i18next";
import SEO, { getBreadcrumbSchema } from "@/components/SEO";

const Terms = () => {
  const { i18n } = useTranslation();
  const isRu = i18n.language === 'ru';

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: isRu ? 'Главная' : 'Home', url: 'https://danyanovich.com' },
    { name: isRu ? 'Пользовательское соглашение' : 'Terms of Service', url: 'https://danyanovich.com/terms' },
  ]);

  return (
    <div className="flex flex-col min-h-screen">
      <SEO 
        titleRu="Пользовательское соглашение | Дэн Янович"
        titleEn="Terms of Service | Dan Yanovich"
        descriptionRu="Пользовательское соглашение сайта danyanovich.com. Условия использования сервисов и продуктов."
        descriptionEn="Terms of service for danyanovich.com. Conditions for using services and products."
        url="https://danyanovich.com/terms"
        structuredData={[breadcrumbSchema]}
      />

      <section className="py-16 md:py-20">
        <div className="container">
          <div className="max-w-3xl mx-auto prose dark:prose-invert">
            <h1>{isRu ? 'Пользовательское соглашение' : 'Terms of Service'}</h1>
            <p className="text-muted-foreground">
              {isRu ? 'Последнее обновление: 27 января 2026' : 'Last updated: January 27, 2026'}
            </p>

            {isRu ? (
              <>
                <h2>1. Общие положения</h2>
                <p>
                  Настоящее Пользовательское соглашение (далее — «Соглашение») регулирует отношения 
                  между владельцем сайта danyanovich.com (далее — «Продавец») и пользователем 
                  (далее — «Покупатель»).
                </p>

                <h2>2. Предмет соглашения</h2>
                <p>
                  Продавец предоставляет Покупателю доступ к цифровым продуктам — шаблонам Notion, 
                  курсам и другим материалам, представленным на Сайте.
                </p>

                <h2>3. Условия покупки</h2>
                <ul>
                  <li>Все цены указаны в валюте, отображаемой на странице продукта</li>
                  <li>После оплаты Покупатель получает ссылку для доступа к продукту</li>
                  <li>Доступ к продукту предоставляется бессрочно</li>
                  <li>Один заказ = одна личная лицензия</li>
                </ul>

                <h2>4. Возврат средств</h2>
                <p>
                  Возврат средств возможен в течение 30 дней с момента покупки, если продукт 
                  не соответствует описанию или имеет технические дефекты.
                </p>
                <p>
                  Для оформления возврата свяжитесь со мной через Telegram: @danyanovichp
                </p>

                <h2>5. Интеллектуальная собственность</h2>
                <ul>
                  <li>Все продукты защищены авторским правом</li>
                  <li>Покупатель получает право на личное использование</li>
                  <li>Запрещено: перепродажа, распространение, копирование для третьих лиц</li>
                  <li>Разрешено: модификация для личных нужд</li>
                </ul>

                <h2>6. Ответственность</h2>
                <p>
                  Продавец не несёт ответственности за косвенные убытки, возникшие в результате 
                  использования или невозможности использования продуктов.
                </p>
                <p>
                  Продавец не гарантирует, что продукты подойдут для конкретных целей Покупателя.
                </p>

                <h2>7. Техническая поддержка</h2>
                <p>
                  Продавец предоставляет техническую поддержку по вопросам использования продуктов 
                  через Telegram. Время ответа — до 24 часов в рабочие дни.
                </p>

                <h2>8. Обновления продуктов</h2>
                <p>
                  Покупатель получает доступ ко всем будущим обновлениям приобретённого продукта 
                  без дополнительной оплаты.
                </p>

                <h2>9. Изменение условий</h2>
                <p>
                  Продавец оставляет за собой право изменять условия данного Соглашения. 
                  Актуальная версия всегда доступна на этой странице.
                </p>

                <h2>10. Контактная информация</h2>
                <p>
                  Telegram: <a href="https://t.me/danyanovichp" target="_blank" rel="noopener noreferrer">@danyanovichp</a>
                </p>
              </>
            ) : (
              <>
                <h2>1. General Provisions</h2>
                <p>
                  This Terms of Service (hereinafter — "Agreement") governs the relationship 
                  between the owner of danyanovich.com (hereinafter — "Seller") and the user 
                  (hereinafter — "Buyer").
                </p>

                <h2>2. Subject of Agreement</h2>
                <p>
                  The Seller provides the Buyer with access to digital products — Notion templates, 
                  courses, and other materials presented on the Website.
                </p>

                <h2>3. Purchase Terms</h2>
                <ul>
                  <li>All prices are shown in the currency displayed on the product page</li>
                  <li>After payment, the Buyer receives a link to access the product</li>
                  <li>Access to the product is provided indefinitely</li>
                  <li>One order = one personal license</li>
                </ul>

                <h2>4. Refund Policy</h2>
                <p>
                  Refunds are available within 30 days of purchase if the product does not 
                  match the description or has technical defects.
                </p>
                <p>
                  To request a refund, contact me via Telegram: @danyanovichp
                </p>

                <h2>5. Intellectual Property</h2>
                <ul>
                  <li>All products are protected by copyright</li>
                  <li>The Buyer receives the right to personal use</li>
                  <li>Prohibited: resale, distribution, copying for third parties</li>
                  <li>Allowed: modification for personal needs</li>
                </ul>

                <h2>6. Liability</h2>
                <p>
                  The Seller is not liable for indirect damages arising from the use or 
                  inability to use the products.
                </p>
                <p>
                  The Seller does not guarantee that products will be suitable for the Buyer's specific purposes.
                </p>

                <h2>7. Technical Support</h2>
                <p>
                  The Seller provides technical support for product usage questions 
                  via Telegram. Response time — up to 24 hours on business days.
                </p>

                <h2>8. Product Updates</h2>
                <p>
                  The Buyer receives access to all future updates of the purchased product 
                  at no additional cost.
                </p>

                <h2>9. Changes to Terms</h2>
                <p>
                  The Seller reserves the right to change the terms of this Agreement. 
                  The current version is always available on this page.
                </p>

                <h2>10. Contact Information</h2>
                <p>
                  Telegram: <a href="https://t.me/danyanovichp" target="_blank" rel="noopener noreferrer">@danyanovichp</a>
                </p>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Terms;
