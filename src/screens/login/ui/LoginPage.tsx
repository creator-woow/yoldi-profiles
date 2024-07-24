'use client';

import { FC } from 'react';

import { LoginData, LoginDataSchema, loginUser } from 'features/entry';
import { Button } from 'shared/ui/button';
import EmailIcon from 'shared/icons/mail.svg';
import { Form } from 'shared/ui/form';
import { Link } from 'shared/ui/link';
import { PasswordField } from 'features/entry/ui/PasswordField';
import { ResponseError } from 'shared/api/http';
import { RoutePath } from 'shared/lib/const';
import { TextField } from 'shared/ui/textField';
import { useForm } from 'shared/hooks/useForm';
import { useRouter } from 'shared/hooks/useRouter';
import { useTranslations } from 'shared/hooks/useTranslations';
import { zodResolver } from 'shared/lib/validator';

export const LoginPage: FC = () => {
  const t = useTranslations();
  const router = useRouter();

  const dataSchema = LoginDataSchema(t);
  const { handleSubmit, register, formState, setError } = useForm<LoginData>({
    resolver: zodResolver(dataSchema),
  });
  const onSubmit = handleSubmit((data) =>
    loginUser(data)
      .then(() => router.push(RoutePath.ProfilesRoot))
      .catch((error: ResponseError) =>
        setError('root', { message: error.message }),
      ),
  );

  const footerText = t.rich('login_page.if_no_account', {
    link: (chunks) => (
      <Link
        className="text-primary font-medium"
        href={RoutePath.Registration}
      >
        {chunks}
      </Link>
    ),
  });

  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex-auto bg-secondary tablet:flex tablet:items-center tablet:justify-center">
        <div className="bg-primary p-[30px] size-full tablet:border-1 tablet:border-primary tablet:size-auto tablet:min-w-[400px]">
          <h1 className="title-md mb-[25px] whitespace-pre-line">
            {t('login_page.title')}
          </h1>
          <Form onSubmit={onSubmit}>
            <div className="flex flex-col gap-[15px]">
              <TextField
                {...register('email')}
                type="email"
                placeholder={t('entry.email_field')}
                error={!!formState.errors.email || !!formState.errors.root}
                helperText={formState.errors.email?.message}
                icon={
                  <EmailIcon
                    width={21}
                    heigth={15}
                  />
                }
              />
              <PasswordField
                {...register('password')}
                placeholder={t('entry.password_field')}
                error={!!formState.errors.password || !!formState.errors.root}
                helperText={
                  formState.errors.password?.message ||
                  formState.errors.root?.message
                }
              />
            </div>
            <Button
              className="mt-[25px]"
              variant="accent"
              size="xl"
              textColor="white"
              disabled={formState.isSubmitting || !formState.isValid}
              type="submit"
            >
              {t('entry.login')}
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
