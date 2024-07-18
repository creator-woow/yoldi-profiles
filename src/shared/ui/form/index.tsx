import { FC, FormEvent, PropsWithChildren } from 'react';

import { clsx } from 'shared/utils/clsx';

type FormProps = PropsWithChildren<{
  className?: string;
  onSubmit?: (event: FormEvent) => void;
}>;

export const Form: FC<FormProps> = ({ className, children, onSubmit }) => {
  return (
    <form
      className={clsx(className, 'flex flex-col')}
      onSubmit={onSubmit}
    >
      {children}
    </form>
  );
};
