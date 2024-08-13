import { FC } from 'react';
import { useSearchParams } from 'next/navigation';

import {
  Link,
  VirtualList,
  VirtualListAutoSizer,
  VirtualListChildProps,
} from 'shared/ui';
import { RoutePath, useDebouncedCallback } from 'shared/lib';
import { User, UserAvatar } from 'entities/user';
import { Profile } from 'entities/profile';

interface UsersVirtualList {
  users: User[];
}

const SCROLL_INDEX_PARAM_NAME = 'si';
const ITEM_HEIGHT = 70;

const UserPreview = ({
  index,
  data: users,
  style,
}: VirtualListChildProps<Profile[]>) => {
  const user = users[index];

  return (
    <Link
      className="py-[10px] flex items-center border-primary border-b-1 gap-[20px] first-of-type:border-t-1"
      href={`${RoutePath.UsersRoot}/${user.slug}`}
      style={style}
    >
      <UserAvatar
        user={user}
        size="md"
      />
      <div className="text-md truncate flex-auto flex flex-col tablet:flex-row tablet:gap-[20px] tablet:items-center ">
        <span className="font-medium text-primary truncate">{user.name}</span>
        <span className="text-secondary tablet:ml-auto">{user.email}</span>
      </div>
    </Link>
  );
};

export const UsersVirtualList: FC<UsersVirtualList> = ({ users }) => {
  const searchParams = useSearchParams();
  const initialVisibleIndex = +(
    searchParams?.get(SCROLL_INDEX_PARAM_NAME) ?? 1
  );

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
          itemData={users}
          itemKey={(index) => users[index].slug}
          initialScrollOffset={initialVisibleIndex * ITEM_HEIGHT}
          overscanCount={5}
          itemSize={ITEM_HEIGHT}
          height={height}
          itemCount={users.length}
          width={width}
          onItemsRendered={(props) =>
            handleItemsRender(props.visibleStartIndex)
          }
        >
          {UserPreview}
        </VirtualList>
      )}
    </VirtualListAutoSizer>
  );
};
