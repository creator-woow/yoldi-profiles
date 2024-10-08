'use client';

import { FC } from 'react';

import { Link, buttonVariants } from 'shared/ui';
import { LogoDark, LogoLight } from 'shared/icons';
import { RoutePath, useTheme, useTranslations } from 'shared/lib';
import { Theme } from 'shared/config';
import { UserAvatar } from 'entities/user';
import { useAuth } from 'features/auth';

export const Header: FC = () => {
  const t = useTranslations();
  const { profile } = useAuth();
  const { theme } = useTheme();

  return (
    <header className="py-[15px] px-[20px] flex items-center border-b-1 border-b-primary">
      <div className="flex items-center gap-[20px] mr-5 flex-shrink-0">
        <Link
          href={RoutePath.UsersRoot}
          ariaLabel={t('header.logo_link')}
        >
          {theme === Theme.light && (
            <LogoLight
              width={80}
              height={50}
            />
          )}
          {theme === Theme.dark && (
            <LogoDark
              width={80}
              height={50}
            />
          )}
          {theme === Theme.system && (
            <>
              <LogoLight
                className="dark:hidden"
                width={80}
                height={50}
              />
              <LogoDark
                className="hidden dark:block"
                width={80}
                height={50}
              />
            </>
          )}
        </Link>
        <span className="hidden text-md max-w-[225px] tablet:block">
          {t('header.motto')}
        </span>
      </div>
      <div className="ml-auto text-md overflow-hidden">
        {profile ? (
          <Link
            className="flex items-center gap-[20px]"
            href={RoutePath.Profile}
          >
            <div className="truncate">{profile.name}</div>
            <UserAvatar
              user={profile}
              size="md"
            />
          </Link>
        ) : (
          <Link
            className={buttonVariants({
              variant: 'outlined',
              size: 'md',
              textColor: 'primary',
            })}
            href={RoutePath.Login}
          >
            {t('entry.login')}
          </Link>
        )}
      </div>
    </header>
  );
};
