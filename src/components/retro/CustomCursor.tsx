'use client';

import { useState, useEffect, MouseEvent } from 'react';

export const CustomCursor = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateCursor = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName.toLowerCase() === 'button' || target.closest('button') || target.closest('tr') || target.closest('.draggable')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };
    window.addEventListener('mousemove', updateCursor as any);
    window.addEventListener('mouseover', handleMouseOver as any);
    return () => {
      window.removeEventListener('mousemove', updateCursor as any);
      window.removeEventListener('mouseover', handleMouseOver as any);
    };
  }, []);

  return (
    <div className="hidden md:block">
      <div className="fixed top-0 left-0 w-px h-full bg-[#F23A18] opacity-50 pointer-events-none z-[98] mix-blend-difference transition-transform duration-75 ease-out" style={{ transform: `translate3d(${pos.x}px, 0, 0)` }} />
      <div className="fixed top-0 left-0 w-full h-px bg-[#F23A18] opacity-50 pointer-events-none z-[98] mix-blend-difference transition-transform duration-75 ease-out" style={{ transform: `translate3d(0, ${pos.y}px, 0)` }} />
      <div className={`fixed top-0 left-0 w-6 h-6 border-2 border-[#F23A18] rounded-none pointer-events-none z-[100] mix-blend-difference transition-all duration-150 ease-out flex items-center justify-center ${isHovering ? 'scale-[2.5] rotate-45 bg-[#F23A18]/20' : 'scale-100 rotate-0'}`} style={{ transform: `translate3d(${pos.x - 12}px, ${pos.y - 12}px, 0)` }}>
        <div className="w-1.5 h-1.5 bg-[#E4E3DB]"></div>
      </div>
      <div className="fixed pointer-events-none z-[99] font-mono-custom text-[9px] font-bold text-[#0F0F0F] bg-[#E4E3DB] border-2 border-[#0F0F0F] px-1.5 py-0.5 whitespace-nowrap transition-transform duration-100 ease-out shadow-[2px_2px_0px_#F23A18]" style={{ transform: `translate3d(${pos.x + 20}px, ${pos.y + 20}px, 0)` }}>
        X:{pos.x} Y:{pos.y}
      </div>
    </div>
  );
};
