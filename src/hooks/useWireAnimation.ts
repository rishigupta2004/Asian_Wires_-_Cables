import { useRef, useCallback } from 'react';

interface WireAnimationConfig {
  amplitude?: number;
  speed?: number;
  rotationSpeed?: number;
  wireIndex?: number;
}

interface AnimationValues {
  float: number;
  rotation: number;
  weave: number;
}

export const useWireAnimation = (config: WireAnimationConfig = {}) => {
  const {
    amplitude = 0.2,
    speed = 0.5,
    rotationSpeed = 0.1,
    wireIndex = 0,
  } = config;

  // Use refs for performance
  const timeRef = useRef(0);
  const phaseRef = useRef(wireIndex * (Math.PI / 3)); // Offset each wire

  // Calculate animation values for a given time
  const getAnimation = useCallback((time: number): AnimationValues => {
    const phase = phaseRef.current;
    
    // Layered sine waves for more organic floating motion
    // Primary wave + secondary faster/smaller wave + tertiary slow/large wave
    const float = (
      Math.sin(time * speed + phase) * amplitude +
      Math.sin(time * speed * 2.1 + phase * 1.3) * (amplitude * 0.3) +
      Math.sin(time * speed * 0.4 + phase * 0.7) * (amplitude * 0.5)
    ) / 1.8; // Normalize amplitude
    
    // Gentle rotation with slight oscillation
    const baseRotation = (time * rotationSpeed * 0.3) % (Math.PI * 2);
    const oscRotation = Math.sin(time * speed * 0.5) * 0.1;
    const rotation = baseRotation + oscRotation;
    
    // Complex weaving motion
    const weave = (
      Math.sin(time * speed * 0.8 + phase * 1.5) * 0.15 +
      Math.cos(time * speed * 1.2 + phase * 0.9) * 0.05
    );

    return {
      float,
      rotation,
      weave,
    };
  }, [amplitude, speed, rotationSpeed]);

  // Get animated position offset
  const getPositionOffset = useCallback((time: number): { x: number; y: number; z: number } => {
    const anim = getAnimation(time);
    const phase = phaseRef.current;
    
    return {
      x: anim.weave * Math.cos(phase),
      y: anim.float,
      z: anim.weave * Math.sin(phase),
    };
  }, [getAnimation]);

  // Get rotation offset
  const getRotationOffset = useCallback((time: number): { x: number; y: number; z: number } => {
    const anim = getAnimation(time);
    const phase = phaseRef.current;
    
    return {
      x: Math.sin(time * 0.2 + phase) * 0.05,
      y: anim.rotation * 0.2,
      z: Math.cos(time * 0.15 + phase) * 0.03,
    };
  }, [getAnimation]);

  // Update time reference (useful for syncing)
  const setTime = useCallback((time: number) => {
    timeRef.current = time;
  }, []);

  // Get current time
  const getTime = useCallback(() => {
    return timeRef.current;
  }, []);

  // Reset animation
  const reset = useCallback(() => {
    timeRef.current = 0;
  }, []);

  return {
    getAnimation,
    getPositionOffset,
    getRotationOffset,
    setTime,
    getTime,
    reset,
    phase: phaseRef.current,
  };
};

// Hook for managing multiple wires' animations
export const useMultiWireAnimation = (wireCount: number, config: WireAnimationConfig = {}) => {
  const wireAnimations = useRef(
    Array.from({ length: wireCount }, (_, i) => ({
      ...config,
      wireIndex: i,
    })).map(cfg => useWireAnimation(cfg))
  );

  const getAllAnimations = useCallback((time: number): AnimationValues[] => {
    return wireAnimations.current.map(anim => anim.getAnimation(time));
  }, []);

  const resetAll = useCallback(() => {
    wireAnimations.current.forEach(anim => anim.reset());
  }, []);

  return {
    wireAnimations: wireAnimations.current,
    getAllAnimations,
    resetAll,
  };
};

export default useWireAnimation;
