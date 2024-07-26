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
import { useDebouncedCallback } from 'shared/hooks/useDebounceCallback';

interface ProfilesVirtualListProps {
  profiles: Profile[];
}

const SCROLL_INDEX_PARAM_NAME = 'si';
const ITEM_HEIGHT = 70;

const ProfilePreview = ({
  index,
  data: profiles,
  style,
}: VirtualListChildProps<Profile[]>) => {
  const profile = profiles[index];

  return (
    <Link
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

export const ProfilesVirtualList: FC<ProfilesVirtualListProps> = ({
  profiles,
}) => {
  const searchParams = useSearchParams();
  const initialVisibleIndex = +(searchParams.get(SCROLL_INDEX_PARAM_NAME) ?? 1);

  const saveVisibleIndex = (index: number) => {
    window.history.replaceState(
      null,
      '',
      `?${SCROLL_INDEX_PARAM_NAME}=${index}`,
    );
  };

  const debounceIndexSave = useDebouncedCallback(saveVisibleIndex, 200);

  const handleItemsRender = (firstVisibleIndex: number) => {
    debounceIndexSave.cancel();
    debounceIndexSave(firstVisibleIndex);
  };

  return (
    <VirtualListAutoSizer>
      {({ height, width }) => (
        <VirtualList
          itemData={profiles}
          itemKey={(index) => profiles[index].slug}
          initialScrollOffset={initialVisibleIndex * ITEM_HEIGHT}
          overscanCount={5}
          itemSize={ITEM_HEIGHT}
          height={height}
          itemCount={profiles.length}
          width={width}
          onItemsRendered={(props) =>
            handleItemsRender(props.visibleStartIndex)
          }
        >
          {ProfilePreview}
        </VirtualList>
      )}
    </VirtualListAutoSizer>
  );
};
