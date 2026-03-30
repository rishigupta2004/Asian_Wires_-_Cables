'use client';

import { useState, useEffect, useCallback } from 'react';

type GpuTier = 'high' | 'medium' | 'low' | 'none';

interface DeviceInfo {
  isMobile: boolean;
  isTouch: boolean;
  isLowPower: boolean;
  gpuTier: GpuTier;
}

export function useDeviceDetection(): DeviceInfo {
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo>({
    isMobile: false,
    isTouch: false,
    isLowPower: false,
    gpuTier: 'medium',
  });

  const detectGpuTier = useCallback((): GpuTier => {
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
        
        // High-end GPUs
        const highEndGPUs = [
          'apple gpu', 'm1', 'm2', 'm3', 'm4',
          'nvidia', 'rtx', 'gtx 16', 'gtx 20', 'gtx 30', 'gtx 40',
          'amd', 'radeon rx', 'rx 5', 'rx 6', 'rx 7',
        ];
        
        // Low-end GPUs
        const lowEndGPUs = [
          'intel', 'hd graphics', 'uhd graphics', 'iris',
          'mali-g', 'powervr', 'adreno 3', 'adreno 4', 'adreno 5',
        ];
        
        const rendererLower = renderer.toLowerCase();
        
        if (highEndGPUs.some(gpu => rendererLower.includes(gpu))) {
          return 'high';
        }
        
        if (lowEndGPUs.some(gpu => rendererLower.includes(gpu))) {
          return 'low';
        }
      }

      // Test by creating a complex shader
      const testShader = gl.createShader(gl.VERTEX_SHADER);
      if (!testShader) return 'low';
      
      gl.shaderSource(testShader, `
        attribute vec4 position;
        void main() {
          gl_Position = position;
        }
      `);
      gl.compileShader(testShader);
      
      if (!gl.getShaderParameter(testShader, gl.COMPILE_STATUS)) {
        return 'low';
      }

      return 'medium';
    } catch (e) {
      return 'low';
    }
  }, []);

  const detectLowPowerMode = useCallback(async (): Promise<boolean> => {
    if (typeof window === 'undefined') return false;

    try {
      // Check for battery API
      if ('getBattery' in navigator) {
        const battery = await (navigator as any).getBattery();
        
        // Low battery or charging
        if (battery.level < 0.2 || battery.charging) {
          return true;
        }
      }

      // Check for save-data preference
      if ('connection' in navigator) {
        const connection = (navigator as any).connection;
        if (connection?.saveData) {
          return true;
        }
      }

      // Check for reduced motion preference (often indicates low power preference)
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) {
        return true;
      }

      return false;
    } catch (e) {
      return false;
    }
  }, []);

  useEffect(() => {
    const detectDevice = async () => {
      const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      const isMobile = window.innerWidth < 768 || 
                       /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      
      const [isLowPower, gpuTier] = await Promise.all([
        detectLowPowerMode(),
        Promise.resolve(detectGpuTier()),
      ]);

      setDeviceInfo({
        isMobile,
        isTouch,
        isLowPower,
        gpuTier,
      });
    };

    detectDevice();

    // Update on resize
    const handleResize = () => {
      const isMobile = window.innerWidth < 768;
      setDeviceInfo(prev => ({ ...prev, isMobile }));
    };

    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [detectGpuTier, detectLowPowerMode]);

  return deviceInfo;
}

export default useDeviceDetection;
