'use client';

import { FC } from 'react';

import { Image } from 'shared/ui/image';
import { Link } from 'shared/ui/link';
import { ProfileImage } from 'entities/profile';
import { RoutePath } from 'shared/lib/const';
import { buttonVariants } from 'shared/ui/button';
import { useAuth } from 'features/auth';
import { useTranslations } from 'shared/hooks/useTranslations';

export const Header: FC = () => {
  const t = useTranslations();
  const { profile } = useAuth();

  return (
    <header className="py-[15px] px-[20px] flex items-center border-b-1 border-b-primary">
      <div className="flex items-center gap-[20px] mr-5 flex-shrink-0">
        <Link href={RoutePath.ProfilesRoot}>
          <Image
            src="/assets/logo.svg"
            alt="Yoldi"
            width={80}
            height={50}
          />
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
