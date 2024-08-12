'use client';

import { createContext } from 'react';

interface FormControlContext {
  name?: string;
  required?: boolean;
  error?: boolean;
  disabled?: boolean;
}

export const formControlContext = createContext<FormControlContext>({
  required: false,
  error: false,
  disabled: false,
});
