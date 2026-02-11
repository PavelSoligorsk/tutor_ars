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
    <div className={cn('my-5 flex justify-center w-full px-4 md:px-0', className)}>
      <div
        className="relative w-full"
        style={{
          aspectRatio: `${finalWidth}/${finalHeight}`,
          maxWidth: '100%',
          maxHeight: '700px',
        }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 896px) 100vw, 896px"
          className="rounded-lg shadow-md object-contain"
        />
      </div>
    </div>
  );
}
