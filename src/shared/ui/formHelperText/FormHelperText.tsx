import { FC, PropsWithChildren } from 'react';

import { clsx } from 'shared/lib';

type FormHelperTextProps = PropsWithChildren<{
  className?: string;
  error?: boolean;
}>;

export const FormHelperText: FC<FormHelperTextProps> = ({
  className,
  children,
  error,
}) => {
  return (
    <div className={clsx(className, 'text-sm', { 'text-danger': error })}>
      {children}
    </div>
  );
};
