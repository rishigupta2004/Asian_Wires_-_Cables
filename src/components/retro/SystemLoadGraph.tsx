'use client';

import { useState, useEffect } from 'react';

export const SystemLoadGraph = () => {
  const [bars, setBars] = useState(Array(15).fill(10));
  
  useEffect(() => {
    const interval = setInterval(() => {
      setBars(prev => {
        const next = [...prev.slice(1), Math.floor(Math.random() * 80) + 20];
        return next;
      });
    }, 150);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-end h-10 gap-[2px] border-b-4 border-[#0F0F0F] pb-1 mb-2">
      {bars.map((h, i) => (
        <div key={i} className="flex-1 bg-[#F23A18] transition-all duration-75" style={{ height: `${h}%` }}></div>
      ))}
    </div>
  );
};
