import { forwardRef } from 'react';

import { Input, InputProps } from 'shared/ui/input';
import { FormControl } from 'shared/ui/formControl';
import { FormHelperText } from 'shared/ui/formHelperText';

export interface TextFieldProps extends InputProps {
  label?: string;
  helperText?: string;
}

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ className, helperText, ...otherProps }, ref) => {
    return (
      <div className={className}>
        <FormControl {...otherProps}>
          <Input
            {...otherProps}
            ref={ref}
          />
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
