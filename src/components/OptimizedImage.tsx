'use client';

import Image from 'next/image';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  className?: string;
  fill?: boolean;
  sizes?: string;
  quality?: number;
  placeholder?: 'blur' | 'empty'; 
}

export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  priority = false,
  className = '',
  fill = false,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  quality = 90,
}: OptimizedImageProps) {
  // SIMPLIFIED: No loading state, no error state, no timeouts.
  // Just render the image. If it fails, the browser handles it.
  
  return (
    <div className={`relative ${className} ${fill ? 'w-full h-full' : ''}`}>
      <Image
        src={src}
        alt={alt}
        width={fill ? undefined : width}
        height={fill ? undefined : height}
        fill={fill}
        priority={priority}
        quality={quality}
        sizes={sizes}
        className={fill ? 'object-cover' : ''}
        unoptimized={true} // Force bypass of Next.js Image Optimization API
      />
    </div>
  );
}
