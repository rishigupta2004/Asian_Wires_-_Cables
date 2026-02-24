'use client';

import { Suspense, ReactNode } from 'react';
import { EffectComposer, Bloom, DepthOfField, Noise, Vignette } from '@react-three/postprocessing';
import { useThree } from '@react-three/fiber';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface PostProcessingProps {
  bloomIntensity?: number;
  bloomThreshold?: number;
  bloomSmoothing?: number;
  depthOfFieldEnabled?: boolean;
  noiseEnabled?: boolean;
  vignetteEnabled?: boolean;
}

function PostProcessingEffects({
  bloomIntensity = 0.6,
  bloomThreshold = 0.9,
  bloomSmoothing = 0.02,
  depthOfFieldEnabled = true,
  noiseEnabled = true,
  vignetteEnabled = true,
}: PostProcessingProps) {
  const { size } = useThree();

  return (
    <EffectComposer multisampling={4}>
      <Bloom
        intensity={bloomIntensity}
        luminanceThreshold={bloomThreshold}
        luminanceSmoothing={bloomSmoothing}
        mipmapBlur
        radius={0.5}
      />
      
      <DepthOfField
        focusDistance={0}
        focalLength={depthOfFieldEnabled ? 0.02 : 0}
        bokehScale={depthOfFieldEnabled ? 1.5 : 0}
        height={size.height}
        width={size.width}
      />
      
      <Noise
        opacity={noiseEnabled ? 0.01 : 0}
        premultiply
      />
      
      <Vignette
        offset={0.4}
        darkness={vignetteEnabled ? 0.25 : 0}
        eskil={false}
      />
    </EffectComposer>
  );
}

export function PostProcessing(props: PostProcessingProps) {
  const prefersReducedMotion = useReducedMotion();
  
  if (prefersReducedMotion) {
    return null;
  }
  
  return (
    <Suspense fallback={null}>
      <PostProcessingEffects {...props} />
    </Suspense>
  );
}

// Mobile-optimized version with reduced effects
export function MobilePostProcessing() {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return null;
  }

  return (
    <Suspense fallback={null}>
      <EffectComposer multisampling={2}>
        <Bloom
          intensity={0.3}
          luminanceThreshold={0.8}
          luminanceSmoothing={0.1}
          mipmapBlur={false}
        />
        <Noise opacity={0.015} />
      </EffectComposer>
    </Suspense>
  );
}

// Wire-specific post processing with copper bloom
export function WirePostProcessing({ copperGlow = true }: { copperGlow?: boolean }) {
  const { size } = useThree();
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return null;
  }

  return (
    <Suspense fallback={null}>
      <EffectComposer multisampling={4}>
        <Bloom
          intensity={copperGlow ? 0.8 : 0}
          luminanceThreshold={0.7}
          luminanceSmoothing={0.05}
          mipmapBlur
          radius={0.8}
        />
        <DepthOfField
          focusDistance={0.02}
          focalLength={0.015}
          bokehScale={1.5}
          height={size.height}
          width={size.width}
        />
        <Noise opacity={0.02} />
      </EffectComposer>
    </Suspense>
  );
}

// Provider component for scene-wide effects
interface PostProcessingProviderProps {
  children: ReactNode;
  config?: PostProcessingProps;
  enabled?: boolean;
}

export function PostProcessingProvider({
  children,
  config,
  enabled = true,
}: PostProcessingProviderProps) {
  if (!enabled) {
    return <>{children}</>;
  }

  return (
    <>
      {children}
      <PostProcessing {...config} />
    </>
  );
}
