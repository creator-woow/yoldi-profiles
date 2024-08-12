import { ZodSchema, z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { UseTranslationReturn } from 'shared/lib';

type ValidationSchemaGenerator = (t: UseTranslationReturn) => ZodSchema;

type ValidationSchemaFields<TGenerator extends ValidationSchemaGenerator> =
  z.infer<ReturnType<TGenerator>>;

export {
  z,
  zodResolver,
  type ValidationSchemaFields,
  type ValidationSchemaGenerator,
};
