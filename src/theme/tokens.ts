export const lightTheme = {
  bg: {
    primary: "#ffffff",
    secondary: "#f8f9fa",
    tertiary: "#f0f2f5",
  },
  text: {
    primary: "#1a1a1a",
    secondary: "#4a4a4a",
    tertiary: "#7a7a7a",
  },
  border: {
    primary: "#e0e0e0",
    secondary: "#f0f0f0",
  },
  accent: {
    primary: "#4f46e5",
    secondary: "#7c3aed",
    success: "#10b981",
    warning: "#f59e0b",
    error: "#ef4444",
  },
  shadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
  shadowLg: "0 10px 25px rgba(0, 0, 0, 0.1)",
};

export const darkTheme = {
  bg: {
    primary: "#0f172a",
    secondary: "#1e293b",
    tertiary: "#334155",
  },
  text: {
    primary: "#f1f5f9",
    secondary: "#cbd5e1",
    tertiary: "#94a3b8",
  },
  border: {
    primary: "#475569",
    secondary: "#334155",
  },
  accent: {
    primary: "#6366f1",
    secondary: "#a78bfa",
    success: "#34d399",
    warning: "#fbbf24",
    error: "#f87171",
  },
  shadow: "0 2px 8px rgba(0, 0, 0, 0.3)",
  shadowLg: "0 10px 25px rgba(0, 0, 0, 0.3)",
};

export type Theme = typeof lightTheme;
