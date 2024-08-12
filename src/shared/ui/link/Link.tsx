import { CSSProperties, FC, PropsWithChildren } from 'react';

import { Link as NavLink, clsx } from 'shared/lib';

interface LinkProps extends PropsWithChildren {
  className?: string;
  href?: string;
  style?: CSSProperties;
  ariaLabel?: string;
}

export const Link: FC<LinkProps> = ({
  className,
  href = '',
  style,
  ariaLabel,
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
      aria-label={ariaLabel}
    >
      {children}
    </NavLink>
  );
};

Link.displayName = 'Link';
