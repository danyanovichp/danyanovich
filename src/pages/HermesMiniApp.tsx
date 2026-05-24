import { useState, useEffect, useCallback } from "react";
import {
  Bot, Zap, Clock, History, ListTodo, TrendingUp, MessageCircle,
  Settings, ChevronRight, Plus, CheckCircle2, Circle, Trash2,
  Search, Command, Smartphone, Laptop, Wifi, ExternalLink
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

type Task = {
  id: string;
  text: string;
  done: boolean;
};

type QuickCommand = {
  label: string;
  icon: React.ReactNode;
  command: string;
};

const STORAGE_KEY = "hermes_tasks";

export default function HermesMiniApp() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    try {
      const saved = Telegram?.WebApp?.CloudStorage?.getItem?.(STORAGE_KEY);
      if (saved) return JSON.parse(saved as string);
    } catch {}
    return [];
  });
  const [newTaskText, setNewTaskText] = useState("");
  const [synced, setSynced] = useState(false);
  const [tg, setTg] = useState<any>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && (window as any).Telegram?.WebApp) {
      const webapp = (window as any).Telegram.WebApp;
      webapp.ready();
      webapp.expand();
      webapp.enableClosingConfirmation();
      setTg(webapp);
    }
  }, []);

  // Load tasks from Telegram CloudStorage on mount
  useEffect(() => {
    if (tg) {
      tg.CloudStorage.getItem(STORAGE_KEY, (err: any, val: string | null) => {
        if (!err && val) {
          try { setTasks(JSON.parse(val)); } catch {}
        }
      });
    }
  }, [tg]);

  // Save tasks to local state + Telegram CloudStorage
  const saveTasks = useCallback((newTasks: Task[]) => {
    setTasks(newTasks);
    if (tg) {
      tg.CloudStorage.setItem(STORAGE_KEY, JSON.stringify(newTasks), () => {
        setSynced(true);
        setTimeout(() => setSynced(false), 2000);
      });
    }
  }, [tg]);

  // Send data to Hermes bot
  const sendToBot = useCallback((data: string) => {
    if (tg) {
      tg.sendData(data);
      tg.close();
    }
  }, [tg]);

  const addTask = () => {
    if (!newTaskText.trim()) return;
    const newTask: Task = {
      id: Date.now().toString(),
      text: newTaskText.trim(),
      done: false,
    };
    saveTasks([...tasks, newTask]);
    setNewTaskText("");
  };

  const toggleTask = (id: string) => {
    saveTasks(tasks.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  const deleteTask = (id: string) => {
    saveTasks(tasks.filter(t => t.id !== id));
  };

  const quickCommands: QuickCommand[] = [
    { label: "Новая задача", icon: <Plus size={16} />, command: "добавь задачу:" },
    { label: "Что делать?", icon: <Zap size={16} />, command: "что мне делать сейчас?" },
    { label: "Статус проектов", icon: <TrendingUp size={16} />, command: "статус всех бизнесов" },
    { label: "Поиск в истории", icon: <Search size={16} />, command: "найди в истории:" },
    { label: "Сменить модель", icon: <Laptop size={16} />, command: "/model" },
    { label: "Овощная лавка", icon: <Smartphone size={16} />, command: "овощная лавка" },
  ];

  const doneCount = tasks.filter(t => t.done).length;
  const totalCount = tasks.length;

  const handleCommand = (cmd: QuickCommand) => {
    // If it's a simple command, send directly
    if (cmd.command.startsWith("/")) {
      sendToBot(cmd.command);
    } else {
      sendToBot(cmd.command);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950 text-white">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-zinc-950/90 backdrop-blur-lg border-b border-zinc-800">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-600 flex items-center justify-center shadow-lg shadow-violet-500/20">
              <Bot size={18} className="text-white" />
            </div>
            <div>
              <h1 className="text-sm font-semibold leading-tight">Hermes Agent</h1>
              <div className="flex items-center gap-1.5 text-[10px] text-zinc-500">
                <Wifi size={10} className={synced ? "text-emerald-400" : "text-zinc-600"} />
                <span>{synced ? "Синхронизировано" : "deepseek-v4-flash"}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {totalCount > 0 && (
              <Badge variant="outline" className="text-[10px] h-5 px-2 border-zinc-700 text-zinc-400">
                {doneCount}/{totalCount}
              </Badge>
            )}
            <Button
              variant="ghost"
              size="icon"
              className="w-7 h-7 text-zinc-500 hover:text-white"
              onClick={() => sendToBot("покажи статистику")}
            >
              <Settings size={14} />
            </Button>
          </div>
        </div>
      </div>

      <div className="px-4 py-3 space-y-4 pb-24">
        {/* Quick Commands Grid */}
        <div className="grid grid-cols-3 gap-2">
          {quickCommands.map((cmd, i) => (
            <button
              key={i}
              onClick={() => handleCommand(cmd)}
              className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-zinc-800/50 border border-zinc-800 
                         hover:bg-zinc-800 hover:border-zinc-700 active:scale-95 transition-all"
            >
              <div className="w-7 h-7 rounded-lg bg-zinc-800 flex items-center justify-center text-violet-400">
                {cmd.icon}
              </div>
              <span className="text-[10px] text-zinc-400 text-center leading-tight">{cmd.label}</span>
            </button>
          ))}
        </div>

        {/* Open Chat Button */}
        <button
          onClick={() => sendToBot("привет")}
          className="w-full flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-violet-600/20 to-fuchsia-600/20 
                     border border-violet-800/30 hover:from-violet-600/30 hover:to-fuchsia-600/30 active:scale-[0.98] transition-all"
        >
          <div className="flex items-center gap-2.5">
            <MessageCircle size={16} className="text-violet-400" />
            <span className="text-xs font-medium text-violet-300">Открыть чат с Hermes</span>
          </div>
          <ExternalLink size={14} className="text-violet-500" />
        </button>

        {/* Task Manager */}
        <div>
          <div className="flex items-center justify-between mb-2.5">
            <div className="flex items-center gap-2">
              <ListTodo size={14} className="text-zinc-500" />
              <h2 className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Задачи</h2>
            </div>
            {totalCount > 0 && (
              <span className="text-[10px] text-zinc-600">{doneCount}/{totalCount} выполнено</span>
            )}
          </div>

          {/* Add Task */}
          <div className="flex gap-2 mb-2.5">
            <Input
              value={newTaskText}
              onChange={(e) => setNewTaskText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addTask()}
              placeholder="Новая задача..."
              className="h-9 text-xs bg-zinc-800/50 border-zinc-800 text-zinc-200 placeholder:text-zinc-600 
                         focus-visible:ring-violet-500/30"
            />
            <Button
              onClick={addTask}
              size="icon"
              className="h-9 w-9 bg-violet-600 hover:bg-violet-500 text-white shrink-0"
            >
              <Plus size={14} />
            </Button>
          </div>

          {/* Task List */}
          <div className="space-y-1">
            {tasks.length === 0 && (
              <div className="text-center py-6 text-zinc-600">
                <ListTodo size={24} className="mx-auto mb-2 opacity-50" />
                <p className="text-xs">Задач пока нет</p>
                <p className="text-[10px] text-zinc-700 mt-1">Напиши или добавь новую задачу</p>
              </div>
            )}
            {tasks.map((task) => (
              <div
                key={task.id}
                className={`group flex items-center gap-2.5 p-2.5 rounded-lg border transition-all ${
                  task.done
                    ? "bg-zinc-800/20 border-zinc-800/30"
                    : "bg-zinc-800/30 border-zinc-800/50 hover:bg-zinc-800/50"
                }`}
              >
                <button
                  onClick={() => toggleTask(task.id)}
                  className="shrink-0 focus:outline-none"
                >
                  {task.done ? (
                    <CheckCircle2 size={16} className="text-emerald-500" />
                  ) : (
                    <Circle size={16} className="text-zinc-600 group-hover:text-zinc-500 transition-colors" />
                  )}
                </button>
                <span
                  className={`flex-1 text-xs ${
                    task.done ? "text-zinc-600 line-through" : "text-zinc-300"
                  }`}
                >
                  {task.text}
                </span>
                <button
                  onClick={() => deleteTask(task.id)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity shrink-0 focus:outline-none"
                >
                  <Trash2 size={12} className="text-zinc-600 hover:text-red-400" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Session Info */}
        <div className="rounded-xl bg-zinc-800/20 border border-zinc-800/50 p-3">
          <div className="flex items-center gap-2 mb-2">
            <Clock size={12} className="text-zinc-600" />
            <span className="text-[10px] text-zinc-500 uppercase tracking-wider">Активная сессия</span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-[11px]">
            <div className="text-zinc-500">Модель</div>
            <div className="text-zinc-300 text-right font-mono">deepseek-v4-flash</div>
            <div className="text-zinc-500">Провайдер</div>
            <div className="text-zinc-300 text-right font-mono">ollama-cloud</div>
            <div className="text-zinc-500">Платформа</div>
            <div className="text-zinc-300 text-right">Telegram</div>
            <div className="text-zinc-500">Роль</div>
            <div className="text-zinc-300 text-right">COO + CTO</div>
          </div>
        </div>
      </div>

      {/* Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-zinc-950/95 backdrop-blur-lg border-t border-zinc-800 px-4 py-3">
        <div className="flex gap-2">
          <button
            onClick={() => sendToBot("стратегия")}
            className="flex-1 py-2.5 rounded-xl bg-zinc-800 border border-zinc-700 text-xs text-zinc-300 
                       hover:bg-zinc-700 active:scale-[0.98] transition-all"
          >
            📋 Стратегия
          </button>
          <button
            onClick={() => sendToBot("отчёт по всем бизнесам")}
            className="flex-1 py-2.5 rounded-xl bg-zinc-800 border border-zinc-700 text-xs text-zinc-300 
                       hover:bg-zinc-700 active:scale-[0.98] transition-all"
          >
            📊 Отчёт
          </button>
          <button
            onClick={() => sendToBot("что я должен сделать сегодня?")}
            className="flex-1 py-2.5 rounded-xl bg-violet-600 text-xs text-white font-medium 
                       hover:bg-violet-500 active:scale-[0.98] transition-all shadow-lg shadow-violet-600/20"
          >
            ⚡ Что делать?
          </button>
        </div>
      </div>
    </div>
  );
}
