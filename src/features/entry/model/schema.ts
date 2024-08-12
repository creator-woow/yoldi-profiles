// todo: fix types
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck

import { UseTranslationReturn, ValidationSchemaFields, z } from 'shared/lib';

export const RegistrationDataSchema = (t: UseTranslationReturn) =>
  z.object({
    name: z.string().min(1, t('form_validation.field_required')),
    email: z
      .string()
      .min(1, t('form_validation.field_required'))
      .email(t('form_validation.invalid_email')),
    password: z.string().min(1, t('form_validation.field_required')),
  });

export type RegistrationData = ValidationSchemaFields<
  typeof RegistrationDataSchema
>;

export const LoginDataSchema = (t: UseTranslationReturn) =>
  z.object({
    email: z
      .string()
      .min(1, t('form_validation.field_required'))
      .email(t('form_validation.invalid_email')),
    password: z.string().min(1, t('form_validation.field_required')),
  });

export type LoginData = ValidationSchemaFields<typeof LoginDataSchema>;
