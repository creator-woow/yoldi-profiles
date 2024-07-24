import { FC } from 'react';

import { Profile, ProfileImage } from 'entities/profile';
import {
  VirtualList,
  VirtualListAutoSizer,
  VirtualListChildProps,
} from 'shared/ui/virtualList';
import { Link } from 'shared/ui/link';
import { RoutePath } from 'shared/lib/const';

interface ProfilesVirtualListProps {
  profiles: Profile[];
}

export const ProfilesVirtualList: FC<ProfilesVirtualListProps> = ({
  profiles,
}) => {
  const ProfilePreview = ({ index, style }: VirtualListChildProps) => {
    const profile = profiles[index];
    return (
      <Link
        key={profile.slug}
        className="py-[10px] flex items-center border-primary border-b-1 gap-[20px] first-of-type:border-t-1"
        href={`${RoutePath.ProfilesRoot}/${profile.slug}`}
        style={style}
      >
        <ProfileImage
          profile={profile}
          size="md"
        />
        <div className="text-md truncate flex-auto flex flex-col tablet:flex-row tablet:gap-[20px] tablet:items-center ">
          <span className="font-medium text-primary">{profile.name}</span>
          <span className="text-secondary tablet:ml-auto">{profile.email}</span>
        </div>
      </Link>
    );
  };

  return (
    <VirtualListAutoSizer>
      {({ height, width }) => (
        <VirtualList
          overscanCount={5}
          itemSize={70}
          height={height}
          itemCount={profiles.length}
          width={width}
        >
          {ProfilePreview}
        </VirtualList>
      )}
    </VirtualListAutoSizer>
  );
};
