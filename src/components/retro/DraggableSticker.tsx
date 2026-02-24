'use client';

import { useState, useEffect, useRef } from 'react';

export const DraggableSticker = () => {
  const [pos, setPos] = useState({ x: typeof window !== 'undefined' ? window.innerWidth - 300 : 1200, y: 150 });
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef<HTMLDivElement>(null);
  const offset = useRef({ x: 0, y: 0 });

  const onPointerDown = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    const clientX = 'clientX' in e ? e.clientX : (e as any).touches?.[0]?.clientX;
    const clientY = 'clientY' in e ? e.clientY : (e as any).touches?.[0]?.clientY;
    offset.current = { x: clientX - pos.x, y: clientY - pos.y };
  };

  const onPointerMove = (e: MouseEvent | TouchEvent) => {
    if (!isDragging) return;
    const clientX = 'clientX' in e ? e.clientX : (e as any).touches?.[0]?.clientX;
    const clientY = 'clientY' in e ? e.clientY : (e as any).touches?.[0]?.clientY;
    setPos({ x: clientX - offset.current.x, y: clientY - offset.current.y });
  };

  const onPointerUp = () => setIsDragging(false);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', onPointerMove);
      window.addEventListener('mouseup', onPointerUp);
      window.addEventListener('touchmove', onPointerMove);
      window.addEventListener('touchend', onPointerUp);
    } else {
      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('mouseup', onPointerUp);
      window.removeEventListener('touchmove', onPointerMove);
      window.removeEventListener('touchend', onPointerUp);
    }
    return () => {
      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('mouseup', onPointerUp);
      window.removeEventListener('touchmove', onPointerMove);
      window.removeEventListener('touchend', onPointerUp);
    };
  }, [isDragging]);

  return (
    <div 
      ref={dragRef}
      onMouseDown={onPointerDown}
      onTouchStart={onPointerDown}
      className={`draggable hidden lg:flex absolute z-50 w-40 h-40 bg-[#F23A18] border-4 border-[#0F0F0F] rounded-full items-center justify-center cursor-grab active:cursor-grabbing transition-shadow duration-200 select-none ${isDragging ? 'shadow-[16px_16px_0px_rgba(0,0,0,0.5)] scale-105' : 'shadow-[8px_8px_0px_#0F0F0F]'}`}
      style={{ left: pos.x, top: pos.y, touchAction: 'none' }}
    >
      <svg viewBox="0 0 100 100" className="w-full h-full absolute animate-[spin_10s_linear_infinite] pointer-events-none">
        <defs><path id="circlePath2" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" /></defs>
        <text fontFamily="Space Mono" fontSize="12" fontWeight="bold" fill="#0F0F0F" letterSpacing="1">
          <textPath href="#circlePath2">DRAG ME • DRAG ME • DRAG ME • </textPath>
        </text>
      </svg>
      <div className="font-grotesk font-black text-4xl text-[#E4E3DB] pointer-events-none" style={{ WebkitTextStroke: '2px #0F0F0F' }}>Cu</div>
    </div>
  );
};
