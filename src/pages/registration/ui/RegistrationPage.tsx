'use client';

import { FC } from 'react';

import { Button, Form, Link, TextField } from 'shared/ui';
import { MailIcon, UserIcon } from 'shared/icons';
import {
  PasswordField,
  RegistrationData,
  RegistrationDataSchema,
  registerUser,
} from 'features/auth';
import {
  RoutePath,
  useForm,
  useRouter,
  useTranslations,
  zodResolver,
} from 'shared/lib';

export const RegistrationPage: FC = () => {
  const t = useTranslations();
  const router = useRouter();

  const dataSchema = RegistrationDataSchema(t);
  const { handleSubmit, register, formState, setError } =
    useForm<RegistrationData>({
      resolver: zodResolver(dataSchema),
      mode: 'onChange',
    });

  const footerText = t.rich('registration_page.if_account_exists', {
    link: (chunks) => (
      <Link
        className="text-primary font-medium"
        href={RoutePath.Login}
      >
        {chunks}
      </Link>
    ),
  });

  const onSubmit = handleSubmit((data) =>
    registerUser(data).then((responseError) => {
      if (!responseError) {
        return router.push(RoutePath.UsersRoot);
      }
      setError('email', { message: responseError.message });
    }),
  );

  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex-auto bg-secondary tablet:flex tablet:items-center tablet:justify-center">
        <div className="bg-primary p-[30px] size-full tablet:border-1 tablet:border-primary tablet:size-auto tablet:min-w-[400px]">
          <h1 className="title-md mb-[25px] whitespace-pre-line">
            {t('registration_page.title')}
          </h1>
          <Form onSubmit={onSubmit}>
            <div className="flex flex-col gap-[15px]">
              <TextField
                {...register('name')}
                autoFocus
                placeholder={t('entry.name_field')}
                error={!!formState.errors.name}
                helperText={formState.errors.name?.message}
                icon={
                  <UserIcon
                    width={17}
                    heigth={19}
                  />
                }
              />
              <TextField
                {...register('email')}
                type="email"
                placeholder={t('entry.email_field')}
                error={!!formState.errors.email}
                helperText={formState.errors.email?.message}
                icon={
                  <MailIcon
                    width={21}
                    heigth={15}
                  />
                }
              />
              <PasswordField
                {...register('password')}
                placeholder={t('entry.password_field')}
                error={!!formState.errors.password}
                helperText={formState.errors.password?.message}
              />
            </div>
            <Button
              className="mt-[25px]"
              variant="accent"
              size="xl"
              disabled={formState.isSubmitting || !formState.isValid}
              type="submit"
            >
              {t('entry.create_account')}
            </Button>
          </Form>
        </div>
      </div>
      <div className="flex flex-shrink-0 justify-center items-center border-t-1 border-primary text-md text-secondary gap-[4px] py-[23px]">
        {footerText}
      </div>
    </div>
  );
};
