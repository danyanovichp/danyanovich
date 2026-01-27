export interface FaqTemplate {
  question_ru: string;
  question_en: string;
  answer_ru: string;
  answer_en: string;
}

export interface FaqCategory {
  id: string;
  name_ru: string;
  name_en: string;
  items: FaqTemplate[];
}

export const faqTemplates: FaqCategory[] = [
  {
    id: 'general',
    name_ru: 'Общие вопросы о шаблоне',
    name_en: 'General Questions',
    items: [
      {
        question_ru: 'Что я получу после покупки?',
        question_en: 'What will I receive after purchase?',
        answer_ru: 'После оплаты вы получите ссылку для дублирования шаблона в свой Notion аккаунт. Шаблон сразу появится в вашем рабочем пространстве.',
        answer_en: 'After payment, you will receive a link to duplicate the template to your Notion account. The template will immediately appear in your workspace.'
      },
      {
        question_ru: 'Нужен ли платный аккаунт Notion?',
        question_en: 'Do I need a paid Notion account?',
        answer_ru: 'Нет, бесплатного аккаунта Notion достаточно для использования шаблона. Все функции работают на бесплатном плане.',
        answer_en: 'No, a free Notion account is sufficient to use the template. All features work on the free plan.'
      },
      {
        question_ru: 'Можно ли использовать шаблон для команды?',
        question_en: 'Can I use the template for a team?',
        answer_ru: 'Да, вы можете поделиться шаблоном с членами вашей команды. Для командного использования рекомендую рассмотреть командную лицензию.',
        answer_en: 'Yes, you can share the template with your team members. For team use, I recommend considering a team license.'
      },
      {
        question_ru: 'Будут ли обновления шаблона?',
        question_en: 'Will there be template updates?',
        answer_ru: 'Да, я регулярно улучшаю шаблоны. Вы получите доступ ко всем будущим обновлениям бесплатно.',
        answer_en: 'Yes, I regularly improve templates. You will have access to all future updates for free.'
      },
      {
        question_ru: 'На каких языках доступен шаблон?',
        question_en: 'What languages is the template available in?',
        answer_ru: 'Шаблон доступен на русском и английском языках. Вы можете переключить язык в настройках шаблона.',
        answer_en: 'The template is available in Russian and English. You can switch the language in the template settings.'
      }
    ]
  },
  {
    id: 'payment',
    name_ru: 'Оплата и доставка',
    name_en: 'Payment & Delivery',
    items: [
      {
        question_ru: 'Какие способы оплаты доступны?',
        question_en: 'What payment methods are available?',
        answer_ru: 'Принимаю оплату через Gumroad (банковские карты, PayPal) и Boosty (для России и СНГ).',
        answer_en: 'I accept payment through Gumroad (credit cards, PayPal) and Boosty (for Russia and CIS).'
      },
      {
        question_ru: 'Как быстро я получу доступ?',
        question_en: 'How quickly will I get access?',
        answer_ru: 'Мгновенно! Ссылка на шаблон приходит сразу после оплаты на вашу электронную почту.',
        answer_en: 'Instantly! The template link arrives immediately after payment to your email.'
      },
      {
        question_ru: 'Можно ли вернуть деньги?',
        question_en: 'Can I get a refund?',
        answer_ru: 'Да, в течение 30 дней с момента покупки, если шаблон вам не подошёл. Напишите мне в Telegram.',
        answer_en: 'Yes, within 30 days of purchase if the template doesn\'t suit you. Contact me on Telegram.'
      },
      {
        question_ru: 'Есть ли скидки?',
        question_en: 'Are there any discounts?',
        answer_ru: 'Подпишитесь на рассылку — я отправляю эксклюзивные скидки подписчикам. Также бывают сезонные распродажи.',
        answer_en: 'Subscribe to the newsletter — I send exclusive discounts to subscribers. There are also seasonal sales.'
      }
    ]
  },
  {
    id: 'support',
    name_ru: 'Техническая поддержка',
    name_en: 'Technical Support',
    items: [
      {
        question_ru: 'Как связаться с поддержкой?',
        question_en: 'How can I contact support?',
        answer_ru: 'Напишите мне в Telegram @danyanovichp или на почту. Отвечаю в течение 24 часов.',
        answer_en: 'Contact me on Telegram @danyanovichp or by email. I respond within 24 hours.'
      },
      {
        question_ru: 'Что делать, если не пришла ссылка?',
        question_en: 'What if I didn\'t receive the link?',
        answer_ru: 'Проверьте папку "Спам". Если письма нет — напишите мне в Telegram с номером заказа, я отправлю ссылку повторно.',
        answer_en: 'Check your spam folder. If the email isn\'t there, contact me on Telegram with your order number, and I\'ll resend the link.'
      },
      {
        question_ru: 'Есть ли видео-инструкция?',
        question_en: 'Is there a video tutorial?',
        answer_ru: 'Да, к шаблону прилагается подробная видео-инструкция по настройке и использованию.',
        answer_en: 'Yes, the template includes a detailed video tutorial on setup and use.'
      }
    ]
  },
  {
    id: 'setup',
    name_ru: 'Настройка и использование',
    name_en: 'Setup & Usage',
    items: [
      {
        question_ru: 'Сложно ли настроить шаблон?',
        question_en: 'Is it difficult to set up the template?',
        answer_ru: 'Нет, шаблон готов к использованию сразу. Просто продублируйте его и начните работать. Есть пошаговая инструкция.',
        answer_en: 'No, the template is ready to use immediately. Just duplicate it and start working. There\'s a step-by-step guide.'
      },
      {
        question_ru: 'Можно ли изменять шаблон под себя?',
        question_en: 'Can I customize the template?',
        answer_ru: 'Конечно! Шаблон полностью редактируемый. Вы можете менять структуру, добавлять страницы и настраивать под свои нужды.',
        answer_en: 'Of course! The template is fully editable. You can change the structure, add pages, and customize it to your needs.'
      },
      {
        question_ru: 'Потеряю ли я данные при обновлении?',
        question_en: 'Will I lose data when updating?',
        answer_ru: 'Нет, ваши данные в безопасности. Обновления добавляются отдельно, и вы сами решаете, что перенести.',
        answer_en: 'No, your data is safe. Updates are added separately, and you decide what to transfer.'
      },
      {
        question_ru: 'Работает ли шаблон на мобильных устройствах?',
        question_en: 'Does the template work on mobile devices?',
        answer_ru: 'Да, шаблон полностью адаптирован для мобильных устройств через официальное приложение Notion.',
        answer_en: 'Yes, the template is fully optimized for mobile devices through the official Notion app.'
      }
    ]
  }
];
