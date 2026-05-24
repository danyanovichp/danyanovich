import { LocalLink as Link } from "@/components/LocalLink";
import { useTranslation } from "react-i18next";
import { CheckCircle2, Circle, Clock, Target, ArrowRight } from "lucide-react";

export type RoadmapStep = {
  id: string;
  titleRu: string;
  titleEn: string;
  descRu: string;
  descEn: string;
  status: "done" | "in-progress" | "todo";
  priority?: "high" | "medium" | "low";
};

export type RoadmapPhase = {
  titleRu: string;
  titleEn: string;
  steps: RoadmapStep[];
};

type Props = {
  phases: RoadmapPhase[];
  progress: { done: number; total: number };
};

const priorityLabels: Record<string, { ru: string; en: string; color: string }> = {
  high: { ru: "Высокий", en: "High", color: "bg-red-500/20 text-red-400 border-red-800/30" },
  medium: { ru: "Средний", en: "Medium", color: "bg-amber-500/20 text-amber-400 border-amber-800/30" },
  low: { ru: "Низкий", en: "Low", color: "bg-zinc-500/20 text-zinc-400 border-zinc-800/30" },
};

export default function RoadmapView({ phases, progress }: Props) {
  const { i18n } = useTranslation();
  const isRu = i18n.language === "ru";

  const StatusIcon = ({ status }: { status: string }) => {
    if (status === "done") return <CheckCircle2 size={18} className="text-emerald-500 shrink-0 mt-0.5" />;
    if (status === "in-progress") return <Clock size={18} className="text-violet-400 animate-pulse shrink-0 mt-0.5" />;
    return <Circle size={18} className="text-zinc-700 shrink-0 mt-0.5" />;
  };

  const pct = progress.total > 0 ? Math.round((progress.done / progress.total) * 100) : 0;

  return (
    <div className="space-y-8">
      {/* Progress header */}
      <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800 rounded-2xl p-5">
        <div className="flex items-center justify-between mb-3">
          <div>
            <div className="text-xs text-zinc-500 uppercase tracking-wider mb-1">
              {isRu ? "Общий прогресс" : "Overall Progress"}
            </div>
            <div className="text-2xl font-bold text-white">
              {progress.done}/{progress.total}
              <span className="text-sm font-normal text-zinc-500 ml-1">
                {isRu ? "задач" : "tasks"}
              </span>
            </div>
          </div>
          <div className="relative w-14 h-14">
            <svg className="w-14 h-14 -rotate-90" viewBox="0 0 36 36">
              <circle cx="18" cy="18" r="15.5" fill="none" stroke="#27272a" strokeWidth="2" />
              <circle
                cx="18" cy="18" r="15.5" fill="none" stroke={pct === 100 ? "#34d399" : "#8b5cf6"}
                strokeWidth="2" strokeDasharray={`${pct} ${100 - pct}`}
                strokeLinecap="round" style={{ transition: "stroke-dasharray 0.6s" }}
              />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-xs font-semibold text-white">
              {pct}%
            </span>
          </div>
        </div>
        <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-violet-600 to-emerald-500 transition-all duration-700"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      {/* Phases */}
      {phases.map((phase, pi) => {
        const doneInPhase = phase.steps.filter(s => s.status === "done").length;
        const phasePct = Math.round((doneInPhase / phase.steps.length) * 100);
        return (
          <div key={pi} className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="flex-1 border-t border-zinc-800" />
              <span className="text-lg font-semibold text-white shrink-0">
                {isRu ? phase.titleRu : phase.titleEn}
              </span>
              <div className="flex-1 border-t border-zinc-800" />
            </div>

            {phase.steps.map((step) => (
              <div
                key={step.id}
                className={`group flex items-start gap-3 p-4 rounded-xl border transition-all ${
                  step.status === "done"
                    ? "bg-zinc-900/30 border-zinc-800/30 opacity-70"
                    : step.status === "in-progress"
                    ? "bg-violet-950/20 border-violet-800/30 hover:bg-violet-950/30"
                    : "bg-zinc-900/20 border-zinc-800/40 hover:bg-zinc-900/40"
                }`}
              >
                <StatusIcon status={step.status} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`text-sm font-medium ${
                      step.status === "done" ? "text-zinc-500 line-through" : "text-zinc-200"
                    }`}>
                      {isRu ? step.titleRu : step.titleEn}
                    </span>
                    {step.priority && (
                      <span className={`text-[10px] px-1.5 py-0.5 rounded border ${priorityLabels[step.priority].color}`}>
                        {isRu ? priorityLabels[step.priority].ru : priorityLabels[step.priority].en}
                      </span>
                    )}
                    {step.status === "in-progress" && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-violet-500/20 text-violet-400 border border-violet-800/30">
                        {isRu ? "В работе" : "In progress"}
                      </span>
                    )}
                  </div>
                  <p className={`text-xs mt-1 ${
                    step.status === "done" ? "text-zinc-700" : "text-zinc-500"
                  }`}>
                    {isRu ? step.descRu : step.descEn}
                  </p>
                </div>
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
}
