import React, { createContext, useContext, useState, useEffect } from 'react';

type Theme = 'light' | 'dark' | 'auto';
type Language = 'en' | 'id';
type DisplayMode = 'days' | 'weeks' | 'detailed';
type SeasonalTheme = 'auto' | 'manual';

interface AppContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  includeToday: boolean;
  setIncludeToday: (include: boolean) => void;
  displayMode: DisplayMode;
  setDisplayMode: (mode: DisplayMode) => void;
  seasonalTheme: SeasonalTheme;
  setSeasonalTheme: (mode: SeasonalTheme) => void;
  currentSeasonColor: string;
  highContrast: boolean;
  setHighContrast: (enabled: boolean) => void;
  dyslexiaFont: boolean;
  setDyslexiaFont: (enabled: boolean) => void;
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

  const [seasonalTheme, setSeasonalThemeState] = useState<SeasonalTheme>(() => {
    const saved = localStorage.getItem('sisahari-seasonalTheme');
    return (saved as SeasonalTheme) || 'auto';
  });

  const [highContrast, setHighContrastState] = useState<boolean>(() => {
    const saved = localStorage.getItem('sisahari-highContrast');
    return saved ? JSON.parse(saved) : false;
  });

  const [dyslexiaFont, setDyslexiaFontState] = useState<boolean>(() => {
    const saved = localStorage.getItem('sisahari-dyslexiaFont');
    return saved ? JSON.parse(saved) : false;
  });

  // Calculate current season color based on quarter
  const getCurrentSeasonColor = (): string => {
    const month = new Date().getMonth(); // 0-11
    if (month < 3) return 'hsl(240, 80%, 60%)'; // Q1: Blue
    if (month < 6) return 'hsl(150, 70%, 50%)'; // Q2: Green
    if (month < 9) return 'hsl(25, 95%, 53%)'; // Q3: Orange
    return 'hsl(280, 70%, 60%)'; // Q4: Purple
  };

  const [currentSeasonColor, setCurrentSeasonColor] = useState<string>(getCurrentSeasonColor());

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

  useEffect(() => {
    localStorage.setItem('sisahari-seasonalTheme', seasonalTheme);
  }, [seasonalTheme]);

  useEffect(() => {
    localStorage.setItem('sisahari-highContrast', JSON.stringify(highContrast));
    const root = window.document.documentElement;
    if (highContrast) {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }
  }, [highContrast]);

  useEffect(() => {
    localStorage.setItem('sisahari-dyslexiaFont', JSON.stringify(dyslexiaFont));
    const root = window.document.documentElement;
    if (dyslexiaFont) {
      root.classList.add('dyslexia-font');
    } else {
      root.classList.remove('dyslexia-font');
    }
  }, [dyslexiaFont]);

  // Update seasonal color periodically
  useEffect(() => {
    if (seasonalTheme === 'auto') {
      const updateColor = () => setCurrentSeasonColor(getCurrentSeasonColor());
      updateColor();
      const interval = setInterval(updateColor, 60000 * 60); // Check every hour
      return () => clearInterval(interval);
    }
  }, [seasonalTheme]);

  // Apply seasonal color to CSS variables
  useEffect(() => {
    if (seasonalTheme === 'auto') {
      const root = window.document.documentElement;
      root.style.setProperty('--season-accent', currentSeasonColor);
    }
  }, [seasonalTheme, currentSeasonColor]);

  const setTheme = (newTheme: Theme) => setThemeState(newTheme);
  const setLanguage = (newLang: Language) => setLanguageState(newLang);
  const setIncludeToday = (include: boolean) => setIncludeTodayState(include);
  const setDisplayMode = (mode: DisplayMode) => setDisplayModeState(mode);
  const setSeasonalTheme = (mode: SeasonalTheme) => setSeasonalThemeState(mode);
  const setHighContrast = (enabled: boolean) => setHighContrastState(enabled);
  const setDyslexiaFont = (enabled: boolean) => setDyslexiaFontState(enabled);

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
        seasonalTheme,
        setSeasonalTheme,
        currentSeasonColor,
        highContrast,
        setHighContrast,
        dyslexiaFont,
        setDyslexiaFont,
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
