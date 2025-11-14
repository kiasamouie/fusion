import React, { createContext, useContext, useEffect, useState } from "react";
import { lightTheme, darkTheme, Theme } from "../theme/tokens";

type ThemeMode = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  mode: ThemeMode;
  toggleTheme: () => void;
  setTheme: (mode: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [mode, setMode] = useState<ThemeMode>("light");

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    const savedMode = localStorage.getItem("theme-mode") as ThemeMode | null;

    if (savedMode) {
      setMode(savedMode);
    } else {
      // Detect system preference
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      setMode(prefersDark ? "dark" : "light");
    }
  }, []);

  // Apply theme to document
  useEffect(() => {
    const root = document.documentElement;
    const isDark = mode === "dark";

    root.setAttribute("data-theme", mode);
    document.body.style.backgroundColor =
      isDark ? darkTheme.bg.primary : lightTheme.bg.primary;
    document.body.style.color =
      isDark ? darkTheme.text.primary : lightTheme.text.primary;
  }, [mode]);

  const toggleTheme = () => {
    const newMode: ThemeMode = mode === "light" ? "dark" : "light";
    setMode(newMode);
    localStorage.setItem("theme-mode", newMode);
  };

  const setTheme = (newMode: ThemeMode) => {
    setMode(newMode);
    localStorage.setItem("theme-mode", newMode);
  };

  const theme = mode === "light" ? lightTheme : darkTheme;

  return (
    <ThemeContext.Provider value={{ theme, mode, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
};
