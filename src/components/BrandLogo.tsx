'use client';

import Image from 'next/image';

interface BrandLogoProps {
  brand: 'asian' | 'm1' | 'true';
  variant?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const logoConfig = {
  asian: {
    src: '/images/brands/ASIAN.png',
    fallbackSrc: '/images/brands/ASIAN.png',
    alt: 'Asian Wires & Cables',
    width: 200,
    height: 60,
  },
  m1: {
    src: '/images/brands/M1_VOICE.png',
    fallbackSrc: '/images/brands/M1_VOICE.png',
    alt: 'M1 VOICE',
    width: 200,
    height: 60,
  },
  true: {
    src: '/images/brands/True_MAster.png',
    fallbackSrc: '/images/brands/True_MAster.png',
    alt: 'True Master',
    width: 200,
    height: 60,
  },
};

const sizeConfig = {
  sm: { height: 40, width: undefined as number | undefined },
  md: { height: 80, width: undefined as number | undefined },
  lg: { height: 120, width: undefined as number | undefined },
};

export default function BrandLogo({
  brand,
  variant = 'light',
  size = 'md',
  className = '',
}: BrandLogoProps) {
  const config = logoConfig[brand];
  const sizeValues = sizeConfig[size];

  // Calculate aspect ratio (approximate based on logo dimensions)
  const aspectRatio = config.width / config.height;
  const calculatedWidth = sizeValues.height * aspectRatio;

  return (
    <div 
      className={`relative flex items-center justify-center ${className}`}
      style={{ 
        height: sizeValues.height, 
        width: calculatedWidth 
      }}
    >
      <Image
        src={config.src}
        alt={config.alt}
        fill
        priority
        className="object-contain"
        sizes={`${calculatedWidth}px`}
        onError={(e) => {
          // Fallback to PNG if SVG fails
          const img = e.target as HTMLImageElement;
          img.src = config.fallbackSrc;
        }}
      />
    </div>
  );
}
