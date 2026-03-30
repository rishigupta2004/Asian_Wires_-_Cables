'use client';

import MotionSystemProvider from '@/components/providers/MotionSystemProvider';

export default function AppProviders({ children }: { children: React.ReactNode }) {
  return <MotionSystemProvider>{children}</MotionSystemProvider>;
}
