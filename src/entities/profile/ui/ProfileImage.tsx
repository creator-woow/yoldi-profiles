import { FC } from 'react';
import { Image } from 'shared/ui/image';

import { VariantProps, tv } from 'shared/utils/tv';
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
}

export const ProfileImage: FC<ProfileImageProps> = ({
  profile,
  size,
  className,
}) => {
  return (
    <div className={profileImageVariants({ size, className })}>
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
    </div>
  );
};
