'use client';

import { FC } from 'react';
import { Theme } from 'shared/config/theme';
import { useTheme } from 'shared/hooks/useTheme';

import { Link } from 'shared/ui/link';
import LogoDarkIcon from 'shared/icons/logo-dark.svg';
import LogoLightIcon from 'shared/icons/logo-light.svg';
import { ProfileImage } from 'entities/profile';
import { RoutePath } from 'shared/lib/const';
import { buttonVariants } from 'shared/ui/button';
import { useAuth } from 'features/auth';
import { useTranslations } from 'shared/hooks/useTranslations';

export const Header: FC = () => {
  const t = useTranslations();
  const { profile } = useAuth();
  const { theme } = useTheme();

  return (
    <header className="py-[15px] px-[20px] flex items-center border-b-1 border-b-primary">
      <div className="flex items-center gap-[20px] mr-5 flex-shrink-0">
        <Link href={RoutePath.ProfilesRoot}>
          {theme === Theme.light && (
            <LogoLightIcon
              width={80}
              height={50}
            />
          )}
          {theme === Theme.dark && (
            <LogoDarkIcon
              width={80}
              height={50}
            />
          )}
          {theme === Theme.system && (
            <>
              <LogoLightIcon
                className="dark:hidden"
                width={80}
                height={50}
              />
              <LogoDarkIcon
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
            href={`${RoutePath.ProfilesRoot}/${profile.slug}`}
          >
            <div className="truncate">{profile.name}</div>
            <ProfileImage
              profile={profile}
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
