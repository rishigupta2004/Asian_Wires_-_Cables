#!/bin/bash

# FFmpeg Compilation Script
# Compiles PNG frames into video files (MP4 and WebM)
# 
# Run: bash scripts/compileVideo.sh

set -e

# Configuration
INPUT_DIR="public/video-frames"
OUTPUT_DIR="public"
FRAME_PATTERN="frame_%04d.png"
FPS=30
CRF=18  # Quality (lower = better, 18 is visually lossless)

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🎬 FFmpeg Video Compilation${NC}"
echo "================================"

# Check if input directory exists
if [ ! -d "$INPUT_DIR" ]; then
    echo -e "${RED}❌ Error: Input directory not found: $INPUT_DIR${NC}"
    echo "Run: npx ts-node scripts/generateWireFrames.ts first"
    exit 1
fi

# Check if frames exist
FRAME_COUNT=$(ls -1 "$INPUT_DIR"/frame_*.png 2>/dev/null | wc -l)
if [ "$FRAME_COUNT" -eq 0 ]; then
    echo -e "${RED}❌ Error: No frames found in $INPUT_DIR${NC}"
    exit 1
fi

echo -e "${BLUE}📊 Found $FRAME_COUNT frames${NC}"

# Ensure output directory exists
mkdir -p "$OUTPUT_DIR"

# Get video dimensions from first frame
FIRST_FRAME=$(ls -1 "$INPUT_DIR"/frame_*.png | head -1)
if command -v identify &> /dev/null; then
    DIMENSIONS=$(identify -format "%w:%h" "$FIRST_FRAME")
else
    echo -e "${YELLOW}⚠️  ImageMagick not found, using default 1920x1080${NC}"
    DIMENSIONS="1920:1080"
fi

WIDTH=$(echo $DIMENSIONS | cut -d: -f1)
HEIGHT=$(echo $DIMENSIONS | cut -d: -f2)

echo -e "${BLUE}📐 Frame size: ${WIDTH}x${HEIGHT}${NC}"

# Function to show progress
show_progress() {
    local duration=$1
    local message=$2
    echo -e "${YELLOW}⏳ $message${NC}"
    
    # Progress indicator
    for i in {1..$duration}; do
        echo -n "."
        sleep 1
    done
    echo ""
}

# Function to compress PNGs before encoding (optional)
compress_frames() {
    echo -e "${BLUE}🗜️  Compressing PNG frames...${NC}"
    
    # Check if pngquant is available
    if command -v pngquant &> /dev/null; then
        echo "Using pngquant for optimization..."
        for frame in "$INPUT_DIR"/frame_*.png; do
            pngquant --quality=70-85 --force --output "$frame" "$frame" 2>/dev/null || true
        done
        echo -e "${GREEN}✅ PNG compression complete${NC}"
    else
        echo -e "${YELLOW}⚠️  pngquant not found, skipping compression${NC}"
    fi
}

# Ask user if they want to compress
read -p "Compress PNG frames before encoding? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    compress_frames
fi

echo ""
echo -e "${BLUE}🎥 Starting video encoding...${NC}"
echo ""

# Encode H.264 MP4
echo -e "${BLUE}📼 Encoding H.264 MP4...${NC}"
ffmpeg -y \
    -framerate $FPS \
    -i "$INPUT_DIR/$FRAME_PATTERN" \
    -c:v libx264 \
    -pix_fmt yuv420p \
    -crf $CRF \
    -preset slow \
    -movflags +faststart \
    -r $FPS \
    -s ${WIDTH}x${HEIGHT} \
    -tune film \
    -profile:v high \
    -level 4.2 \
    "$OUTPUT_DIR/wire-reveal.mp4" 2>&1 | grep -E "(frame|fps|time|bitrate|speed)" || true

if [ -f "$OUTPUT_DIR/wire-reveal.mp4" ]; then
    MP4_SIZE=$(du -h "$OUTPUT_DIR/wire-reveal.mp4" | cut -f1)
    echo -e "${GREEN}✅ MP4 created: wire-reveal.mp4 (${MP4_SIZE})${NC}"
else
    echo -e "${RED}❌ Failed to create MP4${NC}"
    exit 1
fi

echo ""

# Encode VP9 WebM
echo -e "${BLUE}📼 Encoding VP9 WebM...${NC}"
ffmpeg -y \
    -framerate $FPS \
    -i "$INPUT_DIR/$FRAME_PATTERN" \
    -c:v libvpx-vp9 \
    -pix_fmt yuv420p \
    -crf $CRF \
    -b:v 0 \
    -deadline good \
    -cpu-used 2 \
    -r $FPS \
    -s ${WIDTH}x${HEIGHT} \
    -auto-alt-ref 1 \
    -lag-in-frames 25 \
    "$OUTPUT_DIR/wire-reveal.webm" 2>&1 | grep -E "(frame|fps|time|bitrate|speed)" || true

if [ -f "$OUTPUT_DIR/wire-reveal.webm" ]; then
    WEBM_SIZE=$(du -h "$OUTPUT_DIR/wire-reveal.webm" | cut -f1)
    echo -e "${GREEN}✅ WebM created: wire-reveal.webm (${WEBM_SIZE})${NC}"
else
    echo -e "${YELLOW}⚠️  Failed to create WebM (VP9 may not be available)${NC}"
fi

echo ""
echo "================================"
echo -e "${GREEN}🎉 Video compilation complete!${NC}"
echo ""
echo -e "${BLUE}📁 Output files:${NC}"
echo "  • public/wire-reveal.mp4 (H.264)"
echo "  • public/wire-reveal.webm (VP9)"
echo ""
echo -e "${BLUE}📊 Specifications:${NC}"
echo "  • Resolution: ${WIDTH}x${HEIGHT}"
echo "  • FPS: $FPS"
echo "  • Duration: $(echo "scale=1; $FRAME_COUNT / $FPS" | bc)s"
echo "  • Quality: CRF $CRF"
echo ""
echo "Next steps:"
echo "  1. Reference videos in VideoScroll component"
echo "  2. Test scroll synchronization"
echo "  3. Optimize if needed"
