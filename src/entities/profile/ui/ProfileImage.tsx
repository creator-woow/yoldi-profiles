import { ChangeEvent, FC } from 'react';
import { clsx } from 'shared/utils/clsx';

import { VariantProps, tv } from 'shared/utils/tv';
import CameraIcon from 'shared/icons/camera.svg';
import { Image } from 'shared/ui/image';
import { Profile } from 'entities/profile';

const profileImageVariants = tv({
  base: 'rounded-circle border-1 border-primary flex items-center justify-center bg-secondary capitalize flex-shrink-0 overflow-hidden',
  variants: {
    size: {
      md: 'h-[50px] w-[50px] text-lg',
      lg: 'h-[100px] w-[100px] title-lg',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

interface ProfileImageProps extends VariantProps<typeof profileImageVariants> {
  className?: string;
  profile: Profile;
  isEditable?: boolean;
  onUpload?: (file: File) => void;
}

export const ProfileImage: FC<ProfileImageProps> = ({
  profile,
  size,
  isEditable,
  className,
  onUpload = () => null,
}) => {
  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file && onUpload) {
      onUpload(file);
    }
  };

  return (
    <div
      className={profileImageVariants({
        size,
        className: `${className} group`,
      })}
    >
      {profile.image ? (
        <Image
          className="size-full"
          src={profile.image.url}
          alt={profile.name}
          width={100}
          height={100}
        />
      ) : (
        profile.name[0]
      )}
      {isEditable && (
        <>
          <input
            className="absolute peer opacity-0 size-full desktop:hidden"
            type="checkbox"
          />
          <div
            className={clsx(
              'absolute size-full flex items-center justify-center bg-accent text-bg-accent-contrast',
              'opacity-0 peer-checked:opacity-100 group-focus-within:opacity-100 group-hover:opacity-100 transition-opacity',
            )}
          >
            <CameraIcon
              width={41}
              height={32}
            />
            <input
              className="absolute size-full opacity-0 cursor-pointer"
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
            />
          </div>
        </>
      )}
    </div>
  );
};
