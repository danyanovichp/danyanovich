import { useTranslation } from "react-i18next";
import { LocalLink as Link } from "@/components/LocalLink";
import { Briefcase, CheckCircle2, ArrowRight, Clock, Users, Zap, BarChart, Shield } from "lucide-react";
import SEO from "@/components/SEO";

export default function WorkspacesPage() {
  const { i18n } = useTranslation();
  const isRu = i18n.language === "ru";

  const features = [
    {
      icon: Zap,
      titleRu: "Готово к работе за 1 день",
      titleEn: "Ready in 1 Day",
      descRu: "Не нужно проектировать систему с нуля. Вы получаете настроенное рабочее пространство с базами данных, шаблонами и правами доступа.",
      descEn: "No need to design from scratch. Get a configured workspace with databases, templates, and access rights.",
    },
    {
      icon: Users,
      titleRu: "Под любую команду",
      titleEn: "Any Team Size",
      descRu: "Маркетинг, разработка, HR, дизайн, продажи — своя структура для каждого отдела с готовыми связями между базами.",
      descEn: "Marketing, dev, HR, design, sales — dedicated structure for each department with cross-database relations.",
    },
    {
      icon: BarChart,
      titleRu: "Прозрачные отчёты",
      titleEn: "Clear Reports",
      descRu: "Автоматические дашборды с KPI, статусами проектов и загрузкой команды. Всё видно без совещаний.",
      descEn: "Auto dashboards with KPIs, project status, and team load. Everything visible without meetings.",
    },
    {
      icon: Shield,
      titleRu: "50+ внедрений",
      titleEn: "50+ Implementations",
      descRu: "Реальный опыт в десятках компаний. Не теория, а проверенные на практике решения.",
      descEn: "Real experience across dozens of companies. Not theory—battle-tested solutions.",
    },
  ];

  const process = [
    {
      num: "01",
      titleRu: "Аудит",
      titleEn: "Audit",
      descRu: "Анализируем текущие процессы, боли команды и инструменты. Составляем карту рабочих потоков.",
      descEn: "Analyze current processes, team pain points, and tools. Map the workflow.",
    },
    {
      num: "02",
      titleRu: "Проектирование",
      titleEn: "Design",
      descRu: "Собираем архитектуру: базы данных, relations, шаблоны страниц, права доступа, автоматизации.",
      descEn: "Build the architecture: databases, relations, page templates, access rights, automations.",
    },
    {
      num: "03",
      titleRu: "Внедрение",
      titleEn: "Implementation",
      descRu: "Настраиваем пространство, мигрируем данные, подключаем интеграции. Команда начинает работать в новой системе.",
      descEn: "Configure the workspace, migrate data, connect integrations. Team starts working in the new system.",
    },
    {
      num: "04",
      titleRu: "Обучение",
      titleEn: "Training",
      descRu: "Проводим сессию для команды, готовим документацию и отвечаем на вопросы. 100+ часов обучения проведено.",
      descEn: "Team training session, documentation, Q&A. 100+ hours of training delivered.",
    },
  ];

  const ctaText = isRu
    ? "Готовы упорядочить работу команды?"
    : "Ready to organize your team's workflow?";
  const ctaSub = isRu
    ? "Напишите в Telegram — обсудим ваш проект за 15 минут"
    : "Write us on Telegram — let's discuss your project in 15 minutes";

  return (
    <div className="min-h-screen bg-black text-white">
      <SEO
        titleRu="Notion Workspaces для команд | Дэн Янович"
        titleEn="Notion Workspaces for Teams | Dan Yanovich"
        descriptionRu="Готовые рабочие пространства Notion для команд. 50+ внедрений, 100+ часов обучения. Профессиональная настройка Notion."
        descriptionEn="Ready-made Notion workspaces for teams. 50+ implementations, 100+ hours of training."
        url="/businesses/workspaces"
      />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-sky-900/20 via-transparent to-blue-900/20" />
        <div className="max-w-4xl mx-auto px-4 pt-16 pb-12 relative">
          <Link to="/businesses" className="inline-flex items-center gap-1 text-xs text-zinc-500 hover:text-zinc-300 mb-6">
            ← {isRu ? "Все бизнесы" : "All businesses"}
          </Link>
          <div className="flex items-start gap-4 mb-6">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center shadow-lg shadow-sky-500/20 shrink-0">
              <Briefcase size={26} className="text-white" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                {isRu ? "Рабочие пространства Notion" : "Notion Workspaces"}
              </h1>
              <p className="text-sm text-zinc-400 max-w-xl">
                {isRu
                  ? "Профессиональная настройка Notion для вашей команды. 50+ проектов, 100+ часов обучения."
                  : "Professional Notion setup for your team. 50+ projects, 100+ hours of training."}
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3 mb-8">
            {[
              { num: "50+", labelRu: "проектов", labelEn: "projects" },
              { num: "100+", labelRu: "часов обучения", labelEn: "hours trained" },
              { num: "30%", labelRu: "рост эффективности", labelEn: "efficiency gain" },
            ].map((s, i) => (
              <div key={i} className="p-3 rounded-xl bg-zinc-900/50 border border-zinc-800 text-center">
                <div className="text-lg font-bold text-sky-400">{s.num}</div>
                <div className="text-[10px] text-zinc-500">{isRu ? s.labelRu : s.labelEn}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-t border-zinc-800">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <h2 className="text-xs text-zinc-500 uppercase tracking-wider mb-6">
            {isRu ? "Что вы получаете" : "What You Get"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {features.map((f, i) => (
              <div key={i} className="p-5 rounded-xl bg-zinc-900/30 border border-zinc-800/50 hover:bg-zinc-900/50 transition-colors">
                <div className="w-9 h-9 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center mb-3">
                  <f.icon size={18} />
                </div>
                <h3 className="text-sm font-semibold mb-1">{isRu ? f.titleRu : f.titleEn}</h3>
                <p className="text-xs text-zinc-500 leading-relaxed">{isRu ? f.descRu : f.descEn}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="border-t border-zinc-800">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <h2 className="text-xs text-zinc-500 uppercase tracking-wider mb-6">
            {isRu ? "Как мы работаем" : "How We Work"}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {process.map((p, i) => (
              <div key={i} className="relative p-4 rounded-xl bg-zinc-900/20 border border-zinc-800/40">
                <div className="text-lg font-bold text-sky-500/50 mb-2">{p.num}</div>
                <h3 className="text-sm font-semibold mb-1">{isRu ? p.titleRu : p.titleEn}</h3>
                <p className="text-[11px] text-zinc-500 leading-relaxed">{isRu ? p.descRu : p.descEn}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-zinc-800">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="p-6 rounded-2xl bg-gradient-to-br from-sky-900/20 to-blue-900/20 border border-sky-800/30 text-center">
            <h2 className="text-lg font-semibold mb-2">{ctaText}</h2>
            <p className="text-sm text-zinc-400 mb-4">{ctaSub}</p>
            <a
              href="https://t.me/danyanovch_bot"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-sm font-medium transition-all active:scale-95"
            >
              {isRu ? "Написать в Telegram" : "Write on Telegram"}
              <ArrowRight size={14} />
            </a>
          </div>
        </div>
      </section>

      {/* Roadmap link */}
      <section className="border-t border-zinc-800">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <Link
            to="/businesses/workspaces"
            className="block p-4 rounded-xl bg-zinc-900/20 border border-zinc-800/50 hover:bg-zinc-900/40 transition-all"
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs text-zinc-500">{isRu ? "Прогресс проекта" : "Project Progress"}</div>
                <div className="text-sm font-semibold mt-1">{isRu ? "Посмотреть Roadmap →" : "View Roadmap →"}</div>
              </div>
              <div className="w-9 h-9 rounded-full bg-zinc-800 flex items-center justify-center">
                <ArrowRight size={16} className="text-zinc-400" />
              </div>
            </div>
          </Link>
        </div>
      </section>
    </div>
  );
}
