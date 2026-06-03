import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { X, Cookie, Settings } from "lucide-react";
import { Button } from "./ui/button";

interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  functionality: boolean;
}

const STORAGE_KEY = "cookieConsent";

const CookieConsent = () => {
  const { t, i18n } = useTranslation();
  const isRu = i18n.language === "ru";

  const [visible, setVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true,
    analytics: false,
    marketing: false,
    functionality: false,
  });

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) {
      setVisible(true);
    } else {
      try {
        const parsed = JSON.parse(saved);
        setPreferences(parsed);
      } catch {
        setVisible(true);
      }
    }
  }, []);

  const savePreferences = (prefs: CookiePreferences) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
    setPreferences(prefs);
    setVisible(false);
    setShowSettings(false);
  };

  const acceptAll = () => {
    const all = {
      necessary: true,
      analytics: true,
      marketing: true,
      functionality: true,
    };
    savePreferences(all);
  };

  const acceptNecessary = () => {
    const necessaryOnly = {
      necessary: true,
      analytics: false,
      marketing: false,
      functionality: false,
    };
    savePreferences(necessaryOnly);
  };

  const saveCustom = () => {
    savePreferences(preferences);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[9999] p-4 md:p-6">
      <div className="max-w-4xl mx-auto bg-card border-4 border-foreground shadow-[8px_8px_0px_0px_currentColor]">
        <div className="p-6 md:p-8">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-pastel-yellow border-2 border-foreground flex items-center justify-center">
                <Cookie className="w-5 h-5 text-black" />
              </div>
              <h3 className="font-display text-lg font-bold uppercase tracking-wider">
                {isRu ? "Cookie Consent" : "Cookie Consent"}
              </h3>
            </div>
            <button
              onClick={acceptNecessary}
              className="p-1 hover:bg-muted transition-colors"
              aria-label={isRu ? "Закрыть" : "Close"}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <p className="text-muted-foreground mb-6 leading-relaxed">
            {isRu
              ? "Мы используем cookies для обеспечения работы сайта, анализа трафика и предоставления социальных функций."
              : "We use cookies to ensure proper website operation, analyze traffic, and provide social media features."}
          </p>

          {showSettings && (
            <div className="mb-6 border-2 border-foreground bg-background p-4 space-y-3">
              <h4 className="font-bold text-sm uppercase tracking-wider mb-3">
                {isRu ? "Настройки cookies" : "Cookie preferences"}
              </h4>

              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-semibold text-sm">
                    {isRu ? "Строго необходимые" : "Strictly necessary"}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {isRu
                      ? "Требуются для работы сайта. Нельзя отключить."
                      : "Required for the website to work. Cannot be disabled."}
                  </p>
                </div>
                <input type="checkbox" checked disabled className="w-5 h-5 accent-primary" />
              </div>

              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-semibold text-sm">
                    {isRu ? "Аналитика и производительность" : "Performance and analytics"}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {isRu
                      ? "Помогают понять, как посетители взаимодействуют с сайтом."
                      : "Help understand how visitors interact with the website."}
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={preferences.analytics}
                  onChange={(e) =>
                    setPreferences((p) => ({ ...p, analytics: e.target.checked }))
                  }
                  className="w-5 h-5 accent-primary"
                />
              </div>

              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-semibold text-sm">
                    {isRu ? "Реклама и таргетинг" : "Advertisement and targeting"}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {isRu
                      ? "Используются для показа релевантной рекламы."
                      : "Used to show relevant advertisements."}
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={preferences.marketing}
                  onChange={(e) =>
                    setPreferences((p) => ({ ...p, marketing: e.target.checked }))
                  }
                  className="w-5 h-5 accent-primary"
                />
              </div>

              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-semibold text-sm">
                    {isRu ? "Функциональность и предпочтения" : "Functionality and preferences"}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {isRu
                      ? "Запоминают настройки (язык, тема и т.д.)."
                      : "Remember your settings (language, theme, etc.)."}
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={preferences.functionality}
                  onChange={(e) =>
                    setPreferences((p) => ({ ...p, functionality: e.target.checked }))
                  }
                  className="w-5 h-5 accent-primary"
                />
              </div>

              <div className="pt-3">
                <p className="text-xs text-muted-foreground mb-1">
                  {isRu
                    ? "По вопросам о cookies свяжитесь со мной:"
                    : "For any queries about cookies, please contact:"}
                </p>
                <a
                  href="https://t.me/danyanovichp"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold underline hover:text-primary transition-colors"
                >
                  @danyanovichp
                </a>
              </div>
            </div>
          )}

          <div className="flex flex-wrap items-center gap-3">
            {!showSettings ? (
              <>
                <Button
                  onClick={acceptAll}
                  className="bg-pastel-yellow text-black border-2 border-foreground shadow-[4px_4px_0px_0px_currentColor] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_currentColor] transition-all uppercase font-bold tracking-wider"
                >
                  {isRu ? "Принять все" : "Accept all"}
                </Button>
                <Button
                  variant="outline"
                  onClick={acceptNecessary}
                  className="border-2 border-foreground shadow-[4px_4px_0px_0px_currentColor] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_currentColor] transition-all uppercase font-bold tracking-wider"
                >
                  {isRu ? "Только необходимые" : "Necessary only"}
                </Button>
                <button
                  onClick={() => setShowSettings(true)}
                  className="flex items-center gap-2 text-sm font-semibold underline hover:text-primary transition-colors ml-auto"
                >
                  <Settings className="w-4 h-4" />
                  {isRu ? "Настройки" : "Settings"}
                </button>
              </>
            ) : (
              <>
                <Button
                  onClick={saveCustom}
                  className="bg-pastel-yellow text-black border-2 border-foreground shadow-[4px_4px_0px_0px_currentColor] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_currentColor] transition-all uppercase font-bold tracking-wider"
                >
                  {isRu ? "Сохранить" : "Save"}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowSettings(false)}
                  className="border-2 border-foreground shadow-[4px_4px_0px_0px_currentColor] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_currentColor] transition-all uppercase font-bold tracking-wider"
                >
                  {isRu ? "Назад" : "Back"}
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
