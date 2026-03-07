export interface BlogPost {
    id: number;
    titleRu: string;
    titleEn: string;
    excerptRu: string;
    excerptEn: string;
    date: string;
    categoryRu: string;
    categoryEn: string;
    colorClass: string;
}

export const blogPosts: BlogPost[] = [
    {
        id: 1,
        titleRu: "5 способов использовать AI агентов в малом бизнесе",
        titleEn: "5 Ways to Use AI Agents in Small Business",
        excerptRu: "Разбираем реальные кейсы применения языковых моделей для автоматизации рутинных задач: от обработки Email до генерации отчетов.",
        excerptEn: "Analyzing real use cases of language models for automating routine tasks: from Email processing to report generation.",
        date: "24 Окт 2025",
        categoryRu: "AI Автоматизация",
        categoryEn: "AI Automation",
        colorClass: "bg-pastel-pink",
    },
    {
        id: 2,
        titleRu: "Как я перестал писать код и начал заниматься Vibecoding",
        titleEn: "How I Stopped Writing Code and Started Vibecoding",
        excerptRu: "Почему будущее разработки за AI-ассистентами вроде Cursor и Lovable, и как это меняет профессию разработчика навсегда.",
        excerptEn: "Why the future of development lies with AI assistants like Cursor and Lovable, and how it changes the developer profession forever.",
        date: "12 Сен 2025",
        categoryRu: "Разработка",
        categoryEn: "Development",
        colorClass: "bg-pastel-blue",
    },
    {
        id: 3,
        titleRu: "Идеальная архитектура базы знаний в Notion",
        titleEn: "The Perfect Knowledge Base Architecture in Notion",
        excerptRu: "Делюсь своим 4-летним опытом создания корпоративных баз знаний: частые ошибки, правильная структура баз данных и система тегов.",
        excerptEn: "Sharing my 4 years of experience creating corporate knowledge bases: common mistakes, proper database structure, and tag system.",
        date: "05 Авг 2025",
        categoryRu: "Notion",
        categoryEn: "Notion",
        colorClass: "bg-pastel-yellow",
    }
];
