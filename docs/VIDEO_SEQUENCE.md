# Scroll-Controlled Video Sequence System

## Overview
This system generates scroll-controlled video sequences showing wire cross-section reveals with synchronized annotations.

## Files Created

### 1. `scripts/generateWireFrames.ts`
Frame generation script using Three.js
- Generates 150 frames at 30fps (5 seconds total)
- Creates realistic wire meshes with layered construction
- Supports multiple wire types (speaker, coaxial, multicore) and tiers (master, m1, pro)
- Outputs PNG frames to `public/video-frames/`

**Usage:**
```bash
npx ts-node scripts/generateWireFrames.ts
```

### 2. `scripts/compileVideo.sh`
FFmpeg compilation script
- Converts PNG frames to H.264 MP4 and VP9 WebM
- High quality encoding (CRF 18)
- 1920x1080 resolution at 30fps
- Outputs to `public/` directory

**Usage:**
```bash
bash scripts/compileVideo.sh
```

### 3. `src/components/VideoScroll.tsx`
Scroll-controlled video player component
- React component with TypeScript
- Integrates with GSAP ScrollTrigger
- Shows loading state and error fallback
- Supports poster images

**Props:**
- `src`: Video URL
- `wireType`: 'speaker' | 'coaxial' | 'multicore'
- `tier`: 'master' | 'm1' | 'pro'
- `className`: Optional CSS classes

### 4. `src/hooks/useVideoScroll.ts`
Custom hook for scroll-to-video synchronization
- Uses GSAP ScrollTrigger
- Maps scroll progress to video.currentTime
- Configurable scrub smoothness
- Optional pin functionality

**Usage:**
```tsx
const videoRef = useRef<HTMLVideoElement>(null);
const { isReady, progress } = useVideoScroll({
  videoRef,
  duration: 5,
  scrub: 1,
});
```

### 5. `src/components/VideoAnnotations.tsx`
Annotation labels synced with video playback
- Shows labels at specific timestamps
- Smooth fade in/out transitions
- Copper color scheme (#E85D04)
- Layer reveal indicators

**Timestamps:**
- 0.0s: "Outer Jacket"
- 1.0s: "Shielding Layer"
- 2.0s: "Insulation"
- 3.0s: "Copper Core"

## Video Content Timeline

| Time | Frames | Content | Camera |
|------|--------|---------|--------|
| 0-1s | 1-30 | Wire exterior rotating | Slight angle |
| 1-2s | 31-60 | First peel - jacket opens | Closer view |
| 2-3s | 61-90 | Second peel - shielding | Top-down angle |
| 3-4s | 91-120 | Core reveal - copper strands | Directly above |
| 4-5s | 121-150 | Tier comparison | Pulls back |

## Prerequisites

```bash
# Install canvas for Node.js frame generation
npm install --save-dev canvas

# Ensure FFmpeg is installed for video compilation
# macOS: brew install ffmpeg
# Ubuntu: sudo apt-get install ffmpeg
```

## Generation Process

1. **Generate Frames**
   ```bash
   npx ts-node scripts/generateWireFrames.ts
   ```
   - Takes ~5-10 minutes
   - Outputs 150 PNG files to `public/video-frames/`

2. **Compile Video**
   ```bash
   bash scripts/compileVideo.sh
   ```
   - Creates `public/wire-reveal.mp4`
   - Creates `public/wire-reveal.webm` (fallback)

3. **Use in Components**
   ```tsx
   import { VideoScroll } from '@/components/VideoScroll';
   import { VideoAnnotations } from '@/components/VideoAnnotations';
   
   function WireSection() {
     const [currentTime, setCurrentTime] = useState(0);
     
     return (
       <div className="relative h-screen">
         <VideoScroll
           src="/wire-reveal.mp4"
           wireType="speaker"
           tier="master"
         />
         <VideoAnnotations
           currentTime={currentTime}
           wireType="speaker"
         />
       </div>
     );
   }
   ```

## Performance Optimizations

- Frames generated at 1080p for crisp quality
- PNG compression option in compile script
- WebM format for better compression
- Lazy loading with Intersection Observer
- Video preloading with `preload="auto"`
- Smooth scrubbing with GSAP scrub parameter

## Browser Support

- Chrome/Edge: Full support (MP4 + WebM)
- Firefox: Full support (WebM preferred)
- Safari: MP4 support (WebM via fallback)
- Mobile: Touch-optimized scroll handling

## Troubleshooting

### Frame generation fails
- Ensure canvas package is installed
- Check Node.js version (v16+)
- Verify write permissions to public/video-frames/

### Video won't play
- Check FFmpeg is installed
- Verify frames were generated
- Check console for encoding errors

### Scroll sync laggy
- Reduce scrub value for smoother updates
- Ensure video is properly preloaded
- Check for other scroll listeners

## Configuration

Edit these constants in `generateWireFrames.ts`:
- `TOTAL_FRAMES`: Total number of frames (default: 150)
- `FPS`: Frame rate (default: 30)
- `WIDTH`/`HEIGHT`: Resolution (default: 1920x1080)

Edit in `compileVideo.sh`:
- `CRF`: Quality level (lower = better, default: 18)
- Compression settings
