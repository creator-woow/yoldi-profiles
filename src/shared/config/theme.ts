export const enum Theme {
  light = 'light',
  dark = 'dark',
  system = 'system',
  default = Theme.light,
}

export const THEMES = [Theme.light, Theme.dark, Theme.system] as const;

export const THEME_ATTRIBUTE_NAME = 'data-theme';
export const THEME_COOKIE_NAME = 'theme';

export const isValidTheme = (theme: string): theme is Theme => {
  return THEMES.includes(theme as Theme);
};
