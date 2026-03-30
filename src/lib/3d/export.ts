import * as THREE from 'three';
import { GLTFExporter } from 'three/addons/exporters/GLTFExporter.js';
import { OBJExporter } from 'three/addons/exporters/OBJExporter.js';

// ============================================
// TYPES
// ============================================

export interface ExportOptions {
  filename?: string;
  binary?: boolean;
  dracoCompression?: boolean;
  dracoOptions?: {
    compressionLevel?: number;
    quantizationBits?: {
      position?: number;
      normal?: number;
      color?: number;
      uv?: number;
    };
  };
}

export interface LODConfig {
  name: string;
  reductionRatio: number; // 0-1, lower = more aggressive reduction
  segments: number;
  radialSegments: number;
}

// ============================================
// GLB/GLTF EXPORT
// ============================================

/**
 * Export a Three.js scene/object to GLB/GLTF format
 */
export const exportToGLB = async (
  object: THREE.Object3D,
  options: ExportOptions = {}
): Promise<Blob> => {
  const {
    binary = true,
    dracoCompression = true,
    dracoOptions = {
      compressionLevel: 7,
      quantizationBits: {
        position: 11,
        normal: 8,
        color: 8,
        uv: 10,
      },
    },
  } = options;

  return new Promise((resolve, reject) => {
    const exporter = new GLTFExporter();
    
    const exportOptions: any = {
      binary,
      includeCustomExtensions: false,
    };

    if (dracoCompression) {
      exportOptions.compress = true;
      exportOptions.compressionLevel = dracoOptions.compressionLevel;
      exportOptions.quantizationBits = dracoOptions.quantizationBits;
    }

    exporter.parse(
      object,
      (gltf) => {
        if (binary && gltf instanceof ArrayBuffer) {
          resolve(new Blob([gltf], { type: 'model/gltf-binary' }));
        } else {
          const json = JSON.stringify(gltf);
          resolve(new Blob([json], { type: 'model/gltf+json' }));
        }
      },
      (error) => {
        reject(error);
      },
      exportOptions
    );
  });
};

/**
 * Download a blob as a file
 */
export const downloadBlob = (blob: Blob, filename: string): void => {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

// ============================================
// OBJ EXPORT (for compatibility)
// ============================================

/**
 * Export to OBJ format (no materials embedded)
 */
export const exportToOBJ = (object: THREE.Object3D): string => {
  const exporter = new OBJExporter();
  return exporter.parse(object);
};

/**
 * Download OBJ with MTL file
 */
export const downloadOBJ = (object: THREE.Object3D, filename: string): void => {
  const objContent = exportToOBJ(object);
  const blob = new Blob([objContent], { type: 'text/plain' });
  downloadBlob(blob, `${filename}.obj`);
};

// ============================================
// LOD GENERATION
// ============================================

const defaultLODConfigs: LODConfig[] = [
  { name: 'high', reductionRatio: 1.0, segments: 100, radialSegments: 32 },
  { name: 'medium', reductionRatio: 0.5, segments: 50, radialSegments: 20 },
  { name: 'low', reductionRatio: 0.25, segments: 25, radialSegments: 12 },
];

/**
 * Simplify geometry by reducing segments
 */
export const simplifyGeometry = (
  geometry: THREE.BufferGeometry,
  config: LODConfig
): THREE.BufferGeometry => {
  // Create a new simplified version based on the type
  const simplified = geometry.clone();
  
  // For tube geometries, we'd need to regenerate with fewer segments
  // This is a placeholder for actual mesh simplification
  // In production, use libraries like @gltf-transform/core or meshoptimizer
  
  return simplified;
};

/**
 * Generate LOD versions of a wire mesh
 */
export const generateWireLOD = (
  originalMesh: THREE.Mesh,
  configs: LODConfig[] = defaultLODConfigs
): Map<string, THREE.Mesh> => {
  const lodVersions = new Map<string, THREE.Mesh>();
  
  configs.forEach((config) => {
    const lodMesh = originalMesh.clone();
    lodMesh.name = `${originalMesh.name}_${config.name}`;
    
    if (originalMesh.geometry) {
      lodMesh.geometry = simplifyGeometry(originalMesh.geometry, config);
    }
    
    lodVersions.set(config.name, lodMesh);
  });
  
  return lodVersions;
};

// ============================================
// TEXTURE ATLAS GENERATION
// ============================================

export interface TextureAtlasConfig {
  width: number;
  height: number;
  textures: {
    name: string;
    texture: THREE.Texture;
    x: number;
    y: number;
    width: number;
    height: number;
  }[];
}

/**
 * Pack multiple textures into an atlas (placeholder implementation)
 * In production, use a proper texture packing library
 */
export const createTextureAtlas = (
  config: TextureAtlasConfig
): Promise<HTMLCanvasElement> => {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    canvas.width = config.width;
    canvas.height = config.height;
    const ctx = canvas.getContext('2d')!;
    
    // Fill with neutral color
    ctx.fillStyle = '#808080';
    ctx.fillRect(0, 0, config.width, config.height);
    
    resolve(canvas);
  });
};

// ============================================
// OPTIMIZATION UTILITIES
// ============================================

/**
 * Merge geometries for better performance
 */
export const mergeGeometries = (
  geometries: THREE.BufferGeometry[]
): THREE.BufferGeometry => {
  // In production, use BufferGeometryUtils.mergeGeometries
  // This is a simplified placeholder
  if (geometries.length === 0) {
    return new THREE.BufferGeometry();
  }
  
  if (geometries.length === 1) {
    return geometries[0];
  }
  
  // Return first geometry as placeholder
  return geometries[0];
};

/**
 * Optimize materials by deduplication
 */
export const optimizeMaterials = (
  materials: THREE.Material[]
): THREE.Material[] => {
  const uniqueMaterials = new Map<string, THREE.Material>();
  
  materials.forEach((material) => {
    const key = material.uuid;
    if (!uniqueMaterials.has(key)) {
      uniqueMaterials.set(key, material);
    }
  });
  
  return Array.from(uniqueMaterials.values());
};

/**
 * Estimate file size of a geometry
 */
export const estimateGeometrySize = (geometry: THREE.BufferGeometry): number => {
  let size = 0;
  
  // Position attribute (3 floats per vertex)
  const position = geometry.attributes.position;
  if (position) {
    size += position.count * 3 * 4; // 4 bytes per float
  }
  
  // Normal attribute
  const normal = geometry.attributes.normal;
  if (normal) {
    size += normal.count * 3 * 4;
  }
  
  // UV attribute
  const uv = geometry.attributes.uv;
  if (uv) {
    size += uv.count * 2 * 4;
  }
  
  // Index buffer
  const index = geometry.index;
  if (index) {
    size += index.count * 4;
  }
  
  return size;
};

// ============================================
// BATCH EXPORT
// ============================================

export interface BatchExportConfig {
  wires: {
    name: string;
    object: THREE.Object3D;
    lods?: boolean;
  }[];
  outputDir?: string;
  formats?: ('glb' | 'obj')[];
}

/**
 * Export multiple wire models at once
 */
export const batchExport = async (
  config: BatchExportConfig
): Promise<Map<string, Blob>> => {
  const results = new Map<string, Blob>();
  const formats = config.formats || ['glb'];
  
  for (const wire of config.wires) {
    for (const format of formats) {
      const filename = `${wire.name}.${format === 'glb' ? 'glb' : 'obj'}`;
      
      try {
        if (format === 'glb') {
          const blob = await exportToGLB(wire.object, {
            filename: wire.name,
            binary: true,
            dracoCompression: true,
          });
          results.set(filename, blob);
        } else {
          // Generate LODs if requested
          if (wire.lods && wire.object instanceof THREE.Mesh) {
            const lods = generateWireLOD(wire.object);
            lods.forEach((lodMesh, lodName) => {
              const lodFilename = `${wire.name}_${lodName}.obj`;
              // Note: OBJ doesn't support full hierarchy, this is simplified
            });
          }
        }
      } catch (error) {
        console.error(`Failed to export ${filename}:`, error);
      }
    }
  }
  
  return results;
};

// ============================================
// VALIDATION
// ============================================

/**
 * Validate a 3D model before export
 */
export const validateModel = (object: THREE.Object3D): {
  valid: boolean;
  errors: string[];
  warnings: string[];
} => {
  const errors: string[] = [];
  const warnings: string[] = [];
  
  object.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      // Check for missing geometry
      if (!child.geometry) {
        errors.push(`Mesh "${child.name}" has no geometry`);
      } else {
        // Check geometry size
        const size = estimateGeometrySize(child.geometry);
        if (size > 50 * 1024 * 1024) { // 50MB
          warnings.push(`Mesh "${child.name}" is very large (${(size / 1024 / 1024).toFixed(2)}MB)`);
        }
        
        // Check for NaN values
        const position = child.geometry.attributes.position;
        if (position) {
          for (let i = 0; i < Math.min(position.count * 3, 100); i++) {
            if (isNaN(position.array[i])) {
              errors.push(`Mesh "${child.name}" has NaN values in position attribute`);
              break;
            }
          }
        }
      }
      
      // Check for missing materials
      if (!child.material) {
        warnings.push(`Mesh "${child.name}" has no material`);
      }
    }
  });
  
  return {
    valid: errors.length === 0,
    errors,
    warnings,
  };
};

// ============================================
// PERFORMANCE METRICS
// ============================================

export interface ModelMetrics {
  vertexCount: number;
  triangleCount: number;
  materialCount: number;
  textureCount: number;
  estimatedSize: number;
}

/**
 * Get performance metrics for a 3D model
 */
export const getModelMetrics = (object: THREE.Object3D): ModelMetrics => {
  let vertexCount = 0;
  let triangleCount = 0;
  let materialCount = 0;
  let textureCount = 0;
  let estimatedSize = 0;
  
  const materials = new Set<string>();
  const textures = new Set<string>();
  
  object.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      if (child.geometry) {
        const position = child.geometry.attributes.position;
        if (position) {
          vertexCount += position.count;
        }
        
        const index = child.geometry.index;
        if (index) {
          triangleCount += index.count / 3;
        } else {
          triangleCount += (child.geometry.attributes.position?.count || 0) / 3;
        }
        
        estimatedSize += estimateGeometrySize(child.geometry);
      }
      
      if (child.material) {
        const matArray = Array.isArray(child.material) ? child.material : [child.material];
        matArray.forEach((mat) => {
          materials.add(mat.uuid);
          
          // Check for textures
          Object.entries(mat).forEach(([key, value]) => {
            if (value instanceof THREE.Texture) {
              textures.add(value.uuid);
            }
          });
        });
      }
    }
  });
  
  return {
    vertexCount,
    triangleCount: Math.floor(triangleCount),
    materialCount: materials.size,
    textureCount: textures.size,
    estimatedSize,
  };
};
