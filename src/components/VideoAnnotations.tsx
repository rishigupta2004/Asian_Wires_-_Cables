'use client';

import React, { useMemo } from 'react';

interface Annotation {
  id: string;
  label: string;
  timestamp: number;
  position: { top: string; left: string };
}

interface VideoAnnotationsProps {
  currentTime: number;
  wireType: 'speaker' | 'coaxial' | 'multicore';
  className?: string;
}

/**
 * Annotations component that displays labels synced with video playback
 * Labels appear at specific timestamps with smooth fade transitions
 */
export const VideoAnnotations: React.FC<VideoAnnotationsProps> = ({
  currentTime,
  wireType,
  className = '',
}) => {
  // Define annotations with timestamps
  const annotations: Annotation[] = useMemo(
    () => [
      {
        id: 'outer-jacket',
        label: 'Outer Jacket',
        timestamp: 0.0,
        position: { top: '20%', left: '75%' },
      },
      {
        id: 'shielding',
        label: 'Shielding Layer',
        timestamp: 1.0,
        position: { top: '35%', left: '80%' },
      },
      {
        id: 'insulation',
        label: 'Insulation',
        timestamp: 2.0,
        position: { top: '50%', left: '75%' },
      },
      {
        id: 'copper-core',
        label: 'Copper Core',
        timestamp: 3.0,
        position: { top: '50%', left: '50%' },
      },
    ],
    []
  );

  // Calculate annotation visibility and opacity
  const getAnnotationStyle = (annotation: Annotation) => {
    const { timestamp } = annotation;
    const fadeInDuration = 0.3; // seconds
    const fadeOutDuration = 0.3; // seconds
    const displayDuration = 1.5; // seconds

    let opacity = 0;

    if (currentTime < timestamp) {
      // Before reveal
      opacity = 0;
    } else if (currentTime < timestamp + fadeInDuration) {
      // Fade in
      opacity = (currentTime - timestamp) / fadeInDuration;
    } else if (currentTime < timestamp + fadeInDuration + displayDuration) {
      // Fully visible
      opacity = 1;
    } else if (currentTime < timestamp + fadeInDuration + displayDuration + fadeOutDuration) {
      // Fade out
      opacity =
        1 -
        (currentTime - timestamp - fadeInDuration - displayDuration) /
          fadeOutDuration;
    } else {
      // After display
      opacity = 0;
    }

    // Clamp opacity between 0 and 1
    opacity = Math.max(0, Math.min(1, opacity));

    return {
      opacity,
      transform: `translateY(${(1 - opacity) * 10}px)`,
      transition: 'opacity 0.3s ease, transform 0.3s ease',
    };
  };

  // Get wire type specific info
  const getWireTypeInfo = () => {
    switch (wireType) {
      case 'speaker':
        return {
          description: 'High-fidelity audio transmission',
          layerCount: 4,
        };
      case 'coaxial':
        return {
          description: 'Digital signal integrity',
          layerCount: 3,
        };
      case 'multicore':
        return {
          description: 'Multi-channel routing',
          layerCount: 5,
        };
      default:
        return {
          description: 'Professional grade wiring',
          layerCount: 4,
        };
    }
  };

  const wireInfo = getWireTypeInfo();

  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      {/* Annotation labels */}
      {annotations.map((annotation) => {
        const style = getAnnotationStyle(annotation);

        return (
          <div
            key={annotation.id}
            className="absolute flex items-center gap-2"
            style={{
              top: annotation.position.top,
              left: annotation.position.left,
              ...style,
            }}
          >
            {/* Leader line */}
            <div
              className="w-8 h-px bg-gradient-to-r from-copper-500 to-transparent"
              style={{
                opacity: style.opacity,
              }}
            />

            {/* Label */}
            <div
              className="px-3 py-1.5 bg-black/80 backdrop-blur-sm rounded border border-copper-500/30"
              style={{
                opacity: style.opacity,
              }}
            >
              <span
                className="font-mono text-xs uppercase tracking-wider"
                style={{ color: '#E85D04' }}
              >
                {annotation.label}
              </span>
            </div>
          </div>
        );
      })}

      {/* Wire type info badge */}
      <div
        className="absolute bottom-4 right-4 px-4 py-2 bg-black/80 backdrop-blur-sm rounded border border-neutral-800"
        style={{
          opacity: currentTime > 0.5 ? 1 : 0,
          transition: 'opacity 0.5s ease',
        }}
      >
        <p className="text-neutral-400 text-xs font-mono uppercase tracking-wider mb-1">
          {wireType} Wire
        </p>
        <p className="text-white text-sm">{wireInfo.description}</p>
        <div className="flex items-center gap-2 mt-2">
          <span className="text-copper-500 text-xs font-mono">
            {wireInfo.layerCount} Layers
          </span>
          <span className="w-1 h-1 rounded-full bg-neutral-600" />
          <span className="text-neutral-500 text-xs font-mono">
            {currentTime.toFixed(1)}s
          </span>
        </div>
      </div>

      {/* Layer reveal indicator */}
      <div className="absolute top-4 right-4 flex flex-col gap-1">
        {annotations.map((annotation, index) => {
          const isRevealed = currentTime >= annotation.timestamp;
          const isActive =
            currentTime >= annotation.timestamp &&
            currentTime < annotation.timestamp + 1.5;

          return (
            <div
              key={annotation.id}
              className="flex items-center gap-2"
              style={{
                opacity: isRevealed ? 1 : 0.3,
                transition: 'opacity 0.3s ease',
              }}
            >
              <div
                className="w-2 h-2 rounded-full"
                style={{
                  backgroundColor: isActive ? '#E85D04' : '#374151',
                  transition: 'background-color 0.3s ease',
                }}
              />
              <span
                className="text-xs font-mono uppercase tracking-wider"
                style={{
                  color: isActive ? '#E85D04' : '#6B7280',
                }}
              >
                {annotation.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Copper accent line */}
      <div
        className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-copper-500 to-transparent"
        style={{
          opacity: 0.5,
          background: 'linear-gradient(90deg, transparent, #E85D04, transparent)',
        }}
      />
    </div>
  );
};

export default VideoAnnotations;
