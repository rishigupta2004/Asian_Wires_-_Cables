import { create } from 'zustand';

interface CameraPosition {
  x: number;
  y: number;
  z: number;
}

interface ScrollState {
  progress: number;
  currentSection: number;
  velocity: number;
  isScrolling: boolean;
  direction: 'up' | 'down' | null;
  cameraPosition: CameraPosition;
  isActive: boolean;
  scrollY: number;
  isTransitioning: boolean;
  setProgress: (progress: number) => void;
  setScrollY: (y: number) => void;
  setSection: (section: number) => void;
  setActive: (isActive: boolean) => void;
  setCameraPosition: (position: CameraPosition) => void;
  setTransitioning: (isTransitioning: boolean) => void;
}

export const useScrollStore = create<ScrollState>((set) => ({
  progress: 0,
  currentSection: 0,
  velocity: 0,
  isScrolling: false,
  direction: null,
  cameraPosition: { x: 0, y: 0, z: 8 },
  isActive: false,
  scrollY: 0,
  isTransitioning: false,
  setProgress: (progress: number) => set({ 
    progress: Math.max(0, Math.min(1, progress))
  }),
  setScrollY: (y: number) => set({ scrollY: y }),
  setSection: (section: number) => set({ 
    currentSection: Math.max(0, Math.min(9, section))
  }),
  setActive: (isActive: boolean) => set({ isActive }),
  setCameraPosition: (position: CameraPosition) => set({ cameraPosition: position }),
  setTransitioning: (isTransitioning: boolean) => set({ isTransitioning }),
}));
