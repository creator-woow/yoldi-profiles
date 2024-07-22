import { CSSProperties, FC, PropsWithChildren } from 'react';

import { Link as NavLink } from 'shared/lib/navigation';

import { clsx } from 'shared/utils/clsx';

interface LinkProps extends PropsWithChildren {
  className?: string;
  href?: string;
  style?: CSSProperties;
}

export const Link: FC<LinkProps> = ({
  className,
  href = '',
  style,
  children,
}) => {
  return (
    <NavLink
      className={clsx(
        className,
        'hover:opacity-70',
        'transition-opacity duration-200',
      )}
      style={style}
      href={href}
    >
      {children}
    </NavLink>
  );
};

Link.displayName = 'Link';
