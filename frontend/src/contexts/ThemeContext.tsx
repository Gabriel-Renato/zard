import { createContext, useContext, useEffect, useState, ReactNode } from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(() => {
    // Verificar localStorage ou preferência do sistema
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme") as Theme;
      if (savedTheme) {
        // Aplicar imediatamente antes do React renderizar
        const root = window.document.documentElement;
        root.classList.remove("light", "dark");
        root.classList.add(savedTheme);
        return savedTheme;
      }
      // Verificar preferência do sistema
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        const root = window.document.documentElement;
        root.classList.remove("light", "dark");
        root.classList.add("dark");
        return "dark";
      }
      // Aplicar tema claro por padrão
      const root = window.document.documentElement;
      root.classList.remove("light", "dark");
      root.classList.add("light");
    }
    return "light";
  });

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  const toggleTheme = () => {
    setThemeState((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

