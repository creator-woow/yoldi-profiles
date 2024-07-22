import { FC } from 'react';

import { ProfileImage, getProfile } from 'entities/profile';
import { Button } from 'shared/ui/button';
import DeleteIcon from 'shared/icons/trash-bin.svg';
import LogoutIcon from 'shared/icons/logout.svg';
import PencilIcon from 'shared/icons/pencil.svg';
import PictureIcon from 'shared/icons/picture.svg';
import UploadIcon from 'shared/icons/upload.svg';
import { getTranslations } from 'shared/lib/intl';

export interface ProfilePageProps {
  params: {
    profileSlug: string;
  };
}

export const ProfilePage: FC<ProfilePageProps> = async ({ params }) => {
  const [t, profile] = await Promise.all([
    getTranslations(),
    getProfile(params.profileSlug),
  ]);

  return (
    <div>
      <h1 className="visually-hidden">
        {t('profile_page.title', { name: profile.name })}
      </h1>
      <div
        className="group h-[200px] bg-secondary w-full border-b-1 border-primary bg-center bg-no-repeat bg-cover relative"
        style={{
          backgroundImage: profile.cover ? `url(${profile.cover.url})` : '',
        }}
      >
        <input
          className="peer opacity-0 size-full desktop:hidden"
          type="checkbox"
        />
        <Button
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 invisible peer-checked:visible group-hover:visible"
          leftIcon={
            profile.cover ? (
              <DeleteIcon
                width={17}
                heigth={19}
              />
            ) : (
              <UploadIcon
                width={14}
                heigth={19}
              />
            )
          }
          rightIcon={
            <PictureIcon
              width={22}
              heigth={17}
            />
          }
        >
          {profile.cover
            ? t('edit_profile.delete_cover')
            : t('edit_profile.upload_cover')}
        </Button>
      </div>
      <div className="content-container text-md">
        <ProfileImage
          className="relative -mt-[50px]"
          size="lg"
          profile={profile}
        />
        <div className="mt-[35px] flex flex-col items-start tablet:flex-row tablet:items-baseline">
          <div className="flex flex-col gap-[15px]">
            <h2 className="title-md">{profile.name}</h2>
            <span className="text-secondary">{profile.email}</span>
          </div>
          <Button
            className="mt-[10px] tablet:ml-auto tablet:mt-0"
            leftIcon={
              <PencilIcon
                width={19}
                height={19}
              />
            }
            variant="outlined"
            size="md"
          >
            {t('edit_profile.edit')}
          </Button>
        </div>
        {profile.description && (
          <p className="text-md mt-[30px]">{profile.description}</p>
        )}
        <Button
          className="mt-[60px]"
          leftIcon={
            <LogoutIcon
              width={19}
              height={19}
            />
          }
          variant="outlined"
          size="md"
        >
          {t('entry.logout')}
        </Button>
      </div>
    </div>
  );
};
