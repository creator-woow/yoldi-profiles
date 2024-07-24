import { InputHTMLAttributes, ReactNode, forwardRef } from 'react';

import { clsx } from 'shared/utils/clsx';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: ReactNode;
  error?: boolean;
  inputEnd?: ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { className, icon, error, inputEnd, autoComplete = 'off', ...props },
    ref,
  ) => {
    return (
      <div
        className={clsx(
          className,
          'flex items-center bg-primary border-1 border-primary focus-within:border-accent rounded-md overflow-hidden',
          { 'border-danger text-danger': error },
        )}
      >
        <div className="pl-[43px] relative empty:hidden">
          {icon && (
            <span className="centered-absolute w-[25px] height-[25px] flex items-center justify-center">
              {icon}
            </span>
          )}
        </div>
        <input
          {...props}
          ref={ref}
          autoComplete={autoComplete}
          className={clsx(
            'px-[15px] py-[12px] flex-auto bg-transparent focus-visible:outline-none placeholder:text-placeholder min-w-[100px]',
            { 'placeholder:text-danger': error },
          )}
        />
        {inputEnd}
      </div>
    );
  },
);

Input.displayName = 'Input';
