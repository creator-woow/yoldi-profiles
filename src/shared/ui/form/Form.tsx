import { FC, FormEvent, PropsWithChildren } from 'react';

import { clsx } from 'shared/lib';

interface FormProps extends PropsWithChildren {
  className?: string;
  onSubmit?: (event: FormEvent) => void;
}

export const Form: FC<FormProps> = ({ className, children, onSubmit }) => {
  return (
    <form
      className={clsx(className, 'flex flex-col')}
      autoComplete="off"
      onSubmit={onSubmit}
    >
      {children}
    </form>
  );
};
