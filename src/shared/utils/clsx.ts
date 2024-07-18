import clsxEngine from 'clsx';

export const clsx = (...params: Parameters<typeof clsxEngine>) =>
  clsxEngine(params);
