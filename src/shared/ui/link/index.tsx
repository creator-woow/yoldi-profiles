import { FC, PropsWithChildren, ReactNode } from 'react';

import { Link as NavLink } from 'shared/lib/navigation';

import { clsx } from 'shared/utils/clsx';

type LinkProps = PropsWithChildren<{
  className?: string;
  href?: string;
  children: ReactNode;
}>;

export const Link: FC<LinkProps> = ({ className, href = '', children }) => {
  return (
    <NavLink
      className={clsx(
        className,
        'text-accent hover:opacity-70',
        'transition-opacity duration-200',
      )}
      href={href}
    >
      {children}
    </NavLink>
  );
};

Link.displayName = 'Link';
