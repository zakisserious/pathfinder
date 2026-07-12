import { createContext, useContext, useState, useEffect } from 'react';
import { THEMES } from '../utils/constants';
import { darkTheme, lightTheme } from '../utils/colors';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('pathfinding-theme');
    return saved || THEMES.DARK;
  });

  useEffect(() => {
    localStorage.setItem('pathfinding-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === THEMES.DARK ? THEMES.LIGHT : THEMES.DARK));
  };

  const colors = theme === THEMES.DARK ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, colors }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
}
