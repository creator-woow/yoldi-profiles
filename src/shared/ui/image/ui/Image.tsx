import { FC } from 'react';
import NextImage from 'next/image';

interface ImageProps {
  className?: string;
  width: number;
  height: number;
  src?: string;
  alt?: string;
  priority?: boolean;
}

export const Image: FC<ImageProps> = ({
  className,
  alt = '',
  src = '',
  height,
  priority,
  width,
}) => {
  return (
    <NextImage
      className={className}
      src={src}
      alt={alt}
      height={height}
      width={width}
      priority={priority}
    />
  );
};
