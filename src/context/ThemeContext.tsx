import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import { ThemeMode, getStoredTheme, applyTheme } from '../utils/theme';

interface ThemeContextType {
  theme: ThemeMode;
  isDark: boolean;
  toggleTheme: () => void;
  setTheme: (mode: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<ThemeMode>(() => getStoredTheme());

  useEffect(() => {
    // Initial application of theme on mount
    applyTheme(theme);

    // Listen for theme changes from other components or tabs
    const handleThemeChange = (e: Event) => {
      const customEvent = e as CustomEvent<{ theme: ThemeMode }>;
      if (customEvent.detail?.theme) {
        setThemeState(customEvent.detail.theme);
      }
    };

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'edumanage_theme' && (e.newValue === 'light' || e.newValue === 'dark')) {
        setThemeState(e.newValue);
        applyTheme(e.newValue);
      }
    };

    window.addEventListener('themechange', handleThemeChange);
    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('themechange', handleThemeChange);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const setTheme = (mode: ThemeMode) => {
    setThemeState(mode);
    applyTheme(mode);
  };

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
  };

  const contextValue = useMemo(
    () => ({
      theme,
      isDark: theme === 'dark',
      toggleTheme,
      setTheme,
    }),
    [theme]
  );

  return <ThemeContext.Provider value={contextValue}>{children}</ThemeContext.Provider>;
};

export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  if (!context) {
    // Fallback if used outside of ThemeProvider
    const currentTheme = getStoredTheme();
    return {
      theme: currentTheme,
      isDark: currentTheme === 'dark',
      toggleTheme: () => {
        const next = currentTheme === 'dark' ? 'light' : 'dark';
        applyTheme(next);
      },
      setTheme: (mode: ThemeMode) => {
        applyTheme(mode);
      },
    };
  }
  return context;
}
