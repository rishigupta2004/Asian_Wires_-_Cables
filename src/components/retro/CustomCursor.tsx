'use client';

import { useEffect, useRef, useCallback } from 'react';

export const CustomCursor = () => {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: -100, y: -100 });
  const ringPosRef = useRef({ x: -100, y: -100 });
  const isHoveringRef = useRef(false);
  const rafRef = useRef<number>(0);

  const animate = useCallback(() => {
    const ring = ringRef.current;
    const dot = dotRef.current;
    if (!ring || !dot) return;

    // Lerp the ring position toward the actual cursor (smooth trailing)
    ringPosRef.current.x += (posRef.current.x - ringPosRef.current.x) * 0.15;
    ringPosRef.current.y += (posRef.current.y - ringPosRef.current.y) * 0.15;

    const rx = ringPosRef.current.x;
    const ry = ringPosRef.current.y;
    const dx = posRef.current.x;
    const dy = posRef.current.y;
    const hovering = isHoveringRef.current;

    ring.style.transform = `translate3d(${rx - 16}px, ${ry - 16}px, 0) scale(${hovering ? 2.2 : 1})`;
    dot.style.transform = `translate3d(${dx - 4}px, ${dy - 4}px, 0) scale(${hovering ? 0 : 1})`;

    rafRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      posRef.current.x = e.clientX;
      posRef.current.y = e.clientY;
    };

    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      isHoveringRef.current = !!(
        t.tagName === 'BUTTON' || t.tagName === 'A' ||
        t.closest('button') || t.closest('a') ||
        t.dataset.cursor === 'pointer'
      );
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mouseover', onOver, { passive: true });
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
      cancelAnimationFrame(rafRef.current);
    };
  }, [animate]);

  return (
    <div className="hidden md:block pointer-events-none fixed inset-0 z-[9999]">
      <div
        ref={ringRef}
        className="absolute top-0 left-0 w-8 h-8 rounded-full border border-white mix-blend-difference will-change-transform"
        style={{ transform: 'translate3d(-100px, -100px, 0)' }}
      />
      <div
        ref={dotRef}
        className="absolute top-0 left-0 w-2 h-2 bg-white rounded-full mix-blend-difference will-change-transform"
        style={{ transform: 'translate3d(-100px, -100px, 0)' }}
      />
    </div>
  );
};
