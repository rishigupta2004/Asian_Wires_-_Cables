'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Instance, Instances, Line } from '@react-three/drei';

interface CircuitParticleProps {
  count?: number;
  color?: string;
  speed?: number;
  range?: number;
}

export function CircuitEnvironment({
  count = 100,
  color = '#E85D04',
  speed = 0.5,
  range = 20,
}: CircuitParticleProps) {
  const particlesRef = useRef<THREE.Group>(null);

  // Generate random positions and velocities for particles
  const particles = useMemo(() => {
    return Array.from({ length: count }, () => ({
      position: new THREE.Vector3(
        (Math.random() - 0.5) * range,
        (Math.random() - 0.5) * range,
        (Math.random() - 0.5) * range
      ),
      velocity: new THREE.Vector3(
        (Math.random() - 0.5) * speed * 0.1,
        (Math.random() - 0.5) * speed * 0.1,
        (Math.random() - 0.5) * speed * 0.1
      ),
      scale: Math.random() * 0.5 + 0.1,
    }));
  }, [count, range, speed]);

  useFrame((state) => {
    if (!particlesRef.current) return;

    // Animate particles
    particlesRef.current.children.forEach((child, i) => {
      const particle = particles[i];
      
      // Update position
      child.position.add(particle.velocity);
      
      // Boundary check - wrap around
      if (Math.abs(child.position.x) > range / 2) child.position.x *= -1;
      if (Math.abs(child.position.y) > range / 2) child.position.y *= -1;
      if (Math.abs(child.position.z) > range / 2) child.position.z *= -1;
      
      // Pulse scale
      const time = state.clock.elapsedTime;
      const scale = particle.scale * (1 + Math.sin(time * 2 + i) * 0.2);
      child.scale.setScalar(scale);
    });
    
    // Slowly rotate the entire group
    particlesRef.current.rotation.y = state.clock.elapsedTime * 0.05;
  });

  return (
    <group ref={particlesRef}>
      <Instances range={count}>
        <sphereGeometry args={[0.1, 8, 8]} />
        <meshBasicMaterial color={color} transparent opacity={0.6} />
        
        {particles.map((particle, i) => (
          <Instance
            key={i}
            position={particle.position}
            scale={particle.scale}
          />
        ))}
      </Instances>
      
      {/* Add some connecting lines for "circuit" feel */}
      <CircuitLines count={20} range={range} color={color} />
    </group>
  );
}

function CircuitLines({ count, range, color }: { count: number; range: number; color: string }) {
  const linesRef = useRef<THREE.Group>(null);
  
  const lines = useMemo(() => {
    return Array.from({ length: count }, () => {
      // Create random circuit-like paths (straight lines with 90 degree turns)
      const start = new THREE.Vector3(
        (Math.random() - 0.5) * range,
        (Math.random() - 0.5) * range,
        (Math.random() - 0.5) * range
      );
      
      const points = [start];
      let current = start.clone();
      
      // Add 2-4 segments
      const segments = Math.floor(Math.random() * 3) + 2;
      
      for (let i = 0; i < segments; i++) {
        const axis = Math.floor(Math.random() * 3); // 0=x, 1=y, 2=z
        const length = (Math.random() - 0.5) * (range / 2);
        
        const next = current.clone();
        if (axis === 0) next.x += length;
        else if (axis === 1) next.y += length;
        else next.z += length;
        
        points.push(next);
        current = next;
      }
      
      return points;
    });
  }, [count, range]);

  useFrame((state) => {
    if (linesRef.current) {
      // Pulse opacity
      linesRef.current.children.forEach((line: any, i) => {
        if (line.material) {
          line.material.opacity = 0.3 + Math.sin(state.clock.elapsedTime * 2 + i) * 0.2;
        }
      });
    }
  });

  return (
    <group ref={linesRef}>
      {lines.map((points, i) => (
        <Line 
          key={i} 
          points={points} 
          color={color} 
          transparent 
          opacity={0.5} 
          lineWidth={1} 
        />
      ))}
    </group>
  );
}
