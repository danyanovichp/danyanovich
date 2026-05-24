import { useState, useEffect, useRef } from "react";
import {
  Bot, Send, Zap, ListTodo, TrendingUp, Smartphone, History,
  X, Check, Menu, Settings, MessageCircle, ExternalLink, Sparkles
} from "lucide-react";

type Message = {
  id: string;
  role: "user" | "assistant";
  text: string;
  time: string;
};

const CHAT_KEY = "hermes_chat_history";
const TASKS_KEY = "hermes_tasks";

const QUICK_ACTIONS = [
  { label: "Стратегия", icon: "📋", msg: "расскажи стратегию на месяц" },
  { label: "Отчёт", icon: "📊", msg: "покажи статус всех бизнесов" },
  { label: "Задачи", icon: "✅", msg: "что я должен сделать сегодня?" },
  { label: "Овощи", icon: "🥬", msg: "овощная лавка" },
];

export default function HermesMiniApp() {
  const [messages, setMessages] = useState<Message[]>(() => {
    try {
      const saved = localStorage.getItem(CHAT_KEY);
      if (saved) return JSON.parse(saved);
    } catch {}
    return [{
      id: "0",
      role: "assistant" as const,
      text: "Привет, Дэн! 👋 Я Hermes — твой COO + CTO. Чем помогу?",
      time: new Date().toLocaleTimeString("ru", { hour: "2-digit", minute: "2-digit" }),
    }];
  });
  const [input, setInput] = useState("");
  const [showSidebar, setShowSidebar] = useState(false);
  const [tg, setTg] = useState<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Detect Telegram Mini App or browser
  useEffect(() => {
    if (typeof window !== "undefined" && (window as any).Telegram?.WebApp) {
      const webapp = (window as any).Telegram.WebApp;
      webapp.ready();
      webapp.expand();
      setTg(webapp);
    }
  }, []);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const saveMessages = (msgs: Message[]) => {
    setMessages(msgs);
    try { localStorage.setItem(CHAT_KEY, JSON.stringify(msgs)); } catch {}
  };

  const sendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      text: text.trim(),
      time: new Date().toLocaleTimeString("ru", { hour: "2-digit", minute: "2-digit" }),
    };

    const newMessages = [...messages, userMsg];
    saveMessages(newMessages);
    setInput("");

    // Send to Telegram
    if (tg) {
      tg.sendData(text.trim());
      tg.close();
    } else {
      // Fallback: try opening Telegram deep link - but user might not have it
      // Just add a hint
      const hint: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        text: "⬆️ Сообщение отправлено! Открой Telegram, чтобы получить ответ.\n\n_Чат с Hermes работает в Telegram. Установи Mini App через @BotFather → /setmenubutton_",
        time: new Date().toLocaleTimeString("ru", { hour: "2-digit", minute: "2-digit" }),
      };
      saveMessages([...newMessages, hint]);
    }
  };

  const clearChat = () => {
    const welcome = {
      id: "welcome", role: "assistant" as const,
      text: "Чат очищен. Чем займёмся?",
      time: new Date().toLocaleTimeString("ru", { hour: "2-digit", minute: "2-digit" }),
    };
    saveMessages([welcome]);
  };

  const openInTelegram = () => {
    if (tg) {
      tg.sendData("привет");
      tg.close();
    } else {
      window.location.href = "https://t.me/danyanovch_bot";
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  return (
    <div className="flex flex-col h-dvh bg-black text-white overflow-hidden">
      {/* === STATUS BAR (Telegram-style) === */}
      <div className="h-11 flex items-center justify-between px-4 bg-[#1a1a1a] border-b border-[#2b2b2b] shrink-0 safe-area-top">
        <button onClick={() => setShowSidebar(!showSidebar)} className="w-8 h-8 flex items-center justify-center -ml-1 text-[#8e8e93] hover:text-white active:opacity-60">
          <Menu size={20} />
        </button>
        <div className="flex items-center gap-2.5">
          <div className="w-6 h-6 rounded-md bg-gradient-to-br from-violet-500 to-fuchsia-600 flex items-center justify-center shadow-sm">
            <Bot size={13} className="text-white" />
          </div>
          <span className="text-sm font-semibold">Hermes Agent</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
        </div>
        <button onClick={clearChat} className="w-8 h-8 flex items-center justify-center -mr-1 text-[#8e8e93] hover:text-white active:opacity-60">
          <X size={18} />
        </button>
      </div>

      {/* === SIDEBAR (slide-over) === */}
      {showSidebar && (
        <div className="fixed inset-0 z-50 flex">
          <div className="w-[260px] bg-[#1c1c1e] border-r border-[#2b2b2b] flex flex-col safe-area-top" onClick={(e) => e.stopPropagation()}>
            <div className="h-11 flex items-center justify-between px-4 border-b border-[#2b2b2b]">
              <span className="text-xs font-semibold text-[#8e8e93] uppercase tracking-wider">Меню</span>
              <button onClick={() => setShowSidebar(false)} className="text-[#8e8e93] hover:text-white">
                <X size={18} />
              </button>
            </div>
            <div className="flex-1 p-3 space-y-1 overflow-y-auto">
              <SidebarButton icon={<Zap size={16} />} label="Быстрые команды" onClick={() => setShowSidebar(false)} />
              <SidebarButton icon={<ListTodo size={16} />} label="Задачи" onClick={() => {
                setShowSidebar(false);
                sendMessage("покажи мои задачи");
              }} />
              <SidebarButton icon={<TrendingUp size={16} />} label="Статус проектов" onClick={() => {
                setShowSidebar(false);
                sendMessage("статус всех бизнесов");
              }} />
              <SidebarButton icon={<History size={16} />} label="История" onClick={() => {
                setShowSidebar(false);
              }} />
              <SidebarButton icon={<Smartphone size={16} />} label="Овощная лавка" onClick={() => {
                setShowSidebar(false);
                sendMessage("овощная лавка");
              }} />
              <div className="mt-4 pt-4 border-t border-[#2b2b2b]">
                <SidebarButton icon={<Settings size={16} />} label="Инфо" onClick={() => setShowSidebar(false)} />
              </div>
            </div>
            <div className="p-3 border-t border-[#2b2b2b]">
              <div className="text-[10px] text-[#48484a] leading-relaxed">
                <div>deepseek-v4-flash</div>
                <div>COO + CTO</div>
                <div className="mt-1">
                  <button onClick={clearChat} className="text-[#ff453a] hover:text-[#ff6b6b]">Очистить чат</button>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1 bg-black/60" onClick={() => setShowSidebar(false)} />
        </div>
      )}

      {/* === MESSAGES === */}
      <div className="flex-1 overflow-y-auto px-3 py-2 space-y-2 scroll-smooth">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[82%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                msg.role === "user"
                  ? "bg-[#0b93f6] text-white rounded-br-md"
                  : "bg-[#1c1c1e] text-[#e5e5ea] rounded-bl-md"
              }`}
            >
              {msg.text}
              <div className={`text-[10px] mt-1 ${msg.role === "user" ? "text-white/60" : "text-[#48484a]"}`}>
                {msg.time}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* === QUICK ACTIONS (condensed for mobile) === */}
      <div className="px-3 py-1.5 flex gap-1.5 overflow-x-auto shrink-0 scrollbar-none">
        {QUICK_ACTIONS.map((a, i) => (
          <button
            key={i}
            onClick={() => sendMessage(a.msg)}
            className="shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-full bg-[#1c1c1e] border border-[#2b2b2b] 
                       text-[11px] text-[#8e8e93] hover:text-white hover:border-[#3a3a3c] active:scale-95 transition-all whitespace-nowrap"
          >
            <span>{a.icon}</span>
            <span>{a.label}</span>
          </button>
        ))}
      </div>

      {/* === INPUT BAR === */}
      <div className="px-3 py-2 bg-[#1a1a1a] border-t border-[#2b2b2b] shrink-0 safe-area-bottom">
        <div className="flex items-end gap-2">
          <div className="flex-1 flex items-end bg-[#2c2c2e] rounded-2xl px-3 min-h-[40px]">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Сообщение..."
              className="flex-1 bg-transparent text-sm text-white placeholder-[#636366] py-2.5 outline-none resize-none max-h-[100px]"
            />
          </div>
          <button
            onClick={() => sendMessage(input)}
            disabled={!input.trim()}
            className="w-10 h-10 rounded-full bg-[#0b93f6] flex items-center justify-center 
                       disabled:bg-[#2c2c2e] disabled:text-[#636366] active:scale-90 transition-all shrink-0
                       text-white"
          >
            <Send size={16} className={!input.trim() ? "text-[#636366]" : "text-white"} />
          </button>
        </div>
      </div>
    </div>
  );
}

function SidebarButton({ icon, label, onClick }: { icon: React.ReactNode; label: string; onClick: () => void }) {
  return (
    <button onClick={onClick} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-[#e5e5ea] 
                                         hover:bg-[#2c2c2e] active:bg-[#3a3a3c] transition-colors">
      <span className="text-[#8e8e93]">{icon}</span>
      <span>{label}</span>
    </button>
  );
}
