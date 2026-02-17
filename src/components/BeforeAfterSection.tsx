import { useTranslation } from "react-i18next";
import { XCircle, CheckCircle, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const pastelBgClasses = [
  'bg-pastel-coral/20',
  'bg-pastel-lavender/20',
  'bg-pastel-mint/20',
];

const transformations = [
  {
    id: "chaos",
    before: {
      icon: XCircle,
      titleRu: "Хаос в задачах",
      titleEn: "Task Chaos",
      textRu: "Забытые дедлайны, потерянные заметки, информация в 10 разных местах",
      textEn: "Missed deadlines, lost notes, information scattered across 10 different places",
    },
    after: {
      icon: CheckCircle,
      titleRu: "Единый дашборд",
      titleEn: "Unified Dashboard",
      textRu: "Все задачи в одном месте с авто-напоминаниями в Telegram",
      textEn: "All tasks in one place with auto-reminders in Telegram",
    },
  },
  {
    id: "leads",
    before: {
      icon: XCircle,
      titleRu: "Потеря заявок",
      titleEn: "Lost Leads",
      textRu: "Клиенты пишут в WhatsApp, Telegram, email — половина теряется",
      textEn: "Clients write to WhatsApp, Telegram, email — half get lost",
    },
    after: {
      icon: CheckCircle,
      titleRu: "Автоматизация через n8n",
      titleEn: "n8n Automation",
      textRu: "Все заявки автоматически попадают в CRM с уведомлениями",
      textEn: "All leads automatically flow into CRM with notifications",
    },
  },
  {
    id: "reports",
    before: {
      icon: XCircle,
      titleRu: "Отчёты 3 часа",
      titleEn: "3-Hour Reports",
      textRu: "Ручной сбор данных из таблиц, копипаст, ошибки",
      textEn: "Manual data collection from spreadsheets, copy-paste, errors",
    },
    after: {
      icon: CheckCircle,
      titleRu: "Отчёт за 1 минуту",
      titleEn: "1-Minute Report",
      textRu: "Автоматическая генерация отчётов с помощью ИИ",
      textEn: "Automatic report generation with AI assistance",
    },
  },
];

const BeforeAfterSection = () => {
  const { i18n } = useTranslation();
  const isRu = i18n.language === "ru";

  return (
    <section className="relative py-16 md:py-20 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-2xl md:text-4xl font-bold font-display">
            {isRu ? "Как это работает" : "How It Works"}
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
            {isRu 
              ? "Реальные результаты моих клиентов — не просто красивые скриншоты, а бизнес-ценность" 
              : "Real results from my clients — not just pretty screenshots, but business value"}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {transformations.map((item, index) => (
            <Card key={item.id} className={`group overflow-hidden border-0 ${pastelBgClasses[index % pastelBgClasses.length]}`}>
              <CardContent className="p-6 space-y-6">
                {/* Before */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <item.before.icon className="h-5 w-5 text-destructive" />
                    <span className="text-sm font-bold text-destructive uppercase tracking-wide font-display">
                      {isRu ? "Было" : "Before"}
                    </span>
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-bold text-foreground font-display">
                      {isRu ? item.before.titleRu : item.before.titleEn}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {isRu ? item.before.textRu : item.before.textEn}
                    </p>
                  </div>
                </div>

                {/* Arrow */}
                <div className="flex justify-center">
                  <div className="p-2 rounded-full bg-background/50 group-hover:bg-foreground/10 transition-colors">
                    <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground rotate-90 md:rotate-0 transition-colors" />
                  </div>
                </div>

                {/* After */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <item.after.icon className="h-5 w-5 text-accent-lime" />
                    <span className="text-sm font-bold text-accent-lime uppercase tracking-wide font-display">
                      {isRu ? "Стало" : "After"}
                    </span>
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-bold text-foreground font-display">
                      {isRu ? item.after.titleRu : item.after.titleEn}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {isRu ? item.after.textRu : item.after.textEn}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BeforeAfterSection;
