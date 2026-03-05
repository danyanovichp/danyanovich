import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Command } from "cmdk";
import { Search, FileText, Bot, Briefcase, Info, Home, Settings, GraduationCap, Package, MessageSquare } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

const CommandMenu = () => {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const { t, i18n } = useTranslation();
    const isRu = i18n.language === 'ru';

    // Toggle the menu with cmd+k or ctrl+k
    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setOpen((open) => !open);
            }
        };
        document.addEventListener("keydown", down);
        return () => document.removeEventListener("keydown", down);
    }, []);

    const runCommand = useCallback((command: () => void) => {
        setOpen(false);
        command();
    }, []);

    const pages = [
        { name: isRu ? "Главная" : "Home", route: "/", icon: Home, keywords: ["home", "main", "start", "главная"] },
        { name: isRu ? "Рабочие пространства" : "Notion Templates", route: "/notion", icon: FileText, keywords: ["notion", "templates", "шаблоны", "экосистема"] },
        { name: isRu ? "AI Промпты" : "AI Prompts", route: "/ai-prompts", icon: Bot, keywords: ["ai", "prompts", "промпты", "чат", "chatgpt", "claude"] },
        { name: isRu ? "Обучающие курсы" : "Courses", route: "/courses", icon: GraduationCap, keywords: ["courses", "обучение", "курсы", "наставничество"] },
        { name: isRu ? "Услуги консалтинга" : "Consulting", route: "/consulting", icon: Briefcase, keywords: ["consulting", "консалтинг", "услуги", "бизнес"] },
        { name: isRu ? "Пакеты услуг" : "Packages", route: "/packages", icon: Package, keywords: ["packages", "пакеты", "тарифы"] },
        { name: isRu ? "Кейсы и проекты" : "Cases & Projects", route: "/cases", icon: Settings, keywords: ["cases", "projects", "кейсы", "проекты", "портфолио", "portfolio"] },
        { name: isRu ? "Обо мне" : "About Me", route: "/contact", icon: Info, keywords: ["about", "me", "contact", "обо мне", "контакты", "связь"] },
        { name: isRu ? "Отзывы" : "Reviews", route: "/reviews", icon: MessageSquare, keywords: ["reviews", "отзывы", "мнения"] },
    ];

    return (
        <>
            <button
                onClick={() => setOpen(true)}
                className="hidden md:flex items-center gap-2 px-3 py-1.5 text-sm text-muted-foreground bg-muted/50 border-2 border-transparent hover:border-foreground hover:bg-muted transition-all duration-200 group"
            >
                <Search className="w-4 h-4" />
                <span className="opacity-70 group-hover:opacity-100 transition-opacity">
                    {isRu ? "Поиск..." : "Search..."}
                </span>
                <kbd className="hidden sm:inline-flex items-center gap-1 font-mono text-[10px] font-medium opacity-50 bg-background px-1.5 py-0.5 ml-2 border-2 border-foreground/20">
                    <span className="text-xs">⌘</span>K
                </kbd>
            </button>

            {/* Mobile search button */}
            <button
                onClick={() => setOpen(true)}
                className="md:hidden flex items-center justify-center w-10 h-10 text-foreground hover:bg-muted transition-colors rounded-none"
            >
                <Search className="w-5 h-5" />
            </button>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="p-0 overflow-hidden shadow-[8px_8px_0px_0px_currentColor] border-2 border-foreground sm:max-w-[600px] w-[95vw]">
                    <DialogTitle className="sr-only">Search</DialogTitle>
                    <Command className="w-full h-full bg-background flex flex-col items-stretch overflow-hidden">
                        <div className="flex items-center border-b-2 border-foreground px-4">
                            <Search className="w-5 h-5 opacity-50 shrink-0" />
                            <Command.Input
                                placeholder={isRu ? "Искать страницы и разделы..." : "Search pages and sections..."}
                                className="flex-1 bg-transparent px-4 py-4 md:py-5 outline-none font-display text-lg placeholder:text-muted-foreground/60 w-full min-w-0"
                            />
                        </div>

                        <Command.List className="max-h-[60vh] md:max-h-[300px] overflow-y-auto w-full">
                            <Command.Empty className="py-10 text-center text-muted-foreground w-full">
                                {isRu ? "Ничего не найдено." : "No results found."}
                            </Command.Empty>

                            <Command.Group heading={isRu ? "Навигация" : "Navigation"} className="p-3">
                                {pages.map((page) => (
                                    <Command.Item
                                        key={page.route}
                                        value={page.name + " " + page.keywords.join(" ")}
                                        onSelect={() => runCommand(() => navigate(page.route))}
                                        className="flex items-center gap-3 px-3 py-3 rounded-sm w-full cursor-pointer hover:bg-pastel-yellow border-2 border-transparent hover:border-foreground aria-selected:bg-pastel-yellow aria-selected:text-foreground aria-selected:border-foreground focus:outline-none transition-colors"
                                    >
                                        <page.icon className="w-5 h-5 opacity-70" />
                                        <span className="font-medium truncate">{page.name}</span>
                                    </Command.Item>
                                ))}
                            </Command.Group>
                        </Command.List>
                    </Command>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default CommandMenu;
