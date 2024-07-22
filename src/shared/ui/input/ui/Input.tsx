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
          'flex items-center border-1 border-primary focus-within:border-accent rounded-md overflow-hidden',
          { 'border-danger text-danger': error },
        )}
      >
        <div className="pl-[43px] relative empty:hidden">
          {icon && (
            <span className="absolute left-1/2 top-1/2 transform -translate-y-1/2 w-[25px] height-[25px] flex items-center justify-center">
              {icon}
            </span>
          )}
        </div>
        <input
          {...props}
          ref={ref}
          autoComplete={autoComplete}
          className={clsx(
            'px-[15px] py-[12px] flex-auto focus-visible:outline-none placeholder:text-placeholder',
            { 'placeholder:text-danger': error },
          )}
        />
        {inputEnd}
      </div>
    );
  },
);

Input.displayName = 'Input';
