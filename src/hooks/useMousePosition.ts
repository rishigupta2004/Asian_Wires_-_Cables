'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

interface MousePosition {
  x: number;
  y: number;
}

interface MouseVelocity {
  vx: number;
  vy: number;
}

interface UseMousePositionReturn {
  position: MousePosition;
  velocity: MouseVelocity;
}

export function useMousePosition(): UseMousePositionReturn {
  const [position, setPosition] = useState<MousePosition>({ x: 0, y: 0 });
  const [velocity, setVelocity] = useState<MouseVelocity>({ vx: 0, vy: 0 });
  
  const targetPosition = useRef<MousePosition>({ x: 0, y: 0 });
  const currentPosition = useRef<MousePosition>({ x: 0, y: 0 });
  const lastPosition = useRef<MousePosition>({ x: 0, y: 0 });
  const rafId = useRef<number | undefined>(undefined);

  const lerp = (start: number, end: number, factor: number): number => {
    return start + (end - start) * factor;
  };

  const animate = useCallback(() => {
    currentPosition.current.x = lerp(currentPosition.current.x, targetPosition.current.x, 0.15);
    currentPosition.current.y = lerp(currentPosition.current.y, targetPosition.current.y, 0.15);

    const vx = currentPosition.current.x - lastPosition.current.x;
    const vy = currentPosition.current.y - lastPosition.current.y;

    setPosition({ ...currentPosition.current });
    setVelocity({ vx, vy });

    lastPosition.current = { ...currentPosition.current };

    rafId.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      targetPosition.current = {
        x: event.clientX,
        y: event.clientY,
      };
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    rafId.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, [animate]);

  return { position, velocity };
}
