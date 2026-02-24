'use client';

import { useEffect, useState, RefObject, useCallback, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface UseVideoScrollOptions {
  videoRef: RefObject<HTMLVideoElement | null>;
  duration: number; // Video duration in seconds
  scrub?: number | boolean; // Smoothness (default: 1)
  pin?: boolean; // Whether to pin the container
  start?: string; // ScrollTrigger start position
  end?: string; // ScrollTrigger end position
}

interface UseVideoScrollReturn {
  isReady: boolean;
  progress: number;
}

/**
 * Custom hook for synchronizing video playback with scroll position
 */
export function useVideoScroll({
  videoRef,
  duration,
  scrub = 1,
  pin = false,
  start = 'top center',
  end = 'bottom center',
}: UseVideoScrollOptions): UseVideoScrollReturn {
  const [isReady, setIsReady] = useState(false);
  const [progress, setProgress] = useState(0);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

  // Handle video metadata loaded
  const handleMetadataLoaded = useCallback(() => {
    const video = videoRef.current;
    if (video && video.duration > 0) {
      setIsReady(true);
      // Ensure video is paused for scroll control
      video.pause();
    }
  }, [videoRef]);

  // Setup ScrollTrigger
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Wait for video to be ready
    if (video.readyState >= 1) { // HAVE_METADATA
      handleMetadataLoaded();
    } else {
      video.addEventListener('loadedmetadata', handleMetadataLoaded);
    }

    // Create ScrollTrigger
    const trigger = ScrollTrigger.create({
      trigger: video.parentElement || video,
      start,
      end,
      scrub,
      pin,
      onUpdate: (self) => {
        const scrollProgress = self.progress;
        setProgress(scrollProgress);

        // Sync video time with scroll progress
        if (video.duration) {
          // Clamp the time to avoid seeking past the end
          const targetTime = Math.min(scrollProgress * video.duration, video.duration - 0.01);
          
          // Only update if difference is significant to avoid jitter
          if (Math.abs(video.currentTime - targetTime) > 0.05) {
            video.currentTime = targetTime;
          }
        }
      },
    });

    scrollTriggerRef.current = trigger;

    // Cleanup
    return () => {
      video.removeEventListener('loadedmetadata', handleMetadataLoaded);
      trigger.kill();
      scrollTriggerRef.current = null;
    };
  }, [videoRef, duration, scrub, pin, start, end, handleMetadataLoaded]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.refresh();
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return { isReady, progress };
}

export default useVideoScroll;
