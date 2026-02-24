'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

interface PerformanceMetrics {
  fps: number;
  memory: number;
  drawCalls: number;
  triangles: number;
  frameTime: number;
}

interface PerformanceMonitorOptions {
  targetFps?: number;
  sampleInterval?: number;
  enableMemoryTracking?: boolean;
}

export function usePerformanceMonitor(options: PerformanceMonitorOptions = {}) {
  const {
    targetFps = 60,
    sampleInterval = 1000,
    enableMemoryTracking = true,
  } = options;

  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fps: targetFps,
    memory: 0,
    drawCalls: 0,
    triangles: 0,
    frameTime: 16.67,
  });

  const frameCountRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(performance.now());
  const frameTimeSumRef = useRef<number>(0);
  const frameTimeCountRef = useRef<number>(0);
  const rafIdRef = useRef<number | undefined>(undefined);
  const isActiveRef = useRef<boolean>(true);

  const getMemoryUsage = useCallback((): number => {
    if (typeof window === 'undefined') return 0;
    
    const perf = performance as any;
    if (enableMemoryTracking && perf.memory) {
      return Math.round(perf.memory.usedJSHeapSize / 1048576);
    }
    return 0;
  }, [enableMemoryTracking]);

  const measureFrame = useCallback(() => {
    if (!isActiveRef.current) return;

    const currentTime = performance.now();
    const deltaTime = currentTime - lastTimeRef.current;
    
    frameCountRef.current++;
    frameTimeSumRef.current += deltaTime;
    frameTimeCountRef.current++;

    // Update metrics every sampleInterval
    if (currentTime - lastTimeRef.current >= sampleInterval) {
      const fps = Math.round((frameCountRef.current * 1000) / (currentTime - lastTimeRef.current));
      const avgFrameTime = frameTimeCountRef.current > 0 
        ? frameTimeSumRef.current / frameTimeCountRef.current 
        : 16.67;

      setMetrics({
        fps: Math.min(fps, targetFps),
        memory: getMemoryUsage(),
        drawCalls: 0, // Would need Three.js integration for this
        triangles: 0, // Would need Three.js integration for this
        frameTime: Math.round(avgFrameTime * 100) / 100,
      });

      // Reset counters
      frameCountRef.current = 0;
      lastTimeRef.current = currentTime;
      frameTimeSumRef.current = 0;
      frameTimeCountRef.current = 0;
    }

    rafIdRef.current = requestAnimationFrame(measureFrame);
  }, [sampleInterval, targetFps, getMemoryUsage]);

  useEffect(() => {
    isActiveRef.current = true;
    rafIdRef.current = requestAnimationFrame(measureFrame);

    return () => {
      isActiveRef.current = false;
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [measureFrame]);

  // Performance rating
  const getPerformanceRating = useCallback((): 'excellent' | 'good' | 'poor' | 'critical' => {
    const { fps, memory } = metrics;
    
    if (fps >= 55) return 'excellent';
    if (fps >= 30) return 'good';
    if (fps >= 15) return 'poor';
    return 'critical';
  }, [metrics]);

  // Check if performance is degraded
  const isPerformanceDegraded = useCallback((): boolean => {
    return metrics.fps < 30;
  }, [metrics.fps]);

  return {
    ...metrics,
    rating: getPerformanceRating(),
    isDegraded: isPerformanceDegraded(),
    targetFps,
  };
}

export default usePerformanceMonitor;
