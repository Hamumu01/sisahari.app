import React, { createContext, useContext, useState, useEffect } from 'react';

type Theme = 'light' | 'dark' | 'auto';
type Language = 'en' | 'id';
type DisplayMode = 'days' | 'weeks' | 'detailed';

interface AppContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  includeToday: boolean;
  setIncludeToday: (include: boolean) => void;
  displayMode: DisplayMode;
  setDisplayMode: (mode: DisplayMode) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>(() => {
    const saved = localStorage.getItem('sisahari-theme');
    return (saved as Theme) || 'auto';
  });

  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('sisahari-language');
    return (saved as Language) || 'en';
  });

  const [includeToday, setIncludeTodayState] = useState<boolean>(() => {
    const saved = localStorage.getItem('sisahari-includeToday');
    return saved ? JSON.parse(saved) : true;
  });

  const [displayMode, setDisplayModeState] = useState<DisplayMode>(() => {
    const saved = localStorage.getItem('sisahari-displayMode');
    return (saved as DisplayMode) || 'days';
  });

  useEffect(() => {
    localStorage.setItem('sisahari-theme', theme);
    
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');

    if (theme === 'auto') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      root.classList.add(systemTheme);
    } else {
      root.classList.add(theme);
    }
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('sisahari-language', language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem('sisahari-includeToday', JSON.stringify(includeToday));
  }, [includeToday]);

  useEffect(() => {
    localStorage.setItem('sisahari-displayMode', displayMode);
  }, [displayMode]);

  const setTheme = (newTheme: Theme) => setThemeState(newTheme);
  const setLanguage = (newLang: Language) => setLanguageState(newLang);
  const setIncludeToday = (include: boolean) => setIncludeTodayState(include);
  const setDisplayMode = (mode: DisplayMode) => setDisplayModeState(mode);

  return (
    <AppContext.Provider
      value={{
        theme,
        setTheme,
        language,
        setLanguage,
        includeToday,
        setIncludeToday,
        displayMode,
        setDisplayMode,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};
