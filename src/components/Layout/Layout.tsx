import React, { FC, useEffect, useState } from 'react';
import { Outlet } from 'react-router';
import Cookies from 'js-cookie';
import Auth from '../Auth';
import Footer from '../Footer';
import Header from '../Header';
import Menu from '../Menu';
import { useAppDispatch } from '../../hooks/Redux';
import { fetchPainters } from '../../store/API/painters';
import { defaultContext, ThemeContext } from '../../utils/ThemeContext';

export const Layout: FC = () => {
  const [theme, setTheme] = useState(defaultContext.theme);
  const toggleTheme = () => {
    const resultTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(resultTheme);
    Cookies.set('theme', resultTheme, { expires: 7 });
  };

  const [isShowAuth, setIsShowAuth] = useState({
    logIn: false,
    signUp: false,
  });

  const dispatch = useAppDispatch();

  const handleShowAuth = (type?: string | boolean) => {
    if (!type) {
      setIsShowAuth({
        logIn: false,
        signUp: false,
      });
    }
    if (type === 'logIn')
      setIsShowAuth({
        logIn: true,
        signUp: false,
      });
    if (type === 'signUp')
      setIsShowAuth({
        logIn: false,
        signUp: true,
      });
  };

  const handleClickAuth = () => {};

  useEffect(() => {
    dispatch(fetchPainters());
  }, [fetchPainters]);

  const [isShow, setIsShow] = useState(false);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <Header
        isShow={isShow}
        setIsShow={setIsShow}
        handleShowAuth={handleShowAuth}
      />
      <Menu
        isShow={isShow}
        setIsShow={setIsShow}
        handleShowAuth={handleShowAuth}
      />
      <Outlet />
      <Footer />
      <Auth
        isShowAuth={isShowAuth}
        handleShowAuth={handleShowAuth}
        handleClickAuth={handleClickAuth}
      />
    </ThemeContext.Provider>
  );
};
