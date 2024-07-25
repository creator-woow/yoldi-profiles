// todo: fix types errors
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { forwardRef } from 'react';

import { Input, InputProps } from 'shared/ui/input';
import { FormControl } from 'shared/ui/formControl';
import { FormHelperText } from 'shared/ui/formHelperText';
import { TextArea } from 'shared/ui/textArea';

export interface TextFieldProps extends InputProps {
  label?: string;
  helperText?: string;
  multiline?: boolean;
  minRows?: number;
  maxRows?: number;
}

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      className,
      helperText,
      label,
      multiline,
      minRows,
      maxRows,
      ...otherProps
    },
    ref,
  ) => {
    return (
      <div className={className}>
        <FormControl {...otherProps}>
          <label className="flex flex-col">
            {label && (
              <span className="text-secondary font-medium mb-[5px] ml-[2px] self-start">
                {label}
              </span>
            )}
            {multiline ? (
              <TextArea
                {...otherProps}
                ref={ref}
                minRows={minRows}
                maxRows={maxRows}
              />
            ) : (
              <Input
                {...otherProps}
                ref={ref}
              />
            )}
          </label>
          {helperText && (
            <FormHelperText
              className="mt-1"
              error={otherProps.error}
            >
              {helperText}
            </FormHelperText>
          )}
        </FormControl>
      </div>
    );
  },
);

TextField.displayName = 'TextField';
