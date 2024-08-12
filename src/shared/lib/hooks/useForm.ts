import {
  FieldValues,
  UseFormProps,
  UseFormReturn,
  useForm as useReactHookForm,
} from 'react-hook-form';

export const useForm = <TFormFields extends FieldValues>(
  props: UseFormProps<TFormFields>,
): UseFormReturn<TFormFields> => useReactHookForm<TFormFields>(props);
