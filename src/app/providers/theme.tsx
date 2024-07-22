'use client';

import { FC, PropsWithChildren, useState } from 'react';

import {
  THEME_ATTRIBUTE_NAME,
  THEME_COOKIE_NAME,
  Theme,
  isValidTheme,
} from 'shared/config/theme';
import { getClientCookie, setClientCookie } from 'shared/lib/cookie';
import { themeContext } from 'shared/context/theme';

export const ThemeProvider: FC<PropsWithChildren> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    const activeTheme = getClientCookie(THEME_COOKIE_NAME);

    if (activeTheme && isValidTheme(activeTheme)) {
      return activeTheme;
    }

    return Theme.default;
  });

  const handleThemeChange = (newTheme: Theme) => {
    setClientCookie(THEME_COOKIE_NAME, newTheme);
    setTheme(newTheme);
    document.documentElement.setAttribute(THEME_ATTRIBUTE_NAME, newTheme);
  };

  return (
    <themeContext.Provider
      value={{
        theme,
        setTheme: handleThemeChange,
      }}
    >
      {children}
    </themeContext.Provider>
  );
};
