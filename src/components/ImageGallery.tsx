'use client';

import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion as useMotionPrefersReduced } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import OptimizedImage from './OptimizedImage';

interface ImageGalleryProps {
  images: string[];
  columns?: 2 | 3 | 4;
  gap?: number;
  aspectRatio?: 'square' | 'video' | 'auto';
  enableLightbox?: boolean;
  className?: string;
}

export default function ImageGallery({
  images,
  columns = 3,
  gap = 4,
  aspectRatio = 'square',
  enableLightbox = true,
  className = '',
}: ImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const prefersReducedMotion = useMotionPrefersReduced();

  const aspectClasses = {
    square: 'aspect-square',
    video: 'aspect-video',
    auto: '',
  };

  const gridCols = {
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
  };

  const openLightbox = (index: number) => {
    if (enableLightbox) {
      setSelectedIndex(index);
      document.body.style.overflow = 'hidden';
    }
  };

  const closeLightbox = () => {
    setSelectedIndex(null);
    document.body.style.overflow = '';
  };

  const goToPrevious = useCallback(() => {
    if (selectedIndex !== null) {
      setSelectedIndex(selectedIndex === 0 ? images.length - 1 : selectedIndex - 1);
    }
  }, [selectedIndex, images.length]);

  const goToNext = useCallback(() => {
    if (selectedIndex !== null) {
      setSelectedIndex(selectedIndex === images.length - 1 ? 0 : selectedIndex + 1);
    }
  }, [selectedIndex, images.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      
      switch (e.key) {
        case 'Escape':
          closeLightbox();
          break;
        case 'ArrowLeft':
          goToPrevious();
          break;
        case 'ArrowRight':
          goToNext();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex, goToPrevious, goToNext]);

  if (images.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        No images available
      </div>
    );
  }

  return (
    <>
      {/* Gallery Grid */}
      <div
        className={`grid ${gridCols[columns]} ${className}`}
        style={{ gap: `${gap * 0.25}rem` }}
      >
        {images.map((image, index) => (
          <motion.div
            key={index}
            initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
            animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            transition={prefersReducedMotion ? { duration: 0 } : { delay: index * 0.03, duration: 0.35 }}
            className={`relative group cursor-pointer overflow-hidden bg-[#171717] border border-[#262626] hover:border-[#E85D04] transition-all duration-300 ${aspectClasses[aspectRatio]}`}
            onClick={() => openLightbox(index)}
          >
            <OptimizedImage
              src={image}
              alt={`Product image ${index + 1}`}
              fill
              fit="contain"
              className="bg-[#101010]"
              imageClassName={prefersReducedMotion ? 'p-3' : 'p-3 transition-transform duration-500 group-hover:scale-[1.03]'}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              priority={index === 0}
              fetchPriority={index === 0 ? 'high' : 'auto'}
            />
            
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/35 transition-all duration-300 flex items-center justify-center">
              <ZoomIn className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            {/* Image number */}
            <div className="absolute bottom-2 right-2 bg-black/60 px-2 py-1 text-xs text-white font-mono opacity-0 group-hover:opacity-100 transition-opacity">
              {index + 1} / {images.length}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center"
            onClick={closeLightbox}
          >
            {/* Close button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-50 p-2 bg-[#171717]/80 hover:bg-[#262626] rounded-full transition-colors"
              aria-label="Close lightbox"
            >
              <X className="w-6 h-6 text-white" />
            </button>

            {/* Navigation arrows */}
            {images.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    goToPrevious();
                  }}
                  className="absolute left-4 z-50 p-3 bg-[#171717]/80 hover:bg-[#262626] rounded-full transition-colors"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-6 h-6 text-white" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    goToNext();
                  }}
                  className="absolute right-4 z-50 p-3 bg-[#171717]/80 hover:bg-[#262626] rounded-full transition-colors"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-6 h-6 text-white" />
                </button>
              </>
            )}

            {/* Main image */}
            <motion.div
              key={selectedIndex}
              initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.96 }}
              animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, scale: 1 }}
              exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
              transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.2 }}
              className="relative w-full h-full max-w-6xl max-h-[85vh] mx-4 flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full h-full">
                <OptimizedImage
                  src={images[selectedIndex]}
                  alt={`Product image ${selectedIndex + 1}`}
                  fill
                  priority
                  fit="contain"
                  className="bg-black/20"
                  imageClassName="p-2 md:p-4"
                  sizes="100vw"
                  quality={100}
                  fetchPriority="high"
                />
              </div>
            </motion.div>

            {/* Thumbnail navigation */}
            {images.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 max-w-[90vw] overflow-x-auto px-4 py-2 bg-black/60 rounded-full">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedIndex(index);
                    }}
                    className={`flex-shrink-0 w-12 h-12 rounded overflow-hidden border-2 transition-all ${
                      index === selectedIndex
                        ? 'border-[#E85D04] opacity-100'
                        : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <div className="relative w-full h-full">
                      <OptimizedImage
                        src={image}
                        alt={`Thumbnail ${index + 1}`}
                        fill
                        fit="contain"
                        className="bg-[#151515]"
                        imageClassName="p-1"
                        sizes="48px"
                      />
                    </div>
                  </button>
                ))}
              </div>
            )}

            {/* Image counter */}
            <div className="absolute top-4 left-4 bg-black/60 px-4 py-2 rounded text-white font-mono text-sm">
              {selectedIndex + 1} / {images.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
