import React, { FC, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from '../AppRouter/AppRouter';
import { defaultContext, ThemeContext } from '../../utils/ThemeContext';

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
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </ThemeContext.Provider>
  );
};