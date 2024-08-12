import clsxEngine from 'clsx';
import { twMerge } from 'tailwind-merge';

export const clsx = (...params: Parameters<typeof clsxEngine>) =>
  twMerge(clsxEngine(params));
