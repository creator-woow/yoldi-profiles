import { FC, PropsWithChildren } from 'react';

import { MODAL_CONTAINER_ID } from 'shared/ui';

import { Header } from './Header';

export const MainLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="flex flex-col h-dvh">
      <Header />
      <div className="flex flex-col flex-auto overflow-hidden relative">
        <main className="flex-auto overflow-auto">{children}</main>
        <div
          className="absolute inset-0 empty:hidden z-50"
          id={MODAL_CONTAINER_ID}
        />
      </div>
    </div>
  );
};
