'use client';

import { useState, useEffect, useCallback } from 'react';
import { usePerformanceMonitor } from './usePerformanceMonitor';
import { useDeviceDetection } from './useDeviceDetection';

export type QualityLevel = 'high' | 'medium' | 'low' | 'minimal';

interface AdaptiveQualityConfig {
  highFpsThreshold?: number;
  mediumFpsThreshold?: number;
  lowFpsThreshold?: number;
  adaptationDelay?: number;
}

interface QualitySettings {
  shadows: boolean;
  particles: boolean;
  postProcessing: boolean;
  wireframe: boolean;
  antialias: boolean;
  dpr: [number, number];
  particleCount: number;
  detailLevel: 'high' | 'medium' | 'low';
}

const QUALITY_SETTINGS: Record<QualityLevel, QualitySettings> = {
  high: {
    shadows: true,
    particles: true,
    postProcessing: true,
    wireframe: false,
    antialias: true,
    dpr: [1, 2],
    particleCount: 100,
    detailLevel: 'high',
  },
  medium: {
    shadows: true,
    particles: true,
    postProcessing: false,
    wireframe: false,
    antialias: true,
    dpr: [1, 1.5],
    particleCount: 50,
    detailLevel: 'medium',
  },
  low: {
    shadows: false,
    particles: false,
    postProcessing: false,
    wireframe: false,
    antialias: false,
    dpr: [1, 1],
    particleCount: 0,
    detailLevel: 'low',
  },
  minimal: {
    shadows: false,
    particles: false,
    postProcessing: false,
    wireframe: true,
    antialias: false,
    dpr: [1, 1],
    particleCount: 0,
    detailLevel: 'low',
  },
};

export function useAdaptiveQuality(config: AdaptiveQualityConfig = {}) {
  const {
    highFpsThreshold = 50,
    mediumFpsThreshold = 30,
    lowFpsThreshold = 15,
    adaptationDelay = 3000,
  } = config;

  const [quality, setQuality] = useState<QualityLevel>('high');
  const [isAdapting, setIsAdapting] = useState(false);
  const { fps, rating, isDegraded } = usePerformanceMonitor({
    sampleInterval: 1000,
  });
  const { isMobile, isLowPower, gpuTier } = useDeviceDetection();

  // Determine optimal quality based on device capabilities
  const getInitialQuality = useCallback((): QualityLevel => {
    if (isMobile || isLowPower) {
      return gpuTier === 'high' ? 'medium' : 'low';
    }
    
    if (gpuTier === 'low' || gpuTier === 'none') {
      return 'low';
    }
    
    if (gpuTier === 'medium') {
      return 'medium';
    }
    
    return 'high';
  }, [isMobile, isLowPower, gpuTier]);

  // Set initial quality on mount
  useEffect(() => {
    const initialQuality = getInitialQuality();
    setQuality(initialQuality);
  }, [getInitialQuality]);

  // Adapt quality based on FPS
  useEffect(() => {
    if (isAdapting) return;

    let newQuality: QualityLevel | null = null;

    if (fps < lowFpsThreshold) {
      newQuality = 'minimal';
    } else if (fps < mediumFpsThreshold) {
      newQuality = 'low';
    } else if (fps < highFpsThreshold && quality === 'high') {
      newQuality = 'medium';
    } else if (fps >= highFpsThreshold && quality !== 'high' && !isMobile) {
      // Only upgrade quality if we're on desktop and performance is excellent
      newQuality = quality === 'minimal' ? 'low' : 
                   quality === 'low' ? 'medium' : 'high';
    }

    if (newQuality && newQuality !== quality) {
      setIsAdapting(true);
      
      // Delay adaptation to avoid rapid switching
      const timeout = setTimeout(() => {
        setQuality(newQuality!);
        setIsAdapting(false);
      }, adaptationDelay);

      return () => clearTimeout(timeout);
    }
  }, [fps, quality, isMobile, highFpsThreshold, mediumFpsThreshold, lowFpsThreshold, adaptationDelay, isAdapting]);

  // Force quality downgrade on visibility change (tab inactive)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && quality === 'high') {
        setQuality('medium');
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [quality]);

  // Manual quality override
  const setManualQuality = useCallback((newQuality: QualityLevel) => {
    setQuality(newQuality);
  }, []);

  return {
    quality,
    settings: QUALITY_SETTINGS[quality],
    fps,
    rating,
    isDegraded,
    isAdapting,
    setManualQuality,
  };
}

export default useAdaptiveQuality;
