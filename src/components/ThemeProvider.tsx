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
    // Check for manual preference
    const manualTheme = localStorage.getItem("theme-manual");
    if (manualTheme) {
      const saved = localStorage.getItem("theme") as Theme | null;
      if (saved) return saved;
    }
    
    // Check system preference
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return "dark";
    }
    if (window.matchMedia('(prefers-color-scheme: light)').matches) {
      return "light";
    }
    
    // Fallback to time of day
    const hour = new Date().getHours();
    return hour >= 6 && hour < 18 ? "light" : "dark";
  });

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Listen to system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e: MediaQueryListEvent) => {
      const manualTheme = localStorage.getItem("theme-manual");
      if (!manualTheme) {
        setTheme(e.matches ? "dark" : "light");
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Auto-update theme based on time of day if no manual or system preference
  useEffect(() => {
    const checkTime = () => {
      const manualTheme = localStorage.getItem("theme-manual");
      const hasSystemPreference = window.matchMedia('(prefers-color-scheme: dark)').matches || 
                                  window.matchMedia('(prefers-color-scheme: light)').matches;
      
      if (!manualTheme && !hasSystemPreference) {
        const hour = new Date().getHours();
        const autoTheme = hour >= 6 && hour < 18 ? "light" : "dark";
        if (autoTheme !== theme) {
          setTheme(autoTheme);
        }
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
