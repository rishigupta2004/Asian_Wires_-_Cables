'use client';

import React from 'react';
import { usePerformanceMonitor } from '@/hooks/usePerformanceMonitor';
import { useDeviceCapabilities } from '@/hooks/useDeviceCapabilities';

interface PerformanceStatsProps {
  showDetails?: boolean;
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
}

export const PerformanceStats: React.FC<PerformanceStatsProps> = ({
  showDetails = true,
  position = 'top-right',
}) => {
  const { fps, memory, frameTime, rating, isDegraded, targetFps } = usePerformanceMonitor({
    sampleInterval: 1000,
    enableMemoryTracking: true,
  });

  const capabilities = useDeviceCapabilities();

  const getPositionClasses = () => {
    switch (position) {
      case 'top-left':
        return 'top-4 left-4';
      case 'top-right':
        return 'top-4 right-4';
      case 'bottom-left':
        return 'bottom-4 left-4';
      case 'bottom-right':
        return 'bottom-4 right-4';
      default:
        return 'top-4 right-4';
    }
  };

  const getRatingColor = () => {
    switch (rating) {
      case 'excellent':
        return 'text-green-400';
      case 'good':
        return 'text-yellow-400';
      case 'poor':
        return 'text-orange-400';
      case 'critical':
        return 'text-red-400';
      default:
        return 'text-gray-400';
    }
  };

  const getFpsBarWidth = () => {
    return Math.min((fps / targetFps) * 100, 100);
  };

  const getFpsBarColor = () => {
    if (fps >= 55) return 'bg-green-500';
    if (fps >= 30) return 'bg-yellow-500';
    if (fps >= 15) return 'bg-orange-500';
    return 'bg-red-500';
  };

  return (
    <div
      className={`fixed ${getPositionClasses()} z-[9999] bg-black/90 backdrop-blur-md border border-[#262626] rounded-lg p-4 font-mono text-xs min-w-[220px]`}
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-[#E85D04] font-bold">PERFORMANCE</span>
        <span className={`text-[10px] uppercase tracking-wider ${getRatingColor()}`}>
          {rating}
        </span>
      </div>

      {/* FPS Bar */}
      <div className="mb-3">
        <div className="flex justify-between mb-1">
          <span className="text-gray-400">FPS</span>
          <span className={fps >= 30 ? 'text-green-400' : 'text-red-400'}>
            {fps}/{targetFps}
          </span>
        </div>
        <div className="h-2 bg-[#262626] rounded-full overflow-hidden">
          <div
            className={`h-full transition-all duration-300 ${getFpsBarColor()}`}
            style={{ width: `${getFpsBarWidth()}%` }}
          />
        </div>
      </div>

      {/* Frame Time */}
      <div className="flex justify-between mb-2">
        <span className="text-gray-400">Frame Time</span>
        <span className="text-white">{frameTime.toFixed(2)}ms</span>
      </div>

      {/* Memory */}
      {memory > 0 && (
        <div className="flex justify-between mb-2">
          <span className="text-gray-400">Memory</span>
          <span className="text-white">{memory}MB</span>
        </div>
      )}

      {showDetails && (
        <>
          <div className="border-t border-[#262626] my-3" />

          {/* Device Info */}
          <div className="space-y-1">
            <div className="flex justify-between">
              <span className="text-gray-500">GPU Tier</span>
              <span className="text-gray-300">{capabilities.gpuTier}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Mobile</span>
              <span className={capabilities.isMobile ? 'text-red-400' : 'text-green-400'}>
                {capabilities.isMobile ? 'Yes' : 'No'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">WebGL</span>
              <span className={capabilities.webgl2Supported ? 'text-green-400' : 'text-yellow-400'}>
                {capabilities.webgl2Supported ? '2.0' : capabilities.webglSupported ? '1.0' : 'None'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Connection</span>
              <span className="text-gray-300">{capabilities.connectionType}</span>
            </div>
            {capabilities.memoryLimit && (
              <div className="flex justify-between">
                <span className="text-gray-500">Memory Limit</span>
                <span className="text-gray-300">{capabilities.memoryLimit}GB</span>
              </div>
            )}
          </div>

          {/* Warnings */}
          {isDegraded && (
            <div className="mt-3 p-2 bg-red-500/10 border border-red-500/30 rounded text-red-400 text-[10px]">
              Performance degraded. Consider reducing quality.
            </div>
          )}

          {capabilities.saveDataEnabled && (
            <div className="mt-2 p-2 bg-yellow-500/10 border border-yellow-500/30 rounded text-yellow-400 text-[10px]">
              Save Data mode enabled.
            </div>
          )}

          {capabilities.prefersReducedMotion && (
            <div className="mt-2 p-2 bg-blue-500/10 border border-blue-500/30 rounded text-blue-400 text-[10px]">
              Reduced motion preference.
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default PerformanceStats;
