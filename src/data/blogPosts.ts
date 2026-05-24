export interface BlogPost {
    id: number;
    slug: string;
    titleRu: string;
    titleEn: string;
    excerptRu: string;
    excerptEn: string;
    date: string;
    publishedAt: string;
    categoryRu: string;
    categoryEn: string;
    colorClass: string;
    readingTimeRu: string;
    readingTimeEn: string;
    contentRu: string[];
    contentEn: string[];
}

export const blogPosts: BlogPost[] = [
    {
        id: 1,
        slug: "ai-agents-small-business",
        titleRu: "5 способов использовать AI агентов в малом бизнесе",
        titleEn: "5 Ways to Use AI Agents in Small Business",
        excerptRu: "Разбираем реальные кейсы применения языковых моделей для автоматизации рутинных задач: от обработки Email до генерации отчетов.",
        excerptEn: "Analyzing real use cases of language models for automating routine tasks: from Email processing to report generation.",
        date: "24 Окт 2025",
        publishedAt: "2025-10-24",
        categoryRu: "AI Автоматизация",
        categoryEn: "AI Automation",
        colorClass: "bg-pastel-pink",
        readingTimeRu: "6 мин",
        readingTimeEn: "6 min",
        contentRu: [
            "AI-агенты особенно полезны там, где сотрудник каждый день повторяет один и тот же цикл: получил запрос, собрал данные, подготовил ответ, обновил таблицу или CRM. Малый бизнес страдает от этого сильнее всего, потому что команда маленькая, а задач много.",
            "Первый сценарий — обработка входящих сообщений. Агент может сортировать email и сообщения по категориям, определять приоритет, вытаскивать дедлайны и готовить черновик ответа. Это не заменяет человека, но снимает самый тяжёлый слой рутины.",
            "Второй сценарий — отчёты и сводки. Вместо ручного сбора информации из ClickUp, Notion, CRM и чатов агент может забирать данные по расписанию и собирать понятный weekly report для руководителя. Это экономит время и делает контроль регулярным.",
            "Третий сценарий — квалификация лидов. Агент может анализировать входящий запрос, определять уровень готовности клиента, подбирать следующий шаг и автоматически создавать задачу для менеджера. Это помогает не терять тёплые заявки.",
            "Четвёртый сценарий — внутренняя база знаний. AI-агент может отвечать на типовые вопросы команды по регламентам, шаблонам документов и процессам. Это особенно полезно, когда владелец бизнеса больше не хочет быть единственной точкой входа для всех ответов.",
            "Пятый сценарий — контроль дедлайнов и follow-up. Агент отслеживает задачи без обновлений, напоминает ответственным, собирает статус и передаёт руководителю отклонения. Это даёт простую управленческую систему без постоянного ручного контроля.",
            "Чтобы такие агенты реально работали, важно не начинать с абстрактного «сделаем AI». Лучше выбрать один повторяющийся процесс, где уже понятны вход, выход и критерий качества. Тогда автоматизация быстро окупается и не ломает команду."
        ],
        contentEn: [
            "AI agents are most useful where someone repeats the same daily loop: receive a request, gather data, draft a reply, update a CRM or spreadsheet. Small businesses feel this pain more strongly because teams are small and context-switching is expensive.",
            "The first use case is inbound communication. An agent can sort emails and messages by category, assign priority, extract deadlines, and prepare a response draft. It does not replace a person, but it removes the heaviest layer of routine work.",
            "The second use case is reporting. Instead of manually collecting information from ClickUp, Notion, CRM systems, and chats, an agent can pull data on a schedule and assemble a readable weekly report for the manager. That saves time and makes visibility consistent.",
            "The third use case is lead qualification. An agent can analyze an incoming request, estimate intent, suggest the next step, and create a task for the sales manager. This helps prevent warm leads from getting lost between channels.",
            "The fourth use case is internal knowledge support. An AI agent can answer common team questions about SOPs, document templates, and workflows. This becomes especially useful when the founder no longer wants to be the single source of answers for everything.",
            "The fifth use case is deadline control and follow-up. The agent tracks stalled tasks, pings owners, collects updates, and escalates risks to a manager. That creates a lightweight management system without constant manual monitoring.",
            "To make agents actually work, do not start with an abstract goal like \"let's add AI.\" Start with one repeatable process where inputs, outputs, and quality criteria are already clear. That is where automation pays off fastest."
        ],
    },
    {
        id: 2,
        slug: "how-i-started-vibecoding",
        titleRu: "Как я перестал писать код и начал заниматься Vibecoding",
        titleEn: "How I Stopped Writing Code and Started Vibecoding",
        excerptRu: "Почему будущее разработки за AI-ассистентами вроде Cursor и Lovable, и как это меняет профессию разработчика навсегда.",
        excerptEn: "Why the future of development lies with AI assistants like Cursor and Lovable, and how it changes the developer profession forever.",
        date: "12 Сен 2025",
        publishedAt: "2025-09-12",
        categoryRu: "Разработка",
        categoryEn: "Development",
        colorClass: "bg-pastel-blue",
        readingTimeRu: "5 мин",
        readingTimeEn: "5 min",
        contentRu: [
            "Я не перестал интересоваться разработкой. Я перестал считать, что ценность разработчика измеряется количеством строк кода, которые он набрал руками. Vibecoding для меня — это переход от ручного производства к управлению системой сборки продукта вместе с AI.",
            "Инструменты вроде Cursor, Lovable и современных LLM меняют саму роль человека. Мы всё меньше занимаемся механическим написанием компонентов и всё больше формулируем продуктовые ограничения, сценарии и архитектурные решения.",
            "Это не магия и не кнопка «сделать сайт». Хороший результат появляется только там, где человек умеет задавать контекст, быстро проверять гипотезы, замечать регрессии и удерживать структуру проекта. AI ускоряет сильного исполнителя, а не заменяет мышление.",
            "Самый заметный эффект — скорость итераций. То, на что раньше уходили дни: прототип, первый дизайн, интеграция формы, черновой dashboard, теперь можно собрать за часы. Это радикально меняет экономику небольших продуктов и клиентских задач.",
            "Но у этого подхода есть и требования. Нужно лучше понимать систему целиком: маршруты, данные, SEO, сборку, UX, безопасность. Когда код генерируется быстрее, растёт цена слабых решений. Поэтому vibecoding — это не упрощение профессии, а её смещение вверх по уровню абстракции.",
            "Для меня лучший режим — использовать AI как второго инженера: просить варианты, ускорять рутину, быстро тестировать гипотезы, но сохранять за собой архитектурные решения и финальную ответственность за качество."
        ],
        contentEn: [
            "I did not stop caring about software development. I stopped believing that a developer's value is measured by how many lines of code they type by hand. Vibecoding, to me, is the shift from manual production to steering product delivery together with AI.",
            "Tools like Cursor, Lovable, and modern LLMs are changing the role of the human builder. We spend less time writing repetitive components and more time defining constraints, scenarios, and architecture.",
            "This is not magic and it is not a one-click website button. Good outcomes appear only when a person can provide context, test ideas quickly, catch regressions, and preserve project structure. AI amplifies a strong operator; it does not replace thinking.",
            "The most visible benefit is iteration speed. Prototypes, first-pass UI, form integrations, and draft dashboards that used to take days can now be assembled in hours. That changes the economics of small products and client work.",
            "But the approach raises the bar in other areas. You need better system-level understanding: routing, data flow, SEO, build pipeline, UX, and security. When code is generated faster, weak decisions become more expensive. Vibecoding is not a simplification of the craft; it is a move to a higher layer of abstraction.",
            "The best mode for me is to use AI as a second engineer: ask for options, speed up routine, test hypotheses quickly, and still keep architecture decisions and final quality ownership on the human side."
        ],
    },
    {
        id: 3,
        slug: "notion-knowledge-base-architecture",
        titleRu: "Идеальная архитектура базы знаний в Notion",
        titleEn: "The Perfect Knowledge Base Architecture in Notion",
        excerptRu: "Делюсь своим 4-летним опытом создания корпоративных баз знаний: частые ошибки, правильная структура баз данных и система тегов.",
        excerptEn: "Sharing my 4 years of experience creating corporate knowledge bases: common mistakes, proper database structure, and tag system.",
        date: "05 Авг 2025",
        publishedAt: "2025-08-05",
        categoryRu: "Notion",
        categoryEn: "Notion",
        colorClass: "bg-pastel-yellow",
        readingTimeRu: "7 мин",
        readingTimeEn: "7 min",
        contentRu: [
            "Большинство корпоративных баз знаний в Notion ломаются не потому, что в Notion плохой редактор, а потому что структура собирается снизу вверх: сначала создают страницы, потом папки, потом пытаются добавить поиск и навигацию. В итоге получается красивый хаос.",
            "Рабочая архитектура начинается с типов контента. Обычно это регламенты, инструкции, решения, справочники и проектные заметки. У каждого типа свои свойства, жизненный цикл и уровень актуальности, поэтому складывать всё в одну таблицу редко полезно.",
            "Следующий слой — единые таксономии. Команда должна одинаково понимать теги отделов, процессов, продуктов и уровней доступа. Если теги возникают стихийно, поиск и фильтрация быстро перестают работать.",
            "Очень важен статус актуальности. У каждой заметки должен быть владелец, дата последней проверки и понятный статус: draft, active, archived. Без этого даже самая красивая база знаний постепенно превращается в кладбище устаревших документов.",
            "Я также советую отделять хранилище знаний от операционных баз. Knowledge base должна быть удобна для чтения и поддержки, а не для постоянной рабочей суеты. Когда туда же складывают задачи, CRM и meeting notes, навигация становится тяжелой.",
            "Идеальная база знаний — это не максимальное число страниц, а минимальное время до ответа. Если человек за 30 секунд не может найти нужный регламент, структура требует пересборки, как бы хорошо она ни выглядела визуально."
        ],
        contentEn: [
            "Most corporate knowledge bases in Notion fail not because the editor is weak, but because the structure is built from the bottom up: people create pages first, folders second, and only later try to add search and navigation. The result is organized-looking chaos.",
            "A durable architecture starts with content types. In practice, that usually means SOPs, playbooks, decisions, reference material, and project notes. Each type has different properties, a different lifecycle, and a different freshness requirement, so putting everything into one database rarely helps.",
            "The next layer is shared taxonomy. Teams need a consistent understanding of tags for departments, processes, products, and access levels. If tags appear organically without rules, search and filtering stop being useful very quickly.",
            "Freshness status matters a lot. Every note should have an owner, a last-reviewed date, and a simple status such as draft, active, or archived. Without that, even a visually clean knowledge base turns into a graveyard of outdated documents.",
            "I also recommend separating the knowledge base from operational databases. A knowledge base should be optimized for reading and maintenance, not daily workflow noise. Once you mix tasks, CRM records, and meeting notes into the same navigation layer, clarity drops fast.",
            "The ideal knowledge base is not the one with the most pages. It is the one that gets a teammate to the right answer in under 30 seconds. If that is not happening, the structure needs to be redesigned."
        ],
    },
    {
        id: 4,
        slug: "agency-automation-advantage",
        titleRu: "The Agency Automation Advantage: как мы автоматизировали агентство на 69 воркфлоу",
        titleEn: "The Agency Automation Advantage: 69 Workflows That Actually Work",
        excerptRu: "Как одно агентство восстановило $28K ежемесячного дохода, автоматизировав 80% операций с помощью n8n, Notion и AI.",
        excerptEn: "How one agency recovered $28K in monthly revenue by automating 80% of operations with n8n, Notion, and AI.",
        date: "15 Мар 2026",
        publishedAt: "2026-03-15",
        categoryRu: "Автоматизация",
        categoryEn: "Automation",
        colorClass: "bg-pastel-green",
        readingTimeRu: "8 мин",
        readingTimeEn: "8 min",
        contentRu: [
            "Большинство агентств теряют деньги не из-за низкого качества работы, а из-за операционной неэффективности. Лиды теряются между CRM и почтой, отчёты собираются вручную, контент публикуется без системы. Мы разобрали эту проблему на примере реального агентства и собрали 69 рабочих воркфлоу, которые закрывают все ключевые бреши.",
            "Первая и самая очевидная потеря — лидогенерация и follow-up. Агентство тратит в среднем 12 часов в неделю на ручное отслеживание лидов, отправку предложений и сбор статусов. Один настроенный n8n-воркфлоу может забирать лида из формы, создавать карточку в CRM, отправлять welcome-цепочку и назначать задачу менеджеру — без участия человека.",
            "Вторая зона — контент и социальные сети. 17 воркфлоу из нашей системы закрывают полный цикл: от сбора контент-идей до автоматического постинга в соцсети с A/B-тестированием заголовков. Это не про «публиковать чаще», это про публиковать осмысленно и без ручной рутины.",
            "Третья зона — маркетинговая аналитика. Вместо того чтобы каждую неделю вручную собирать данные из 5-6 источников, один воркфлоу собирает, агрегирует и отправляет дашборд в Telegram или Notion. Решение занимает один день настройки и экономит 5-7 часов еженедельно.",
            "Важный урок: автоматизация не работает как bolt-on решение. Нельзя накинуть AI-слой поверх хаотичных процессов и ожидать порядка. Сначала нужно навести порядок в процессах, стандартизировать входы и выходы — и только потом автоматизировать. Именно поэтому мы начинаем с аудита, а не с внедрения.",
            "Результат агентства, которое прошло этот путь: +$28K месячного дохода, сокращение времени на отчётность на 80%, и команда, которая перестала выгорать на рутине. Автоматизация оказалась не про увольнение людей, а про то, чтобы они делали работу, которую любят.",
        ],
        contentEn: [
            "Most agencies lose money not because of poor work quality but because of operational inefficiency. Leads get lost between CRM and email, reports are compiled manually, content is published without a system. We broke down this problem at a real agency and built 69 workflows that cover every key gap.",
            "The first and most obvious loss is lead generation and follow-up. The average agency spends 12 hours per week manually tracking leads, sending proposals, and collecting status updates. One configured n8n workflow can capture a lead from a form, create a CRM record, send a welcome sequence, and assign a task to the manager—with zero human involvement.",
            "The second zone is content and social media. 17 workflows in our system cover the full cycle: from content idea collection to automatic posting with A/B headline testing. This is not about posting more often—it is about posting meaningfully without manual overhead.",
            "The third zone is marketing intelligence. Instead of manually gathering data from 5-6 sources every week, one workflow collects, aggregates, and pushes a dashboard to Telegram or Notion. The setup takes one day and saves 5-7 hours weekly.",
            "Key lesson: automation does not work as a bolt-on solution. You cannot add an AI layer on top of chaotic processes and expect order. First, you clean up the processes, standardize inputs and outputs—then automate. That is why we always start with an audit, not implementation.",
            "The result for the agency that went through this journey: +$28K monthly revenue, 80% less time spent on reporting, and a team that stopped burning out on routine. Automation was never about replacing people—it was about letting them do the work they love.",
        ],
    },
    {
        id: 5,
        slug: "scale-agency-without-chaos",
        titleRu: "Как масштабировать агентство без хаоса: OS для автоматизации",
        titleEn: "How to Scale Your Agency Without Chaos: The Automation OS",
        excerptRu: "69 проверенных автоматизаций для агентств — от клиентского онбординга до compliance. Система, а не набор хаотичных скриптов.",
        excerptEn: "69 battle-tested agency automations — from client onboarding to compliance. A system, not a collection of random scripts.",
        date: "01 Апр 2026",
        publishedAt: "2026-04-01",
        categoryRu: "Автоматизация",
        categoryEn: "Automation",
        colorClass: "bg-pastel-orange",
        readingTimeRu: "7 мин",
        readingTimeEn: "7 min",
        contentRu: [
            "Когда мы начинали собирать Automation OS, у нас было несколько десятков скриптов и воркфлоу, разбросанных по n8n, Make, Notion API и Telegram-ботам. Они работали по отдельности, но вместе не складывались в систему. Проблема была не в инструментах, а в отсутствии архитектуры.",
            "Правильная система автоматизации для агентства состоит из 9 слоёв: клиентские операции, контент и соцсети, воронки и CRO, маркетинговая аналитика, внутренние операции, PR и комьюнити, аутрич и привлечение, платная реклама, compliance и отчётность.",
            "Клиентский онбординг — типичный пример хаоса. Один воркфлоу решает это полностью: договор → карточка в CRM → задачи команде → доступы → welcome-письмо. 15 минут ручной работы превращаются в 30 секунд автоматической.",
            "Внутренние операции — самая недооценённая зона. 7 воркфлоу для HR, finance и compliance: автоматические напоминания, сбор weekly status, генерация инвойсов, контроль дедлайнов.",
            "Итог: Automation OS — это не набор воркфлоу, а готовая архитектура, которую можно внедрить за 30 дней. После этого большая часть операций работает без ручного управления.",
        ],
        contentEn: [
            "When we started building the Automation OS, we had dozens of scripts and workflows scattered across n8n, Make, Notion API, and Telegram bots. The problem was not the tools—it was the lack of architecture.",
            "A proper agency automation system consists of 9 layers: client operations, content and social, funnels and CRO, marketing intelligence, internal operations, PR and community, outreach and acquisition, paid ads, compliance and reporting.",
            "Client onboarding is a typical example of chaos. One workflow fixes this entirely: contract → CRM record → team tasks → access → welcome email. 15 minutes become 30 seconds.",
            "Internal operations are the most underestimated zone. 7 workflows for HR, finance, and compliance: auto reminders, weekly status, invoice generation, deadline tracking.",
            "The bottom line: The Automation OS is a ready-made architecture deployable in 30 days. After that, most operations run without manual steering.",
        ],
    },
    {
        id: 6,
        slug: "solo-leveling-notion-game",
        titleRu: "Как я сделал RPG-игру в Notion: Solo Leveling",
        titleEn: "How I Built an RPG Game in Notion: Solo Leveling",
        excerptRu: "Полноценная RPG с классами, уровнями, инвентарём и сражениями — целиком внутри Notion.",
        excerptEn: "A full RPG with classes, levels, inventory, and combat — entirely inside Notion.",
        date: "20 Апр 2026",
        publishedAt: "2026-04-20",
        categoryRu: "Notion",
        categoryEn: "Notion",
        colorClass: "bg-pastel-purple",
        readingTimeRu: "6 мин",
        readingTimeEn: "6 min",
        contentRu: [
            "Solo Leveling — это не просто очередной шаблон Notion. Это эксперимент: можно ли сделать полноценную RPG внутри инструмента для заметок? Оказалось, можно. С классами, деревом навыков, инвентарём, сражениями и прокачкой. Всё на формулах, relations и rollups.",
            "Архитектура простая: три базы данных. Персонаж (с формулами для stats), Инвентарь (оружие, броня, зелья), Сражения (лог боёв с монстрами). Relations связывают всё: экипировал меч → урон вырос → победил монстра → получил лут → улучшил экипировку.",
            "Самое сложное было удержать гейм-дизайн простым. Notion не прощает сложной логики: роллапы не рекурсивны, формулы не имеют состояния. Каждая механика должна уместиться в одно-два поля.",
            "Solo Leveling — лучшая демонстрация того, как далеко можно зайти с Notion, если не бояться формул и relations.",
        ],
        contentEn: [
            "Solo Leveling is not just another Notion template. It is an experiment: can you build a full RPG inside a note-taking tool? Turns out, you can. With classes, skill trees, inventory, combat, and leveling up. All powered by formulas, relations, and rollups.",
            "The architecture is simple: three databases. Character (formula-driven stats), Inventory (weapons, armor, potions), Battles (combat log). Relations connect everything: equip a sword → damage goes up → beat a monster → get loot → upgrade gear.",
            "The hardest part was keeping the game design simple. Notion does not forgive complex logic: rollups are not recursive, formulas have no state. Every mechanic had to fit into one or two fields.",
            "Solo Leveling is the best demo of how far you can push Notion when you are not afraid of formulas and relations.",
        ],
    },
];
