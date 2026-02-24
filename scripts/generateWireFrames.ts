/**
 * Frame Generation Script
 * Generates 150 frames (5 seconds @ 30fps) of wire cross-section animation
 * 
 * Prerequisites: npm install canvas
 * Run: npx ts-node scripts/generateWireFrames.ts
 */

import * as THREE from 'three';
import { createCanvas } from 'canvas';
import * as fs from 'fs';
import * as path from 'path';

// Configuration
const TOTAL_FRAMES = 150;
const FPS = 30;
const WIDTH = 1920;
const HEIGHT = 1080;
const OUTPUT_DIR = path.join(process.cwd(), 'public', 'video-frames');

// Wire types and tiers
const WIRE_TYPES = ['speaker', 'coaxial', 'multicore'] as const;
const TIERS = ['master', 'm1', 'pro'] as const;

interface WireLayer {
  name: string;
  color: number;
  radius: number;
  opacity: number;
  revealAt: number; // frame number when layer starts revealing
  visible: boolean;
}

interface WireConfig {
  type: typeof WIRE_TYPES[number];
  tier: typeof TIERS[number];
  layers: WireLayer[];
}

// Wire configurations based on tier
function getWireConfig(type: typeof WIRE_TYPES[number], tier: typeof TIERS[number]): WireLayer[] {
  const baseRadius = tier === 'master' ? 3 : tier === 'm1' ? 2.5 : 2;
  
  return [
    {
      name: 'Copper Core',
      color: 0xE85D04,
      radius: baseRadius * 0.3,
      opacity: 1,
      revealAt: 90,
      visible: true
    },
    {
      name: 'Insulation',
      color: 0x2D2D2D,
      radius: baseRadius * 0.6,
      opacity: 0.9,
      revealAt: 60,
      visible: true
    },
    {
      name: 'Shielding Layer',
      color: 0x666666,
      radius: baseRadius * 0.85,
      opacity: 0.8,
      revealAt: 30,
      visible: true
    },
    {
      name: 'Outer Jacket',
      color: 0x1A1A1A,
      radius: baseRadius,
      opacity: 1,
      revealAt: 0,
      visible: true
    }
  ];
}

class FrameGenerator {
  private renderer: THREE.WebGLRenderer;
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private wireGroup: THREE.Group;

  constructor() {
    // Create offscreen renderer using canvas
    const canvas = createCanvas(WIDTH, HEIGHT);
    this.renderer = new THREE.WebGLRenderer({ 
      canvas: canvas as unknown as HTMLCanvasElement,
      antialias: true,
      alpha: false
    });
    this.renderer.setSize(WIDTH, HEIGHT);
    this.renderer.setPixelRatio(1);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // Create scene
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x0A0A0A);

    // Setup camera
    this.camera = new THREE.PerspectiveCamera(45, WIDTH / HEIGHT, 0.1, 100);
    this.camera.position.set(8, 6, 12);
    this.camera.lookAt(0, 0, 0);

    // Setup lights
    this.setupLights();

    // Create wire group
    this.wireGroup = new THREE.Group();
    this.scene.add(this.wireGroup);
  }

  private setupLights(): void {
    // Ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    this.scene.add(ambientLight);

    // Key light
    const keyLight = new THREE.DirectionalLight(0xffffff, 1);
    keyLight.position.set(10, 10, 10);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 2048;
    keyLight.shadow.mapSize.height = 2048;
    this.scene.add(keyLight);

    // Fill light
    const fillLight = new THREE.DirectionalLight(0xffffff, 0.5);
    fillLight.position.set(-10, 0, 5);
    this.scene.add(fillLight);

    // Rim light
    const rimLight = new THREE.DirectionalLight(0xffd700, 0.3);
    rimLight.position.set(0, 5, -10);
    this.scene.add(rimLight);

    // Copper accent light
    const copperLight = new THREE.PointLight(0xE85D04, 0.5);
    copperLight.position.set(0, -5, 5);
    this.scene.add(copperLight);
  }

  private createWireMesh(config: WireLayer[]): THREE.Group {
    const group = new THREE.Group();

    config.forEach((layer, index) => {
      // Create cylinder for each layer
      const geometry = new THREE.CylinderGeometry(
        layer.radius, 
        layer.radius, 
        10, 
        32,
        1,
        true // open ends
      );
      
      const material = new THREE.MeshStandardMaterial({
        color: layer.color,
        metalness: index === 0 ? 0.9 : 0.1, // Copper core is metallic
        roughness: index === 0 ? 0.1 : 0.8,
        transparent: layer.opacity < 1,
        opacity: layer.opacity,
        side: THREE.DoubleSide
      });

      const mesh = new THREE.Mesh(geometry, material);
      mesh.rotation.z = Math.PI / 2;
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      mesh.userData = { layerIndex: index, originalOpacity: layer.opacity };
      
      group.add(mesh);
    });

    return group;
  }

  private getMeshMaterial(mesh: THREE.Mesh): THREE.MeshStandardMaterial {
    const material = mesh.material;
    if (Array.isArray(material)) {
      return material[0] as THREE.MeshStandardMaterial;
    }
    return material as THREE.MeshStandardMaterial;
  }

  private updateWireVisibility(wireGroup: THREE.Group, frame: number): void {
    wireGroup.children.forEach((child) => {
      const mesh = child as THREE.Mesh;
      const layerIndex = mesh.userData.layerIndex;
      const config = getWireConfig('speaker', 'master')[layerIndex];
      const material = this.getMeshMaterial(mesh);
      
      if (frame < config.revealAt) {
        // Layer not revealed yet
        mesh.visible = layerIndex === wireGroup.children.length - 1; // Only show outer
        material.opacity = mesh.userData.originalOpacity;
      } else if (frame < config.revealAt + 30) {
        // Layer is peeling
        const peelProgress = (frame - config.revealAt) / 30;
        
        // Create peel effect by rotating part of the mesh
        if (layerIndex < wireGroup.children.length - 1) {
          mesh.visible = true;
          material.opacity = mesh.userData.originalOpacity;
          
          // Peel rotation
          mesh.rotation.x = peelProgress * Math.PI * 0.5 * (layerIndex + 1) * 0.1;
        }
      } else {
        // Layer fully revealed
        mesh.visible = true;
        mesh.rotation.x = 0;
        material.opacity = mesh.userData.originalOpacity;
      }
    });
  }

  private updateCamera(frame: number): void {
    const progress = frame / TOTAL_FRAMES;
    
    // Camera animation based on frame ranges
    if (frame <= 30) {
      // Frames 1-30: Slight angle, full jacket visible
      this.camera.position.set(8, 6, 12);
      this.camera.lookAt(0, 0, 0);
    } else if (frame <= 60) {
      // Frames 31-60: Closer view, first peel
      const t = (frame - 30) / 30;
      this.camera.position.set(
        8 - t * 2,
        6 - t * 1,
        12 - t * 4
      );
      this.camera.lookAt(0, 0, 0);
    } else if (frame <= 90) {
      // Frames 61-90: Top-down angle
      const t = (frame - 60) / 30;
      this.camera.position.set(
        6,
        10 - t * 5,
        8 - t * 3
      );
      this.camera.lookAt(0, 0, 0);
    } else if (frame <= 120) {
      // Frames 91-120: Directly above
      this.camera.position.set(0, 8, 2);
      this.camera.lookAt(0, 0, 0);
    } else {
      // Frames 121-150: Pulls back to show all tiers
      const t = (frame - 120) / 30;
      this.camera.position.set(
        t * 5,
        8 + t * 2,
        2 + t * 10
      );
      this.camera.lookAt(0, 0, 0);
    }
  }

  async generateFrame(frame: number, wireConfig: WireConfig): Promise<Buffer> {
    // Clear previous wire
    while (this.wireGroup.children.length > 0) {
      this.wireGroup.remove(this.wireGroup.children[0]);
    }

    // Create wire mesh
    const wireMesh = this.createWireMesh(wireConfig.layers);
    this.wireGroup.add(wireMesh);

    // Update rotation
    this.wireGroup.rotation.y = (frame / TOTAL_FRAMES) * Math.PI * 2;
    this.wireGroup.rotation.z = Math.sin(frame * 0.02) * 0.1;

    // Update visibility based on frame
    this.updateWireVisibility(wireMesh, frame);

    // Update camera
    this.updateCamera(frame);

    // Render
    this.renderer.render(this.scene, this.camera);

    // Export as PNG
    const canvas = this.renderer.domElement as HTMLCanvasElement;
    const dataUrl = canvas.toDataURL('image/png');
    const base64Data = dataUrl.replace(/^data:image\/png;base64,/, '');
    const pngBuffer = Buffer.from(base64Data, 'base64');

    return pngBuffer;
  }

  dispose(): void {
    this.renderer.dispose();
  }
}

async function main(): Promise<void> {
  console.log('🎬 Starting frame generation...');
  console.log(`Target: ${TOTAL_FRAMES} frames @ ${FPS}fps`);
  console.log(`Resolution: ${WIDTH}x${HEIGHT}`);

  // Ensure output directory exists
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  // Initialize generator
  const generator = new FrameGenerator();

  // Generate frames for master tier speaker wire
  const wireConfig: WireConfig = {
    type: 'speaker',
    tier: 'master',
    layers: getWireConfig('speaker', 'master')
  };

  console.log('Generating frames...');
  
  for (let frame = 1; frame <= TOTAL_FRAMES; frame++) {
    const frameStartTime = Date.now();
    
    // Generate frame
    const pngBuffer = await generator.generateFrame(frame, wireConfig);
    
    // Save frame
    const frameNumber = frame.toString().padStart(4, '0');
    const framePath = path.join(OUTPUT_DIR, `frame_${frameNumber}.png`);
    fs.writeFileSync(framePath, pngBuffer);
    
    const frameDuration = Date.now() - frameStartTime;
    const progress = (frame / TOTAL_FRAMES) * 100;
    
    // Progress indicator
    if (frame % 10 === 0 || frame === TOTAL_FRAMES) {
      process.stdout.write(`\rProgress: ${progress.toFixed(1)}% (${frame}/${TOTAL_FRAMES}) - Last frame: ${frameDuration}ms`);
    }
  }

  console.log('\n\n✅ Frame generation complete!');
  console.log(`📁 Output: ${OUTPUT_DIR}`);
  console.log(`📊 Total frames: ${TOTAL_FRAMES}`);
  console.log(`⏱️  Duration: ${TOTAL_FRAMES / FPS}s`);
  
  generator.dispose();
}

// Run if called directly
if (require.main === module) {
  main().catch((error) => {
    console.error('❌ Error generating frames:', error);
    process.exit(1);
  });
}

export { FrameGenerator, getWireConfig, TOTAL_FRAMES, FPS, WIDTH, HEIGHT };
