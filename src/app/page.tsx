"use client";
import dynamic from 'next/dynamic';

const RetroApp = dynamic(() => import('@/components/retro/RetroApp'), { ssr: false });

export default function Home() {
  return <RetroApp />;
}
