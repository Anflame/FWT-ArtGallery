import React, { FC, useState } from 'react';
import { HashRouter } from 'react-router-dom';
import { defaultContext, ThemeContext } from '../../utils/ThemeContext';
import { AppRouter } from '../AppRouter/AppRouter';

export const App: FC = () => {
  const [theme, setTheme] = useState(defaultContext.theme);
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
      }}
    >
      <HashRouter>
        <AppRouter />
      </HashRouter>
    </ThemeContext.Provider>
  );
};
