import TextAreaAutosize, {
  TextareaAutosizeProps,
} from 'react-textarea-autosize';
import { forwardRef } from 'react';

import { inputVariants } from 'shared/ui';

interface TextAreaProps extends TextareaAutosizeProps {
  error?: boolean;
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className, minRows, maxRows, error, ...props }, ref) => {
    const { root, nativeInput } = inputVariants({ error });

    return (
      <div className={root({ className })}>
        <TextAreaAutosize
          {...props}
          ref={ref}
          className={nativeInput()}
          minRows={minRows}
          maxRows={maxRows}
        />
      </div>
    );
  },
);

TextArea.displayName = 'TextArea';
