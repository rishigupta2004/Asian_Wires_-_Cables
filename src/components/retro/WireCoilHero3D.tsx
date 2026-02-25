import React, { useRef, useEffect, useState } from 'react';

export interface WireCoilHero3DProps {
    onAnatomyClick?: () => void;
}

export default function WireCoilHero3D({ onAnatomyClick }: WireCoilHero3DProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!containerRef.current) return;
            const rect = containerRef.current.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width;
            const y = (e.clientY - rect.top) / rect.height;
            setMousePos({ x, y });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Fixed internal resolution for consistent retro pixelation
        const canvasW = 800;
        const canvasH = 800;
        canvas.width = canvasW;
        canvas.height = canvasH;

        let animationFrameId: number;
        let time = 0;

        const render = () => {
            // Clear canvas
            ctx.clearRect(0, 0, canvasW, canvasH);

            const R = 220;           // coil radius (scaled up for 800x800)
            const pitch = 35;        // spacing between loops
            const numCoils = 6;      // number of full loops
            const steps = 300;       // smoothness

            // Auto rotation + mouse interaction
            const rotY = (time * 0.003) + (mousePos.x - 0.5) * 2.0;
            const rotX = -0.3 + (mousePos.y - 0.5) * 0.8;

            const segments = [];

            for (let i = 0; i <= steps * numCoils; i++) {
                const angle = (i / steps) * Math.PI * 2;
                const rawX = R * Math.cos(angle);
                const rawY = pitch * (i / steps) - (pitch * numCoils) / 2;
                const rawZ = R * Math.sin(angle);

                // Apply Y rotation
                const x = rawX * Math.cos(rotY) - rawZ * Math.sin(rotY);
                const z = rawX * Math.sin(rotY) + rawZ * Math.cos(rotY);
                // Apply X rotation
                const y = rawY * Math.cos(rotX) - z * Math.sin(rotX);
                const zFinal = rawY * Math.sin(rotX) + z * Math.cos(rotX);

                // Perspective projection
                const fov = 1000;
                const scale = fov / (fov + zFinal + 200);
                const screenX = x * scale + canvasW / 2;
                const screenY = y * scale + canvasH / 2;

                segments.push({ screenX, screenY, zFinal, scale, angle, i, total: steps * numCoils });
            }

            // Sort back-to-front (Painter's algorithm)
            // We actually want to group into overlapping segments or draw as points with very thick lines
            // For a continuous ribbon in 3D, drawing overlapping spheres/circles is easiest for canvas without intersecting geometry issues
            segments.sort((a, b) => b.zFinal - a.zFinal);

            segments.forEach((seg) => {
                const baseThickness = 32 * seg.scale;

                ctx.beginPath();
                ctx.arc(seg.screenX, seg.screenY, baseThickness, 0, Math.PI * 2);

                // Simulating 3D shading based on the angle (top highlight, bottom shadow)
                // Creating a subtle gradient across the "circle" point to look like a cylinder segment
                const grad = ctx.createLinearGradient(
                    seg.screenX, seg.screenY - baseThickness,
                    seg.screenX, seg.screenY + baseThickness
                );

                grad.addColorStop(0, '#3A3A3A'); // Highlight
                grad.addColorStop(0.3, '#1A1A1A'); // Mid
                grad.addColorStop(1, '#0A0502'); // Shadow

                ctx.fillStyle = grad;
                ctx.fill();

                // At the very first and last segment, draw the cross section!
                if (seg.i === 0 || seg.i === seg.total) {
                    ctx.beginPath();
                    ctx.arc(seg.screenX, seg.screenY, baseThickness * 0.8, 0, Math.PI * 2);
                    ctx.fillStyle = '#4A4A4A'; // Armor
                    ctx.fill();

                    ctx.beginPath();
                    ctx.arc(seg.screenX, seg.screenY, baseThickness * 0.6, 0, Math.PI * 2);
                    ctx.fillStyle = '#FF3300'; // Insulation
                    ctx.fill();

                    ctx.beginPath();
                    ctx.arc(seg.screenX, seg.screenY, baseThickness * 0.3, 0, Math.PI * 2);
                    ctx.fillStyle = '#B87333'; // Copper
                    ctx.fill();
                }
            });

            time += 6; // roughly 60fps delta
            animationFrameId = requestAnimationFrame(render);
        };

        render();

        return () => cancelAnimationFrame(animationFrameId);
    }, [mousePos]);

    return (
        <div
            ref={containerRef}
            className="w-full aspect-square bg-[#E4E3DB] border-4 border-[#0F0F0F] relative overflow-hidden cursor-pointer group"
            style={{ boxShadow: 'inset 6px 6px 0px rgba(0,0,0,0.07)' }}
            onClick={onAnatomyClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Registration corner marks */}
            <div className="absolute top-4 left-4 w-6 h-6 border-t-4 border-l-4 border-[#0F0F0F] opacity-30" />
            <div className="absolute top-4 right-4 w-6 h-6 border-t-4 border-r-4 border-[#0F0F0F] opacity-30" />
            <div className="absolute bottom-16 left-4 w-6 h-6 border-b-4 border-l-4 border-[#0F0F0F] opacity-30" />
            <div className="absolute bottom-16 right-4 w-6 h-6 border-b-4 border-r-4 border-[#0F0F0F] opacity-30" />

            <canvas
                ref={canvasRef}
                className="w-full h-full object-cover"
                style={{ imageRendering: 'pixelated' }}
            />

            {/* Tooltip on hover */}
            {isHovered && (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#0F0F0F] text-[#E4E3DB] px-4 py-2 font-mono text-sm font-bold border-2 border-[#E4E3DB] shadow-[4px_4px_0px_#FF3300] pointer-events-none z-20">
                    CLICK TO EXPLORE ANATOMY
                </div>
            )}

            {/* Bottom data strip */}
            <div className="absolute bottom-0 left-0 right-0 border-t-4 border-[#0F0F0F] bg-[#0F0F0F] px-4 py-3 flex justify-between font-mono text-xs font-bold text-[#E4E3DB]">
                <span>3C × 240mm² XLPE</span>
                <span className="text-[#FF3300] animate-pulse">ROTATE ↻</span>
                <span>11kV GRADE</span>
            </div>
        </div>
    );
}
