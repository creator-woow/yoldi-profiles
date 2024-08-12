// todo: fix types
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck

import { UseTranslationReturn, ValidationSchemaFields, z } from 'shared/lib';

export const EditProfileDataSchema = (t: UseTranslationReturn) =>
  z.object({
    name: z.string().trim().min(1, t('form_validation.field_required')),
    slug: z.string().trim().min(1, t('form_validation.field_required')),
    description: z.string().nullable(),
    imageId: z.string().optional().nullable(),
    coverId: z.string().optional().nullable(),
  });

export type EditProfileData = ValidationSchemaFields<
  typeof EditProfileDataSchema
>;
