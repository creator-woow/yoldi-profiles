import { forwardRef, useRef, useState } from 'react';
import { useTranslations } from 'shared/hooks/useTranslations';

import { TextField, TextFieldProps } from 'shared/ui/textField';
import { Button } from 'shared/ui/button';
import CloseEyeIcon from 'shared/icons/eye-closed.svg';
import EyeIcon from 'shared/icons/eye.svg';
import LockIcon from 'shared/icons/lock.svg';
import { clsx } from 'shared/utils/clsx';
import { mergeRefs } from 'shared/utils/mergeRefs';

interface PasswordFieldProps extends Omit<TextFieldProps, 'type'> {}

export const PasswordField = forwardRef<HTMLInputElement, PasswordFieldProps>(
  (props, ref) => {
    const t = useTranslations();
    const [passwordVisible, setPasswordVisible] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const togglePasswordVisible = () => {
      setPasswordVisible((prev) => !prev);
      inputRef.current?.focus();
    };

    return (
      <TextField
        {...props}
        ref={mergeRefs([ref, inputRef])}
        type={passwordVisible ? 'text' : 'password'}
        icon={
          <LockIcon
            width={16}
            heigth={21}
          />
        }
        inputEnd={
          <Button
            className={clsx('h-full px-[20px] py-[10px] text-secondary', {
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
