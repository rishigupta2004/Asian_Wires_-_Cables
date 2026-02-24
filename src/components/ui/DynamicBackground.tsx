"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

interface BackgroundProps {
  density?: "low" | "medium" | "high";
  speed?: number;
}

const CircuitParticles: React.FC<{ count: number; speed: number }> = ({
  count,
  speed,
}) => {
  const points = useRef<THREE.Points>(null!);
  
  // Generate random positions for particles
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20; // x
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20; // y
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10; // z
    }
    return pos;
  }, [count]);

  useFrame((state, delta) => {
    if (points.current) {
      points.current.rotation.x -= delta * speed * 0.1;
      points.current.rotation.y -= delta * speed * 0.15;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points
        ref={points}
        positions={positions}
        stride={3}
        frustumCulled={false}
      >
        <PointMaterial
          transparent
          color="#FFD700" // Gold color to match theme
          size={0.05}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.4}
        />
      </Points>
    </group>
  );
};

const DynamicBackground: React.FC<BackgroundProps> = ({
  density = "medium",
  speed = 0.5,
}) => {
  const particleCount = useMemo(() => {
    switch (density) {
      case "low":
        return 500;
      case "high":
        return 2000;
      case "medium":
      default:
        return 1000;
    }
  }, [density]);

  return (
    <div className="fixed inset-0 z-[-1] bg-black pointer-events-none">
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
        <CircuitParticles count={particleCount} speed={speed} />
      </Canvas>
    </div>
  );
};

export default DynamicBackground;
