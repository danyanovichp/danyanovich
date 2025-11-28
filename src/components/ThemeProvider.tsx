import { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";

type ThemeProviderProps = {
  children: React.ReactNode;
};

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const ThemeProviderContext = createContext<ThemeProviderState | undefined>(undefined);

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(() => {
    // Check for saved preference
    const saved = localStorage.getItem("theme") as Theme | null;
    if (saved) return saved;
    
    // Auto-detect based on time of day
    const hour = new Date().getHours();
    return hour >= 6 && hour < 18 ? "light" : "dark";
  });

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Auto-update theme based on time of day if no manual preference
  useEffect(() => {
    const checkTime = () => {
      const hour = new Date().getHours();
      const autoTheme = hour >= 6 && hour < 18 ? "light" : "dark";
      const saved = localStorage.getItem("theme-manual");
      
      if (!saved && autoTheme !== theme) {
        setTheme(autoTheme);
      }
    };

    const interval = setInterval(checkTime, 60000); // Check every minute
    return () => clearInterval(interval);
  }, [theme]);

  const value = {
    theme,
    setTheme: (newTheme: Theme) => {
      localStorage.setItem("theme-manual", "true");
      setTheme(newTheme);
    },
  };

  return (
    <ThemeProviderContext.Provider value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
