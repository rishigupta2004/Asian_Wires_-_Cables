'use client';

import { useState } from 'react';
import { Minus, Square, X } from 'lucide-react';

interface GUIWindowProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  defaultMinimized?: boolean;
}

export const GUIWindow = ({ title, children, className = '', defaultMinimized = false }: GUIWindowProps) => {
  const [isMinimized, setIsMinimized] = useState(defaultMinimized);
  const [isClosed, setIsClosed] = useState(false);

  if (isClosed) return null;

  return (
    <div className={`border-4 border-[#0F0F0F] bg-[#E4E3DB] shadow-[12px_12px_0px_#0F0F0F] flex flex-col relative transition-all duration-300 ${className} ${isMinimized ? 'h-10 overflow-hidden' : ''}`}>
      <div className="h-10 border-b-4 border-[#0F0F0F] flex justify-between items-center px-2 select-none" 
           style={{ backgroundImage: 'repeating-linear-gradient(0deg, #E4E3DB, #E4E3DB 2px, #0F0F0F 2px, #0F0F0F 4px)' }}>
        <div className="bg-[#E4E3DB] border-2 border-[#0F0F0F] px-2 font-mono-custom text-[11px] text-[#0F0F0F] font-bold tracking-widest flex items-center shadow-[2px_2px_0px_#0F0F0F]">
          {title}
        </div>
        <div className="flex gap-2 bg-[#E4E3DB] p-1 border-2 border-[#0F0F0F]">
          <button onClick={() => setIsMinimized(!isMinimized)} className="w-5 h-5 bg-[#E4E3DB] border-2 border-[#0F0F0F] hover:bg-[#0F0F0F] hover:text-[#E4E3DB] flex items-center justify-center transition-colors">
            {isMinimized ? <Square className="w-3 h-3"/> : <Minus className="w-3 h-3"/>}
          </button>
          <button onClick={() => setIsClosed(true)} className="w-5 h-5 bg-[#E4E3DB] border-2 border-[#0F0F0F] hover:bg-[#F23A18] hover:text-[#E4E3DB] text-[#0F0F0F] flex items-center justify-center transition-colors">
            <X className="w-3 h-3 font-bold"/>
          </button>
        </div>
      </div>
      <div className={`relative flex-1 p-0 transition-opacity duration-300 ${isMinimized ? 'opacity-0' : 'opacity-100'} shadow-[inset_6px_6px_0px_rgba(0,0,0,0.1)]`}>
        {children}
      </div>
    </div>
  );
};
