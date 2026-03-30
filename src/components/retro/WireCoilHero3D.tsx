import React, { useRef, useEffect, useCallback } from 'react';

export interface WireCoilHero3DProps {
    onAnatomyClick?: () => void;
}

export default function WireCoilHero3D({ onAnatomyClick }: WireCoilHero3DProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const mousePosRef = useRef({ x: 0.5, y: 0.5 });
    const rafRef = useRef<number>(0);
    const timeRef = useRef(0);

    // Throttled mouse handler — update ref only, no re-render
    const handleMouseMove = useCallback((e: MouseEvent) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        mousePosRef.current = {
            x: (e.clientX - rect.left) / rect.width,
            y: (e.clientY - rect.top) / rect.height,
        };
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d', { alpha: false });
        if (!ctx) return;

        // Lower resolution for performance — 400x400 instead of 800x800
        const canvasW = 400;
        const canvasH = 400;
        canvas.width = canvasW;
        canvas.height = canvasH;

        const R = 110;
        const pitch = 18;
        const numCoils = 6;
        const steps = 150; // Reduced from 300

        const render = () => {
            ctx.fillStyle = '#F4F0EB';
            ctx.fillRect(0, 0, canvasW, canvasH);

            const mp = mousePosRef.current;
            const rotY = (timeRef.current * 0.003) + (mp.x - 0.5) * 2.0;
            const rotX = -0.3 + (mp.y - 0.5) * 0.8;

            const cosRotY = Math.cos(rotY);
            const sinRotY = Math.sin(rotY);
            const cosRotX = Math.cos(rotX);
            const sinRotX = Math.sin(rotX);

            const segments: { sx: number; sy: number; z: number; s: number; i: number }[] = [];
            const totalSteps = steps * numCoils;

            for (let i = 0; i <= totalSteps; i++) {
                const angle = (i / steps) * Math.PI * 2;
                const rawX = R * Math.cos(angle);
                const rawY = pitch * (i / steps) - (pitch * numCoils) / 2;
                const rawZ = R * Math.sin(angle);

                const x = rawX * cosRotY - rawZ * sinRotY;
                const z = rawX * sinRotY + rawZ * cosRotY;
                const y = rawY * cosRotX - z * sinRotX;
                const zFinal = rawY * sinRotX + z * cosRotX;

                const fov = 500;
                const scale = fov / (fov + zFinal + 100);

                segments.push({
                    sx: x * scale + canvasW / 2,
                    sy: y * scale + canvasH / 2,
                    z: zFinal,
                    s: scale,
                    i
                });
            }

            segments.sort((a, b) => b.z - a.z);

            for (let j = 0; j < segments.length; j++) {
                const seg = segments[j];
                const t = 16 * seg.s;

                ctx.beginPath();
                ctx.arc(seg.sx, seg.sy, t, 0, Math.PI * 2);

                // Simple depth-based shading instead of per-point gradient
                const shade = Math.max(15, Math.min(60, 30 + seg.z * 0.05));
                ctx.fillStyle = `rgb(${shade},${shade},${shade * 0.9})`;
                ctx.fill();

                if (seg.i === 0 || seg.i === totalSteps) {
                    ctx.beginPath();
                    ctx.arc(seg.sx, seg.sy, t * 0.6, 0, Math.PI * 2);
                    ctx.fillStyle = '#FF3300';
                    ctx.fill();
                    ctx.beginPath();
                    ctx.arc(seg.sx, seg.sy, t * 0.3, 0, Math.PI * 2);
                    ctx.fillStyle = '#B87333';
                    ctx.fill();
                }
            }

            timeRef.current += 6;
            rafRef.current = requestAnimationFrame(render);
        };

        window.addEventListener('mousemove', handleMouseMove, { passive: true });
        render();

        return () => {
            cancelAnimationFrame(rafRef.current);
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, [handleMouseMove]);

    return (
        <div
            ref={containerRef}
            className="w-full aspect-square relative overflow-hidden"
            onClick={onAnatomyClick}
        >
            <canvas
                ref={canvasRef}
                className="w-full h-full"
                style={{ imageRendering: 'auto' }}
            />
        </div>
    );
}
