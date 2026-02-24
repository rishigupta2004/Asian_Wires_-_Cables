'use client';

import { Canvas } from '@react-three/fiber';
import { Environment, Float } from '@react-three/drei';
import { Suspense } from 'react';

interface SceneContainerProps {
  children: React.ReactNode;
  className?: string;
}

export const SceneContainer = ({ children, className = '' }: SceneContainerProps) => {
  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
          <pointLight position={[-10, -10, -10]} intensity={0.5} />
          
          <Float
            speed={2} 
            rotationIntensity={0.5} 
            floatIntensity={0.5}
          >
            {children}
          </Float>
          
          <Environment preset="city" />
        </Suspense>
      </Canvas>
    </div>
  );
};
