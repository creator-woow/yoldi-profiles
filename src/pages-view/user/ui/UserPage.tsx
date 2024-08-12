import { FC } from 'react';

import { UserAvatar, getUser } from 'entities/user';
import { getTranslations } from 'shared/lib';

export interface UserPageProps {
  params: {
    userSlug: string;
  };
}

export const UserPage: FC<UserPageProps> = async ({ params }) => {
  const [t, user] = await Promise.all([
    getTranslations(),
    getUser(params.userSlug),
  ]);

  return (
    <div>
      <h1 className="visually-hidden">
        {t('user_page.title', { name: user.name })}
      </h1>
      <div
        className="group h-[200px] bg-secondary w-full border-b-1 border-primary bg-center bg-no-repeat bg-cover relative"
        style={{
          backgroundImage: user.cover ? `url(${user.cover.url})` : '',
        }}
      />
      <div className="content-container text-md">
        <UserAvatar
          className="relative -mt-[50px]"
          size="lg"
          user={user}
        />
        <div className="mt-[35px] mb-[30px] flex flex-col items-start tablet:flex-row tablet:items-baseline">
          <div className="flex flex-col gap-[15px] overflow-hidden w-full">
            <h2 className="title-md truncate">{user.name}</h2>
            <span className="text-secondary truncate">{user.email}</span>
          </div>
        </div>
        {user.description && (
          <p className="text-md mb-[60px] overflow-hidden text-ellipsis">
            {user.description}
          </p>
        )}
      </div>
    </div>
  );
};
