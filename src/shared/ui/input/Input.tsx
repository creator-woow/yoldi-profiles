import { InputHTMLAttributes, ReactNode, forwardRef } from 'react';

import { tv } from 'shared/lib';

export const inputVariants = tv({
  slots: {
    root: 'flex bg-primary border-1 border-primary focus-within:border-accent rounded-md overflow-hidden',
    nativeInput:
      'px-[15px] py-[12px] flex-auto bg-transparent focus-visible:outline-none placeholder:text-placeholder min-w-[100px]',
  },
  variants: {
    error: {
      true: {
        root: 'border-danger text-danger',
        nativeInput: 'placeholder:text-danger',
      },
    },
  },
});

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: ReactNode;
  error?: boolean;
  beforeInput?: ReactNode;
  afterInput?: ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      icon,
      error,
      afterInput,
      beforeInput,
      autoComplete = 'off',
      ...props
    },
    ref,
  ) => {
    const { root, nativeInput } = inputVariants({ error });

    return (
      <div className={root({ className })}>
        {beforeInput}
        <div className="w-[43px] flex shrink-0 justify-end self-center h-full relative empty:hidden">
          {icon && (
            <span className="w-[25px] height-[25px] flex items-center justify-center">
              {icon}
            </span>
          )}
        </div>
        <input
          {...props}
          ref={ref}
          autoComplete={autoComplete}
          className={nativeInput()}
        />
        {afterInput}
      </div>
    );
  },
);

Input.displayName = 'Input';
