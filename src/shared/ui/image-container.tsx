import Image from 'next/image';

import { cn } from '../lib/utils';

interface ImageContainerProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
}

export function ImageContainer({ src, alt, width, height, className }: ImageContainerProps) {
  const finalWidth = width ?? 600;
  const finalHeight = height ?? 400;

  return (
    <span className={cn('my-5 flex w-full justify-center px-4 md:px-0', className)}>
      <span
        className="relative w-full"
        style={{
          aspectRatio: `${finalWidth}/${finalHeight}`,
          maxWidth: '100%',
          maxHeight: '30rem',
        }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 896px) 100vw, 896px"
          className="rounded-lg shadow-md object-contain max-h-[40rem] md:max-h-[20rem]"
        />
      </span>
    </span>
  );
}