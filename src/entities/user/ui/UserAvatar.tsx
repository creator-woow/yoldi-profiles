import { ChangeEvent, FC } from 'react';

import { VariantProps, tv, useTranslations } from 'shared/lib';
import { CameraIcon } from 'shared/icons';
import { Image } from 'shared/ui';

import { User } from '../model';

const userAvatarVariants = tv({
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

interface UserAvatar extends VariantProps<typeof userAvatarVariants> {
  className?: string;
  user: User;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const UserAvatar: FC<UserAvatar> = ({
  user,
  size,
  className,
  onChange,
}) => {
  const t = useTranslations();

  return (
    <div
      className={userAvatarVariants({
        size,
        className: `${className} group`,
      })}
    >
      {user.image ? (
        <Image
          className="size-full"
          src={user.image.url}
          alt={t('a11y_only.image_of', { subject: user.name })}
          width={100}
          height={100}
        />
      ) : (
        user.name[0]
      )}
      {onChange && (
        <div className="absolute size-full flex items-center justify-center bg-accent text-bg-accent-contrast opacity-0 group-hover:opacity-100 transition-opacity">
          <CameraIcon
            width={41}
            height={32}
          />
          <input
            aria-label={t('a11y_only.image_input')}
            className="absolute size-full opacity-0 cursor-pointer"
            type="file"
            accept="image/*"
            onChange={onChange}
          />
        </div>
      )}
    </div>
  );
};
