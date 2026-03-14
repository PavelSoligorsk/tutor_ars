import Image from 'next/image';
import { cn } from '../lib/utils';

interface ImageContainerProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  contain?: boolean;
}

export function ImageContainer({ src, alt, width, height, className, contain = false }: ImageContainerProps) {
  const finalWidth = width ?? 600;
  const finalHeight = height ?? 400;

  return (
    <span className={cn('my-5 flex w-full justify-center px-4 md:px-0 dark:bg-gray-900 dark:shadow-gray-800/30 dark:text-white', className)}>
      <span
        className="relative flex justify-center items-center"
        style={{
          width: '100%',
          height: 'auto',
        }}
      >
        <Image
          src={src}
          alt={alt}
          width={finalWidth}
          height={finalHeight}
          sizes="(max-width: 896px) 100vw, 896px"
          className={cn(
            "rounded-lg shadow-md",
            contain 
              ? "object-contain w-full h-auto" 
              : "rounded-lg shadow-md object-contain max-h-[40rem] md:max-h-[20rem]"
          )}
        />
      </span>
    </span>
  );
}