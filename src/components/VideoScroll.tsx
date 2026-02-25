'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import { useVideoScroll } from '@/hooks/useVideoScroll';
import { AlertCircle, Loader2 } from 'lucide-react';

interface VideoScrollProps {
  src: string;
  wireType: 'speaker' | 'coaxial' | 'multicore';
  tier: 'master' | 'm1' | 'pro';
  className?: string;
}

/**
 * Scroll-controlled video player component
 * Maps scroll progress to video playback position for smooth scrubbing effect
 */
export const VideoScroll: React.FC<VideoScrollProps> = ({
  src,
  wireType,
  tier,
  className = '',
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [posterUrl, setPosterUrl] = useState<string>('');

  // Use custom hook for scroll synchronization
  const { isReady, progress } = useVideoScroll({
    videoRef,
    duration: 5, // 5 seconds = 150 frames @ 30fps
    start: 'top bottom',
    end: 'bottom top',
    scrub: 0.5, // Add some smoothing
  });

  // Generate poster URL based on wire type
  useEffect(() => {
    // In a real app, this would point to actual generated frames or a poster
    // Using product images as fallback posters for now
    setPosterUrl(`/images/product-${wireType === 'speaker' ? '1' : wireType === 'coaxial' ? '2' : '3'}.webp`);
  }, [wireType]);

  // Handle video metadata loaded
  const handleLoadedMetadata = useCallback(() => {
    if (videoRef.current) {
      // Pause video and set initial frame
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      setIsLoaded(true);
    }
  }, []);

  // Handle video error
  const handleError = useCallback(() => {
    console.warn('Video failed to load, falling back to image:', src);
    setHasError(true);
  }, [src]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full bg-[var(--background-secondary)] rounded-lg overflow-hidden border border-[var(--border-subtle)] group ${className}`}
    >
      {/* Loading state */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-[var(--background-primary)]/80 backdrop-blur-sm z-10">
          <div className="flex flex-col items-center gap-3">
            <Loader2 className="w-8 h-8 text-[var(--accent-primary)] animate-spin" />
            <p className="text-[var(--accent-primary)] font-mono text-xs uppercase tracking-wider">
              Initializing View...
            </p>
          </div>
        </div>
      )}

      {/* Error/Fallback state */}
      {hasError ? (
        <div className="relative w-full h-full">
          <img
            src={posterUrl}
            alt={`${tier} ${wireType} wire`}
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/20 p-4 text-center">
            <AlertCircle className="w-8 h-8 text-[var(--foreground-tertiary)] mb-2" />
            <p className="text-[var(--foreground-secondary)] font-mono text-xs">
              3D View Unavailable
            </p>
          </div>
        </div>
      ) : (
        <video
          ref={videoRef}
          src={src}
          poster={posterUrl}
          preload="auto"
          muted
          playsInline
          loop={false}
          className="w-full h-full object-cover"
          onLoadedMetadata={handleLoadedMetadata}
          onError={handleError}
          style={{
            opacity: isLoaded ? 1 : 0,
            transition: 'opacity 0.5s ease',
          }}
        />
      )}

      {/* Overlay UI */}
      <div className="absolute top-4 left-4 z-10">
        <div className="flex items-center gap-2 px-3 py-1.5 bg-[var(--background-primary)]/80 backdrop-blur-md rounded-full border border-[var(--border-subtle)]">
          <div
            className={`w-2 h-2 rounded-full ${
              tier === 'master' ? 'bg-[#E85D04]' : 
              tier === 'm1' ? 'bg-[#D4A574]' : 'bg-[#6B7280]'
            }`}
          />
          <span className="text-[var(--foreground-primary)] font-mono text-[10px] uppercase tracking-wider">
            {tier} Series - {wireType}
          </span>
        </div>
      </div>
      
      {/* Scroll Indicator Hint */}
      <div className="absolute bottom-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div className="px-2 py-1 bg-[var(--background-primary)]/80 backdrop-blur-md rounded text-[10px] font-mono text-[var(--foreground-tertiary)] uppercase tracking-wider border border-[var(--border-subtle)]">
          Scroll to Rotate
        </div>
      </div>
    </div>
  );
};

export default VideoScroll;
