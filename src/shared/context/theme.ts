'use client';

import { createContext } from 'react';

import { Theme } from 'shared/config';

interface ThemeContext {
  theme: Theme;
  setTheme: (newTheme: Theme) => void;
}

export const themeContext = createContext<ThemeContext>({
  theme: Theme.default,
  setTheme: () => null,
});
