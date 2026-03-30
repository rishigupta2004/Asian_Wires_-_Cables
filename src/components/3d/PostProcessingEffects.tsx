'use client';

import React from 'react';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';

export function PostProcessingEffects() {
  return (
    <EffectComposer enableNormalPass={false}>
      <Bloom 
        luminanceThreshold={0.2} 
        mipmapBlur 
        intensity={1.5} 
        radius={0.4}
      />
      <Vignette
        eskil={false}
        offset={0.1}
        darkness={0.5}
      />
    </EffectComposer>
  );
}
