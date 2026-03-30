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
    const sizeRef = useRef({ width: 400, height: 400, dpr: 1 });

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
        const ctx = canvas.getContext('2d', { alpha: true, desynchronized: true });
        if (!ctx) return;

        const numCoils = 6;
        const steps = 150;
        const resizeCanvas = () => {
            if (!containerRef.current) return;
            const rect = containerRef.current.getBoundingClientRect();
            const width = Math.max(280, Math.round(rect.width));
            const height = Math.max(280, Math.round(rect.height || rect.width));
            const dpr = Math.min(window.devicePixelRatio || 1, 2);

            sizeRef.current = { width, height, dpr };
            canvas.width = Math.round(width * dpr);
            canvas.height = Math.round(height * dpr);
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        };

        resizeCanvas();

        const render = () => {
            const canvasW = sizeRef.current.width;
            const canvasH = sizeRef.current.height;
            const radius = canvasW * 0.27;
            const pitch = canvasW * 0.045;

            ctx.clearRect(0, 0, canvasW, canvasH);

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
                const rawX = radius * Math.cos(angle);
                const rawY = pitch * (i / steps) - (pitch * numCoils) / 2;
                const rawZ = radius * Math.sin(angle);

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
                const t = Math.max(4.8, canvasW * 0.04 * seg.s);

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
        window.addEventListener('resize', resizeCanvas, { passive: true });
        window.addEventListener('orientationchange', resizeCanvas);
        render();

        return () => {
            cancelAnimationFrame(rafRef.current);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('resize', resizeCanvas);
            window.removeEventListener('orientationchange', resizeCanvas);
        };
    }, [handleMouseMove]);

    return (
        <div
            ref={containerRef}
            className="w-full aspect-square relative overflow-hidden rounded-[26px] md:rounded-full [mask-image:radial-gradient(circle_at_center,black_63%,transparent_100%)]"
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
