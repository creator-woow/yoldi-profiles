import { FC } from 'react';
import { useSearchParams } from 'next/navigation';

import { Profile, ProfileImage } from 'entities/profile';
import {
  VirtualList,
  VirtualListAutoSizer,
  VirtualListChildProps,
} from 'shared/ui/virtualList';
import { Link } from 'shared/ui/link';
import { RoutePath } from 'shared/lib/const';
import { useRouter } from 'shared/hooks/useRouter';

interface ProfilesVirtualListProps {
  profiles: Profile[];
}

const SCROLL_INDEX_PARAM_NAME = 'si';
const ITEM_HEIGHT = 70;

export const ProfilesVirtualList: FC<ProfilesVirtualListProps> = ({
  profiles,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialVisibleIndex = +(searchParams.get(SCROLL_INDEX_PARAM_NAME) ?? 1);

  const saveScrollPosition = (index: number) => {
    router.replace(`?${SCROLL_INDEX_PARAM_NAME}=${index}`);
  };

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
          <span className="font-medium text-primary truncate">
            {profile.name}
          </span>
          <span className="text-secondary tablet:ml-auto">{profile.email}</span>
        </div>
      </Link>
    );
  };

  return (
    <VirtualListAutoSizer>
      {({ height, width }) => (
        <VirtualList
          initialScrollOffset={initialVisibleIndex * ITEM_HEIGHT}
          overscanCount={5}
          itemSize={ITEM_HEIGHT}
          height={height}
          itemCount={profiles.length}
          width={width}
          onItemsRendered={(props) =>
            saveScrollPosition(props.visibleStartIndex)
          }
        >
          {ProfilePreview}
        </VirtualList>
      )}
    </VirtualListAutoSizer>
  );
};
