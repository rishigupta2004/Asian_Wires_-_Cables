"use client";
import dynamic from 'next/dynamic';
import LenisProvider from '@/components/providers/LenisProvider';
import { GSAPProvider } from '@/components/providers/GSAPProvider';

const RetroApp = dynamic(() => import('@/components/retro/RetroApp'), { 
  ssr: false,
  loading: () => (
    <div className="min-h-screen bg-[#E4E3DB] flex items-center justify-center">
      <div className="w-8 h-8 border-4 border-[#0F0F0F] border-t-[#FF3300] animate-spin rounded-full" />
    </div>
  )
});

export default function Home() {
  return (
    <LenisProvider>
      <GSAPProvider>
        <RetroApp />
      </GSAPProvider>
    </LenisProvider>
  );
}
