#!/usr/bin/env node

/**
 * Asset Optimization Script
 * 
 * Optimizes images, generates multiple sizes, and creates WebP versions
 * Usage: node scripts/optimize-assets.js
 */

const fs = require('fs');
const path = require('path');

// Configuration
const CONFIG = {
  inputDir: path.join(process.cwd(), 'public', 'images'),
  outputDir: path.join(process.cwd(), 'public', 'optimized'),
  sizes: [320, 640, 960, 1280, 1920],
  formats: ['webp', 'jpeg'],
  quality: {
    webp: 85,
    jpeg: 80,
  },
  extensions: ['.jpg', '.jpeg', '.png', '.gif'],
};

// Lazy load sharp only when needed
let sharp;

async function initSharp() {
  if (!sharp) {
    try {
      sharp = require('sharp');
    } catch (e) {
      console.log('⚠️  sharp not installed. Run: npm install -D sharp');
      process.exit(1);
    }
  }
  return sharp;
}

// Ensure output directory exists
function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

// Get all image files recursively
function getImageFiles(dir) {
  const files = [];
  
  function walk(currentDir) {
    const items = fs.readdirSync(currentDir);
    
    for (const item of items) {
      const fullPath = path.join(currentDir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        walk(fullPath);
      } else if (CONFIG.extensions.includes(path.extname(item).toLowerCase())) {
        files.push(fullPath);
      }
    }
  }
  
  if (fs.existsSync(dir)) {
    walk(dir);
  }
  
  return files;
}

// Optimize single image
async function optimizeImage(inputPath, outputBaseDir) {
  const sharpInstance = await initSharp();
  const filename = path.basename(inputPath, path.extname(inputPath));
  const relativePath = path.relative(CONFIG.inputDir, path.dirname(inputPath));
  const outputDir = path.join(outputBaseDir, relativePath);
  
  ensureDir(outputDir);
  
  const image = sharpInstance(inputPath);
  const metadata = await image.metadata();
  
  const results = [];
  
  // Generate responsive sizes
  for (const width of CONFIG.sizes) {
    if (width > metadata.width) continue;
    
    for (const format of CONFIG.formats) {
      const outputFilename = `${filename}-${width}w.${format}`;
      const outputPath = path.join(outputDir, outputFilename);
      
      try {
        await image
          .clone()
          .resize(width, null, { withoutEnlargement: true })
          .toFormat(format, { quality: CONFIG.quality[format] })
          .toFile(outputPath);
        
        const stats = fs.statSync(outputPath);
        results.push({
          filename: outputFilename,
          width,
          format,
          size: (stats.size / 1024).toFixed(2) + 'KB',
        });
      } catch (error) {
        console.error(`  ❌ Failed to create ${outputFilename}:`, error.message);
      }
    }
  }
  
  // Create original size WebP
  const webpFilename = `${filename}.webp`;
  const webpPath = path.join(outputDir, webpFilename);
  
  try {
    await image
      .clone()
      .webp({ quality: CONFIG.quality.webp })
      .toFile(webpPath);
    
    const stats = fs.statSync(webpPath);
    results.push({
      filename: webpFilename,
      width: metadata.width,
      format: 'webp',
      size: (stats.size / 1024).toFixed(2) + 'KB',
    });
  } catch (error) {
    console.error(`  ❌ Failed to create ${webpFilename}:`, error.message);
  }
  
  return results;
}

// Generate image manifest
function generateManifest(results) {
  const manifest = {
    generated: new Date().toISOString(),
    images: results,
  };
  
  const manifestPath = path.join(CONFIG.outputDir, 'manifest.json');
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
  console.log(`\n📝 Manifest saved to: ${manifestPath}`);
}

// Main function
async function main() {
  console.log('🚀 Starting asset optimization...\n');
  
  // Check if input directory exists
  if (!fs.existsSync(CONFIG.inputDir)) {
    console.log(`⚠️  Input directory not found: ${CONFIG.inputDir}`);
    console.log('Creating directories...');
    ensureDir(CONFIG.inputDir);
  }
  
  const files = getImageFiles(CONFIG.inputDir);
  
  if (files.length === 0) {
    console.log('ℹ️  No images found to optimize');
    return;
  }
  
  console.log(`📁 Found ${files.length} images\n`);
  
  const allResults = [];
  
  for (const file of files) {
    console.log(`🖼️  Processing: ${path.relative(CONFIG.inputDir, file)}`);
    
    try {
      const results = await optimizeImage(file, CONFIG.outputDir);
      allResults.push(...results);
      
      console.log(`  ✓ Generated ${results.length} variants`);
    } catch (error) {
      console.error(`  ❌ Error:`, error.message);
    }
  }
  
  // Generate manifest
  generateManifest(allResults);
  
  console.log('\n✨ Optimization complete!');
  console.log(`📊 Total files generated: ${allResults.length}`);
  console.log(`\nNext steps:`);
  console.log(`  1. Use optimized images from: ${path.relative(process.cwd(), CONFIG.outputDir)}`);
  console.log(`  2. Update image paths in your components`);
  console.log(`  3. Run 'npm run build' to test`);
}

// Run if executed directly
if (require.main === module) {
  main().catch(console.error);
}

module.exports = { optimizeImage, CONFIG };
