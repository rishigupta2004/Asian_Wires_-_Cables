'use client';

import React, { useRef, useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface MobileVideoFallbackProps {
  wireType: 'speaker' | 'coaxial' | 'multicore';
  tier: 'master' | 'm1' | 'pro';
  className?: string;
}

interface Hotspot {
  id: string;
  position: { x: number; y: number };
  label: string;
  description: string;
  timeRange: [number, number]; // When this hotspot is visible in video
}

const HOTSPOTS: Record<string, Hotspot[]> = {
  speaker: [
    {
      id: 'conductor',
      position: { x: 50, y: 50 },
      label: 'OFC Copper Core',
      description: '99.99% oxygen-free copper for maximum signal transmission',
      timeRange: [0, 5],
    },
    {
      id: 'insulation',
      position: { x: 70, y: 40 },
      label: 'XLPE Insulation',
      description: 'Cross-linked polyethylene insulation for heat resistance',
      timeRange: [2, 7],
    },
    {
      id: 'jacket',
      position: { x: 30, y: 60 },
      label: 'PVC Jacket',
      description: 'Durable PVC outer layer for protection',
      timeRange: [4, 9],
    },
  ],
  coaxial: [
    {
      id: 'center',
      position: { x: 50, y: 50 },
      label: 'Solid Copper Core',
      description: 'High-purity copper center conductor',
      timeRange: [0, 5],
    },
    {
      id: 'dielectric',
      position: { x: 60, y: 45 },
      label: 'Foam Dielectric',
      description: 'Gas-injected foam for low signal loss',
      timeRange: [2, 7],
    },
    {
      id: 'shield',
      position: { x: 40, y: 55 },
      label: 'Quad Shield',
      description: 'Aluminum foil + copper braid protection',
      timeRange: [4, 9],
    },
  ],
  multicore: [
    {
      id: 'cores',
      position: { x: 50, y: 50 },
      label: 'Multiple Cores',
      description: 'Multiple insulated conductors for complex setups',
      timeRange: [0, 5],
    },
    {
      id: 'filler',
      position: { x: 65, y: 35 },
      label: 'Central Filler',
      description: 'Provides structural integrity and flexibility',
      timeRange: [2, 7],
    },
    {
      id: 'binding',
      position: { x: 35, y: 65 },
      label: 'Binding Tape',
      description: 'Holds all conductors together securely',
      timeRange: [4, 9],
    },
  ],
};

export const MobileVideoFallback: React.FC<MobileVideoFallbackProps> = ({
  wireType,
  tier,
  className,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const lastScrollY = useRef(0);

  // Video source based on wire type and tier
  const videoSrc = `/videos/wire-${wireType}-${tier}.mp4`;
  const posterSrc = `/images/wire-${wireType}-${tier}-poster.jpg`;

  // Handle scroll-based playback
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const video = videoRef.current;
      if (!video || !isLoaded) return;

      const rect = container.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate progress based on element position in viewport
      const scrollProgress = Math.max(0, Math.min(1, 
        (windowHeight - rect.top) / (windowHeight + rect.height)
      ));

      // Map scroll progress to video time
      const videoTime = scrollProgress * video.duration;
      
      if (!isNaN(videoTime) && isFinite(videoTime)) {
        video.currentTime = videoTime;
        setCurrentTime(videoTime);
      }

      // Auto-play/pause based on visibility
      if (rect.top < windowHeight && rect.bottom > 0) {
        if (!isPlaying) {
          video.play().catch(() => {});
          setIsPlaying(true);
        }
      } else {
        video.pause();
        setIsPlaying(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isLoaded, isPlaying]);

  // Handle video loaded
  const handleLoadedData = useCallback(() => {
    setIsLoaded(true);
  }, []);

  // Handle hotspot click
  const handleHotspotClick = useCallback((id: string) => {
    setActiveHotspot(prev => prev === id ? null : id);
  }, []);

  // Get visible hotspots based on current time
  const visibleHotspots = React.useMemo(() => {
    const hotspots = HOTSPOTS[wireType] || HOTSPOTS.speaker;
    return hotspots.filter(h => 
      currentTime >= h.timeRange[0] && currentTime <= h.timeRange[1]
    );
  }, [currentTime, wireType]);

  const activeHotspotData = visibleHotspots.find(h => h.id === activeHotspot);

  return (
    <div 
      ref={containerRef}
      className={`relative w-full h-full overflow-hidden bg-[#0a0a0a] ${className || ''}`}
    >
      {/* Video element */}
      <video
        ref={videoRef}
        src={videoSrc}
        poster={posterSrc}
        muted
        loop
        playsInline
        onLoadedData={handleLoadedData}
        className="w-full h-full object-cover"
        style={{ 
          opacity: isLoaded ? 1 : 0,
          transition: 'opacity 0.5s ease',
        }}
      />

      {/* Loading state */}
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#0a0a0a]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#E85D04] mx-auto mb-4"></div>
            <p className="text-gray-400 text-sm">Loading wire visualization...</p>
          </div>
        </div>
      )}

      {/* Hotspots overlay */}
      <AnimatePresence>
        {isLoaded && visibleHotspots.map((hotspot) => (
          <motion.button
            key={hotspot.id}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="absolute w-8 h-8 -ml-4 -mt-4 rounded-full bg-[#E85D04]/80 border-2 border-white/50 flex items-center justify-center z-10"
            style={{
              left: `${hotspot.position.x}%`,
              top: `${hotspot.position.y}%`,
            }}
            onClick={() => handleHotspotClick(hotspot.id)}
          >
            <motion.div
              className="absolute inset-0 rounded-full bg-[#E85D04]"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 0, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <span className="relative text-white text-xs font-bold">+</span>
          </motion.button>
        ))}
      </AnimatePresence>

      {/* Active hotspot info */}
      <AnimatePresence>
        {activeHotspotData && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute bottom-4 left-4 right-4 bg-black/90 backdrop-blur-sm p-4 rounded-lg border border-[#E85D04]/30 z-20"
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-[#E85D04] font-semibold text-sm mb-1">
                  {activeHotspotData.label}
                </h3>
                <p className="text-gray-300 text-xs">
                  {activeHotspotData.description}
                </p>
              </div>
              <button
                onClick={() => setActiveHotspot(null)}
                className="text-gray-400 hover:text-white text-lg leading-none"
              >
                ×
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scroll hint */}
      {!activeHotspot && isLoaded && (
        <div className="absolute bottom-4 left-0 right-0 text-center">
          <motion.p 
            className="text-gray-500 text-xs bg-black/50 inline-block px-3 py-1 rounded-full"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Scroll to explore • Tap dots for details
          </motion.p>
        </div>
      )}
    </div>
  );
};

export default MobileVideoFallback;
