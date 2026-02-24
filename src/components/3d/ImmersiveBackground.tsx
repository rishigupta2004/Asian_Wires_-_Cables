'use client';

import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, PerspectiveCamera, Stars } from '@react-three/drei';
import { Logo3D } from './Logo3D';
// import { CircuitEnvironment } from './CircuitEnvironment';
import { PostProcessingEffects } from './PostProcessingEffects';
import { useScrollStore } from '@/stores/scrollStore';
import * as THREE from 'three';

// Camera controller that reacts to scroll and transitions
function CameraController() {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);
  const scrollY = useScrollStore((state) => state.scrollY);
  const isTransitioning = useScrollStore((state) => state.isTransitioning);
  
  // Refs for smooth animation values
  const targetPosition = useRef(new THREE.Vector3(0, 0, 10));
  
  useFrame((state, delta) => {
    if (cameraRef.current) {
      // Base position calculation
      const baseX = 0;
      const baseY = 0;
      const baseZ = 10;
      
      // Scroll influence
      const scrollFactor = scrollY * 0.005;
      
      // Calculate target position based on scroll
      const scrollX = baseX + Math.sin(scrollFactor * 0.5) * 2;
      const scrollYPos = baseY - scrollFactor * 0.5;
      const scrollZ = baseZ + Math.cos(scrollFactor * 0.5) * 2;
      
      // Apply transition effect (Zoom in/warp)
      if (isTransitioning) {
        // Zoom in quickly and add some noise
        targetPosition.current.set(
          scrollX + (Math.random() - 0.5) * 0.2, // Shake x
          scrollYPos + (Math.random() - 0.5) * 0.2, // Shake y
          scrollZ - 5 // Zoom in
        );
        // Faster lerp during transition
        cameraRef.current.position.lerp(targetPosition.current, delta * 5);
      } else {
        // Normal scroll movement
        targetPosition.current.set(scrollX, scrollYPos, scrollZ);
        // Smooth lerp for normal movement
        cameraRef.current.position.lerp(targetPosition.current, delta * 2);
      }
      
      // Look at target (slightly ahead of scroll)
      const lookAtY = -scrollFactor * 0.5;
      cameraRef.current.lookAt(0, lookAtY, 0);
      
      // Add slight roll during transition for disorientation/speed effect
      if (isTransitioning) {
         cameraRef.current.rotation.z = THREE.MathUtils.lerp(cameraRef.current.rotation.z, (Math.random() - 0.5) * 0.1, delta * 5);
      } else {
         cameraRef.current.rotation.z = THREE.MathUtils.lerp(cameraRef.current.rotation.z, 0, delta * 2);
      }
    }
  });

  return <PerspectiveCamera ref={cameraRef} makeDefault position={[0, 0, 10]} fov={50} />;
}

interface ImmersiveBackgroundProps {
  showLogo?: boolean;
}

export default function ImmersiveBackground({ showLogo = true }: ImmersiveBackgroundProps) {
  return (
    <div className="fixed inset-0 z-[-1] bg-black">
      <Canvas
        dpr={[1, 2]}
        gl={{ 
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.5
        }}
        shadows
      >
        <Suspense fallback={null}>
          <CameraController />
          
          {/* Lighting */}
          <ambientLight intensity={0.2} />
          <pointLight position={[10, 10, 10]} intensity={1} color="#E85D04" />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color="#0044ff" />
          <spotLight
            position={[0, 10, 0]}
            intensity={0.8}
            angle={0.6}
            penumbra={1}
            castShadow
          />
          
          {/* Environment */}
          <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
          {/* <CircuitEnvironment count={150} color="#E85D04" range={30} /> */}
          
          {/* Logo */}
          {showLogo && (
            <Logo3D 
              position={[0, 0, 0]} 
              scale={0.02} 
              color="#ffffff" 
              emissive="#E85D04"
              emissiveIntensity={0.8}
            />
          )}
          
          {/* Fog for depth */}
          <fog attach="fog" args={['#050505', 5, 40]} />
          
          {/* Post Processing */}
          <PostProcessingEffects />
        </Suspense>
      </Canvas>
    </div>
  );
}
