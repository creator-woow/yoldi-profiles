'use client';

import { ChangeEvent, FC, useState } from 'react';

import { EditProfileData, EditProfileModal } from 'features/editProfile';
import { Profile, ProfileImage, updateProfile } from 'entities/profile';
import { refreshSession, useAuth } from 'features/auth';
import { Button } from 'shared/ui/button';
import DeleteIcon from 'shared/icons/trash-bin.svg';
import LogoutIcon from 'shared/icons/logout.svg';
import PencilIcon from 'shared/icons/pencil.svg';
import PictureIcon from 'shared/icons/picture.svg';
import { RoutePath } from 'shared/lib/const';
import UploadIcon from 'shared/icons/upload.svg';
import { clientFetch } from 'shared/api/clientFetch';
import { logoutUser } from 'features/entry';
import { uploadImage } from 'shared/api/uploadImage';
import { useFetch } from 'shared/hooks/useFetch';
import { useRouter } from 'shared/lib/navigation';
import { useTranslations } from 'shared/hooks/useTranslations';

interface ProfilePageProps {
  profile: Profile;
}

export const ProfilePage: FC<ProfilePageProps> = ({
  profile: prefetchedProfile,
}) => {
  const router = useRouter();
  const t = useTranslations();
  const auth = useAuth();
  const [isEditOpen, setIsEditOpen] = useState(false);
  const { data: profile, mutate } = useFetch(
    `/user/${prefetchedProfile.slug}`,
    clientFetch.GET<Profile>,
    {
      fallbackData: prefetchedProfile,
      revalidateOnMount: false,
      revalidateOnFocus: false,
    },
  );

  const openEdit = () => setIsEditOpen(true);
  const closeEdit = () => setIsEditOpen(false);

  const isOwn = auth.profile?.slug === profile.slug;

  const uploadCover = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);
    // todo: add image upload
    await uploadImage(formData);
  };

  const handleDataChange = async (data: EditProfileData) => {
    await mutate(updateProfile(data), {
      optimisticData: { ...profile, ...data },
      rollbackOnError: true,
      populateCache: true,
    });

    // todo: After slug change, edit buttons hidden for a second, fix
    await refreshSession();

    if (data.slug !== profile.slug) {
      router.replace(`${RoutePath.ProfilesRoot}/${data.slug}`);
    }
  };

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
        {isOwn && (
          <Button
            className="centered-absolute opacity-0 peer-checked:opacity-100 group-hover:opacity-100 transition-opacity"
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
            <input
              className="absolute size-full opacity-0 cursor-pointer"
              type="file"
              accept="image/*"
              onChange={uploadCover}
            />
          </Button>
        )}
      </div>
      <div className="content-container text-md">
        <ProfileImage
          className="relative -mt-[50px]"
          size="lg"
          profile={profile}
          isEditable={isOwn}
        />
        <div className="mt-[35px] flex flex-col items-start tablet:flex-row tablet:items-baseline">
          <div className="flex flex-col gap-[15px] overflow-hidden w-full">
            <h2 className="title-md truncate">{profile.name}</h2>
            <span className="text-secondary truncate">{profile.email}</span>
          </div>
          {isOwn && (
            <>
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
                onChange={handleDataChange}
                onClose={closeEdit}
              />
            </>
          )}
        </div>
        {profile.description && (
          <p className="text-md mt-[30px] mb-[60px] overflow-hidden text-ellipsis">
            {profile.description}
          </p>
        )}
        {isOwn && (
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
        )}
      </div>
    </div>
  );
};
