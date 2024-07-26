import { forwardRef, useState } from 'react';
import { useTranslations } from 'shared/hooks/useTranslations';

import { TextField, TextFieldProps } from 'shared/ui/textField';
import { Button } from 'shared/ui/button';
import CloseEyeIcon from 'shared/icons/eye-closed.svg';
import EyeIcon from 'shared/icons/eye.svg';
import LockIcon from 'shared/icons/lock.svg';
import { clsx } from 'shared/utils/clsx';

interface PasswordFieldProps extends Omit<TextFieldProps, 'type'> {}

export const PasswordField = forwardRef<HTMLInputElement, PasswordFieldProps>(
  (props, ref) => {
    const t = useTranslations();
    const [passwordVisible, setPasswordVisible] = useState(false);
    const togglePasswordVisible = () => setPasswordVisible((prev) => !prev);

    return (
      <TextField
        {...props}
        ref={ref}
        type={passwordVisible ? 'text' : 'password'}
        icon={
          <LockIcon
            width={16}
            heigth={21}
          />
        }
        afterInput={
          <Button
            className={clsx('px-[20px] py-[10px] text-secondary', {
              'text-danger': props.error,
            })}
            title={
              passwordVisible
                ? t('entry.hide_password')
                : t('entry.show_password')
            }
            variant="clear"
            type="button"
            onClick={togglePasswordVisible}
          >
            {passwordVisible ? (
              <CloseEyeIcon
                width={23}
                heigth={15}
              />
            ) : (
              <EyeIcon
                width={23}
                heigth={15}
              />
            )}
          </Button>
        }
      />
    );
  },
);

PasswordField.displayName = 'PasswordField';
