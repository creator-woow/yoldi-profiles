'use client';

import { ChangeEvent, FC, useState } from 'react';

import {
  LogoutIcon,
  PencilIcon,
  PictureIcon,
  TrashBinIcon,
  UploadIcon,
} from 'shared/icons';
import { useFetch, useTranslations } from 'shared/lib';
import { Button } from 'shared/ui';
import { Profile } from 'entities/profile';
import { UserAvatar } from 'entities/user';
import { logoutUser } from 'features/auth';
import { uploadImage } from 'shared/api';

import { EditProfileData } from '../model/schema';
import { EditProfileModal } from './EditProfileModal';
import { editProfile } from '../api';

interface ProfilePageProps {
  profile: Profile;
}

export const ProfilePage: FC<ProfilePageProps> = ({
  profile: prefetchedProfile,
}) => {
  const t = useTranslations();
  const [isEditOpen, setIsEditOpen] = useState(false);

  // Set fetcher to null for prevent requests, key in need to be passed for optimistic functionality,
  // actual data for profile gets from app root on server render.
  const { data: profile, mutate } = useFetch<Profile>('/profile', null, {
    fallbackData: prefetchedProfile,
  });

  if (!profile) return null;

  const openEdit = () => setIsEditOpen(true);
  const closeEdit = () => setIsEditOpen(false);

  const uploadCover = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);
    const imageInfo = await uploadImage(formData);
    await editProfile({ ...profile, coverId: imageInfo.id });
  };

  const removeCover = async () => {
    await editProfile({ ...profile, coverId: null });
  };

  const changeAvatar = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);
    const imageInfo = await uploadImage(formData);
    await editProfile({ ...profile, imageId: imageInfo.id });
  };

  const handleDataChange = async (data: EditProfileData) => {
    await mutate(editProfile(data), {
      optimisticData: { ...profile, ...data },
      rollbackOnError: true,
    });
  };

  return (
    <div>
      <h1 className="visually-hidden">
        {t('user_page.title', { name: profile.name })}
      </h1>
      <div
        className="group h-[200px] bg-secondary w-full border-b-1 border-primary bg-center bg-no-repeat bg-cover relative"
        style={{
          backgroundImage: profile.cover ? `url(${profile.cover.url})` : '',
        }}
      >
        <Button
          className="centered-absolute opacity-0 group-hover:opacity-100 transition-opacity"
          leftIcon={
            profile.cover ? (
              <TrashBinIcon
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
          onClick={profile.cover ? removeCover : undefined}
        >
          {profile.cover
            ? t('edit_profile.delete_cover')
            : t('edit_profile.upload_cover')}
        </Button>
        {!profile.cover && (
          <input
            className="absolute size-full opacity-0 cursor-pointer"
            aria-label={t('a11y_only.image_input')}
            type="file"
            accept="image/*"
            onChange={uploadCover}
          />
        )}
      </div>
      <div className="content-container text-md">
        <UserAvatar
          className="relative -mt-[50px]"
          size="lg"
          user={profile}
          onChange={changeAvatar}
        />
        <div className="mt-[35px] mb-[30px] flex flex-col items-start tablet:flex-row tablet:items-baseline">
          <div className="flex flex-col gap-[15px] overflow-hidden w-full">
            <h2 className="title-md truncate">{profile.name}</h2>
            <span className="text-secondary truncate">{profile.email}</span>
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
            onClick={openEdit}
          >
            {t('edit_profile.edit')}
          </Button>
          <EditProfileModal
            profile={profile}
            isOpen={isEditOpen}
            onClose={closeEdit}
            onChange={handleDataChange}
          />
        </div>
        {profile.description && (
          <p className="text-md mb-[60px] overflow-hidden text-ellipsis">
            {profile.description}
          </p>
        )}
        <Button
          className="mb-10"
          leftIcon={
            <LogoutIcon
              width={19}
              height={19}
            />
          }
          variant="outlined"
          size="md"
          onClick={() => logoutUser()}
        >
          {t('entry.logout')}
        </Button>
      </div>
    </div>
  );
};
