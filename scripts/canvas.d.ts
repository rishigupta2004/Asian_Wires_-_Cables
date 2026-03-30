/**
 * Type declarations for canvas module
 * Used in frame generation script
 */

declare module 'canvas' {
  export function createCanvas(width: number, height: number): HTMLCanvasElement;
  export function loadImage(src: string): Promise<HTMLImageElement>;
}
