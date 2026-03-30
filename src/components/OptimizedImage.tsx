'use client';

import Image from 'next/image';
import type { ReactEventHandler } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  className?: string;
  imageClassName?: string;
  fill?: boolean;
  sizes?: string;
  quality?: number;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
  fit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
  loading?: 'lazy' | 'eager';
  fetchPriority?: 'high' | 'low' | 'auto';
  onError?: ReactEventHandler<HTMLImageElement>;
}

export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  priority = false,
  className = '',
  imageClassName = '',
  fill = false,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  quality = 90,
  placeholder = 'empty',
  blurDataURL,
  fit = 'contain',
  loading = 'lazy',
  fetchPriority = 'auto',
  onError,
}: OptimizedImageProps) {
  const resolvedLoading = priority ? undefined : loading;
  const resolvedWidth = fill ? undefined : (width ?? 1600);
  const resolvedHeight = fill ? undefined : (height ?? 1200);

  return (
    <div className={`relative ${className} ${fill ? 'w-full h-full' : ''}`}>
      <Image
        src={src}
        alt={alt}
        width={resolvedWidth}
        height={resolvedHeight}
        fill={fill}
        priority={priority}
        quality={quality}
        sizes={sizes}
        placeholder={placeholder}
        blurDataURL={blurDataURL}
        className={imageClassName}
        loading={resolvedLoading}
        fetchPriority={fetchPriority}
        onError={onError}
        draggable={false}
        style={{
          objectFit: fit,
          objectPosition: 'center',
          imageRendering: 'auto',
        }}
      />
    </div>
  );
}
