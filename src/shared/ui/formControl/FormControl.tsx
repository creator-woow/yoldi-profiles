import { FC, PropsWithChildren } from 'react';

import { formControlContext } from 'shared/context';

type FormControlProps = PropsWithChildren<{
  name?: string;
  required?: boolean;
  error?: boolean;
  disabled?: boolean;
}>;

export const FormControl: FC<FormControlProps> = ({
  name,
  children,
  required,
  error,
  disabled,
}) => {
  return (
    <formControlContext.Provider
      value={{
        name,
        required,
        error,
        disabled,
      }}
    >
      {children}
    </formControlContext.Provider>
  );
};
