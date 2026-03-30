'use client';

import React, { useMemo } from 'react';
import { useLoader } from '@react-three/fiber';
import { SVGLoader } from 'three-stdlib';
import * as THREE from 'three';

interface Logo3DProps {
  position?: [number, number, number];
  scale?: number;
  rotation?: [number, number, number];
  color?: string;
  emissive?: string;
  emissiveIntensity?: number;
}

export function Logo3D({ 
  position = [0, 0, 0], 
  scale = 0.01, 
  rotation = [0, 0, 0],
  color = "#ffffff",
  emissive = "#000000",
  emissiveIntensity = 0
}: Logo3DProps) {
  // In a real app, we would load the SVG. For now, let's use a simple geometry fallback
  // if the SVG loading fails or just to ensure the build passes without runtime errors 
  // if the file isn't perfectly formatted for three.js SVGLoader.
  // However, since we copied the file, let's try to load it, but wrap in error boundary or just use simple shapes if needed.
  
  // Using a simple box as placeholder if SVG loading is complex to setup perfectly without testing
  // But let's try to implement the SVG loader as requested, assuming public/logo.svg exists.
  
  const svgData = useLoader(SVGLoader, '/logo.svg');

  const shapes = useMemo(() => {
    if (!svgData) return [];
    return svgData.paths.flatMap((path) => {
      // Use the color from props if provided, otherwise use path color
      const pathColor = path.color;
      return path.toShapes(true).map((shape) => ({ shape, color: pathColor }));
    });
  }, [svgData]);

  return (
    <group position={position} scale={[scale, -scale, scale]} rotation={rotation}>
      {shapes.map((item, index) => (
        <mesh key={index} position={[-200, -200, 0]}> {/* Centering offset approximation */}
          <extrudeGeometry
            args={[
              item.shape,
              {
                depth: 10,
                bevelEnabled: true,
                bevelThickness: 1,
                bevelSize: 1,
                bevelSegments: 3,
              },
            ]}
          />
          <meshStandardMaterial
            color={color || item.color}
            metalness={0.8}
            roughness={0.2}
            emissive={emissive}
            emissiveIntensity={emissiveIntensity}
          />
        </mesh>
      ))}
    </group>
  );
}
