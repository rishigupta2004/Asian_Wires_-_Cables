'use client';

import { useState, useEffect, useCallback } from 'react';

export type GpuTier = 'high' | 'medium' | 'low' | 'none';

interface DeviceCapabilities {
  isMobile: boolean;
  isTouch: boolean;
  isIOS: boolean;
  isAndroid: boolean;
  webglSupported: boolean;
  webgl2Supported: boolean;
  gpuTier: GpuTier;
  prefersReducedMotion: boolean;
  prefersColorScheme: 'light' | 'dark' | 'no-preference';
  connectionType: '4g' | '3g' | '2g' | 'slow-2g' | 'unknown';
  saveDataEnabled: boolean;
  screenSize: {
    width: number;
    height: number;
    dpr: number;
  };
  memoryLimit?: number;
  hardwareConcurrency: number;
}

// GPU detection patterns
const HIGH_END_GPUS = [
  'apple gpu', 'm1', 'm2', 'm3', 'm4', 'm1 pro', 'm1 max', 'm1 ultra',
  'm2 pro', 'm2 max', 'm2 ultra', 'm3 pro', 'm3 max', 'm3 ultra',
  'nvidia', 'rtx', 'gtx 16', 'gtx 20', 'gtx 30', 'gtx 40', 'quadro',
  'amd', 'radeon rx', 'rx 5', 'rx 6', 'rx 7', 'rx 7900', 'rx 6900',
];

const LOW_END_GPUS = [
  'intel', 'hd graphics', 'uhd graphics', 'iris xe', 'iris plus',
  'mali-g31', 'mali-g51', 'mali-g52', 'powervr', 
  'adreno 3', 'adreno 4', 'adreno 5', 'adreno 6',
  'geforce 8', 'geforce 9', 'geforce 10',
];

function detectGpuTier(): GpuTier {
  if (typeof window === 'undefined') return 'medium';

  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
    
    if (!gl) {
      return 'none';
    }

    const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
    
    if (debugInfo) {
      const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
      const vendor = gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL);
      
      const rendererLower = renderer.toLowerCase();
      const vendorLower = vendor.toLowerCase();
      
      if (HIGH_END_GPUS.some(gpu => rendererLower.includes(gpu) || vendorLower.includes(gpu))) {
        return 'high';
      }
      
      if (LOW_END_GPUS.some(gpu => rendererLower.includes(gpu) || vendorLower.includes(gpu))) {
        return 'low';
      }
    }

    // Test WebGL capabilities
    const maxTextureSize = gl.getParameter(gl.MAX_TEXTURE_SIZE);
    const maxViewportDims = gl.getParameter(gl.MAX_VIEWPORT_DIMS);
    
    if (maxTextureSize >= 8192 && maxViewportDims[0] >= 4096) {
      return 'high';
    } else if (maxTextureSize >= 4096) {
      return 'medium';
    } else {
      return 'low';
    }
  } catch (e) {
    return 'low';
  }
}

function getConnectionType(): DeviceCapabilities['connectionType'] {
  if (typeof navigator === 'undefined') return 'unknown';
  
  const connection = (navigator as any).connection;
  if (connection) {
    return connection.effectiveType || 'unknown';
  }
  return 'unknown';
}

function isSaveDataEnabled(): boolean {
  if (typeof navigator === 'undefined') return false;
  
  const connection = (navigator as any).connection;
  return connection?.saveData || false;
}

export function useDeviceCapabilities(): DeviceCapabilities {
  const [capabilities, setCapabilities] = useState<DeviceCapabilities>({
    isMobile: false,
    isTouch: false,
    isIOS: false,
    isAndroid: false,
    webglSupported: false,
    webgl2Supported: false,
    gpuTier: 'medium',
    prefersReducedMotion: false,
    prefersColorScheme: 'no-preference',
    connectionType: 'unknown',
    saveDataEnabled: false,
    screenSize: { width: 1920, height: 1080, dpr: 1 },
    hardwareConcurrency: 4,
  });

  const detectCapabilities = useCallback(() => {
    if (typeof window === 'undefined') return;

    const userAgent = navigator.userAgent.toLowerCase();
    const isIOS = /iphone|ipad|ipod/.test(userAgent);
    const isAndroid = /android/.test(userAgent);
    const isMobile = isIOS || isAndroid || /webos|blackberry|iemobile|opera mini/.test(userAgent);
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    // WebGL support
    const canvas = document.createElement('canvas');
    const webglSupported = !!canvas.getContext('webgl');
    const webgl2Supported = !!canvas.getContext('webgl2');

    // Motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Color scheme
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
    const prefersColorScheme = prefersDark ? 'dark' : prefersLight ? 'light' : 'no-preference';

    // Memory (if available)
    const memory = (navigator as any).deviceMemory;

    setCapabilities({
      isMobile,
      isTouch,
      isIOS,
      isAndroid,
      webglSupported,
      webgl2Supported,
      gpuTier: detectGpuTier(),
      prefersReducedMotion,
      prefersColorScheme,
      connectionType: getConnectionType(),
      saveDataEnabled: isSaveDataEnabled(),
      screenSize: {
        width: window.innerWidth,
        height: window.innerHeight,
        dpr: window.devicePixelRatio || 1,
      },
      memoryLimit: memory,
      hardwareConcurrency: navigator.hardwareConcurrency || 4,
    });
  }, []);

  useEffect(() => {
    detectCapabilities();

    // Update on resize
    const handleResize = () => {
      setCapabilities(prev => ({
        ...prev,
        screenSize: {
          width: window.innerWidth,
          height: window.innerHeight,
          dpr: window.devicePixelRatio || 1,
        },
      }));
    };

    // Listen for changes
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const colorSchemeQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const connection = (navigator as any).connection;

    const handleMotionChange = () => {
      setCapabilities(prev => ({
        ...prev,
        prefersReducedMotion: motionQuery.matches,
      }));
    };

    const handleColorSchemeChange = () => {
      setCapabilities(prev => ({
        ...prev,
        prefersColorScheme: colorSchemeQuery.matches ? 'dark' : 'light',
      }));
    };

    const handleConnectionChange = () => {
      setCapabilities(prev => ({
        ...prev,
        connectionType: getConnectionType(),
        saveDataEnabled: isSaveDataEnabled(),
      }));
    };

    window.addEventListener('resize', handleResize);
    motionQuery.addEventListener('change', handleMotionChange);
    colorSchemeQuery.addEventListener('change', handleColorSchemeChange);
    
    if (connection) {
      connection.addEventListener('change', handleConnectionChange);
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      motionQuery.removeEventListener('change', handleMotionChange);
      colorSchemeQuery.removeEventListener('change', handleColorSchemeChange);
      
      if (connection) {
        connection.removeEventListener('change', handleConnectionChange);
      }
    };
  }, [detectCapabilities]);

  return capabilities;
}

export default useDeviceCapabilities;
