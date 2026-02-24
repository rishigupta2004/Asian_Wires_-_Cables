const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Configuration
const ASSETS_DIR = path.join(__dirname, '..', 'Assests');
const OUTPUT_DIR = path.join(__dirname, '..', 'public', 'optimized');
const PUBLIC_IMAGES_DIR = path.join(__dirname, '..', 'public', 'images');

// Create output directories
const createDirs = () => {
  [OUTPUT_DIR, PUBLIC_IMAGES_DIR, path.join(PUBLIC_IMAGES_DIR, 'brands')].forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
      console.log(`Created directory: ${dir}`);
    }
  });
};

// Generate blur placeholder
const generateBlurPlaceholder = async (imagePath) => {
  try {
    const buffer = await sharp(imagePath)
      .resize(20, 20, { fit: 'cover' })
      .blur()
      .toBuffer();
    return `data:image/png;base64,${buffer.toString('base64')}`;
  } catch (error) {
    console.error(`Error generating blur for ${imagePath}:`, error);
    return null;
  }
};

// Process a single image
const processImage = async (inputPath, outputBaseName) => {
  const sizes = [
    { width: 400, suffix: '400w' },
    { width: 800, suffix: '800w' },
    { width: 1200, suffix: '1200w' },
  ];

  const results = {
    webp: [],
    png: [],
    blurPlaceholder: null,
  };

  try {
    // Get image metadata
    const metadata = await sharp(inputPath).metadata();
    
    // Generate blur placeholder
    results.blurPlaceholder = await generateBlurPlaceholder(inputPath);

    // Process each size
    for (const size of sizes) {
      // Skip if image is smaller than target size
      if (metadata.width && metadata.width < size.width) {
        continue;
      }

      // Generate WebP
      const webpPath = path.join(OUTPUT_DIR, `${outputBaseName}-${size.suffix}.webp`);
      await sharp(inputPath)
        .resize(size.width, null, { 
          withoutEnlargement: true,
          fit: 'inside'
        })
        .webp({ quality: 80, effort: 6 })
        .toFile(webpPath);
      results.webp.push({ size: size.suffix, path: webpPath });

      // Generate PNG fallback
      const pngPath = path.join(OUTPUT_DIR, `${outputBaseName}-${size.suffix}.png`);
      await sharp(inputPath)
        .resize(size.width, null, { 
          withoutEnlargement: true,
          fit: 'inside'
        })
        .png({ quality: 90 })
        .toFile(pngPath);
      results.png.push({ size: size.suffix, path: pngPath });
    }

    console.log(`✓ Processed: ${path.basename(inputPath)}`);
    return results;
  } catch (error) {
    console.error(`✗ Error processing ${inputPath}:`, error.message);
    return null;
  }
};

// Copy brand logos
const copyBrandLogos = async () => {
  const brandFiles = [
    { src: 'ASIAN.png', dest: 'ASIAN.png' },
    { src: 'M1_VOICE.png', dest: 'M1_VOICE.png' },
    { src: 'True_MAster.png', dest: 'True_MAster.png' },
  ];

  for (const file of brandFiles) {
    const srcPath = path.join(ASSETS_DIR, file.src);
    const destPath = path.join(PUBLIC_IMAGES_DIR, 'brands', file.dest);
    
    if (fs.existsSync(srcPath)) {
      fs.copyFileSync(srcPath, destPath);
      console.log(`✓ Copied brand logo: ${file.src}`);
    } else {
      console.warn(`⚠ Brand logo not found: ${file.src}`);
    }
  }
};

// Copy hero image
const copyHeroImage = async () => {
  const heroFile = 'Wires and Leads Design Feb 6 2026.png';
  const srcPath = path.join(ASSETS_DIR, heroFile);
  const destPath = path.join(PUBLIC_IMAGES_DIR, 'hero.png');
  
  if (fs.existsSync(srcPath)) {
    fs.copyFileSync(srcPath, destPath);
    console.log(`✓ Copied hero image`);
    
    // Process hero image with multiple sizes
    await processImage(srcPath, 'hero');
  } else {
    console.warn(`⚠ Hero image not found`);
  }
};

// Copy product images
const copyProductImages = async () => {
  const productFiles = fs.readdirSync(ASSETS_DIR)
    .filter(file => file.startsWith('Wire Image Request'))
    .sort((a, b) => {
      // Extract numbers from filenames for proper sorting
      const numA = parseInt(a.match(/\((\d+)\)/)?.[1] || '0');
      const numB = parseInt(b.match(/\((\d+)\)/)?.[1] || '0');
      return numA - numB;
    });

  console.log(`\nFound ${productFiles.length} product images`);

  for (let i = 0; i < productFiles.length; i++) {
    const file = productFiles[i];
    const srcPath = path.join(ASSETS_DIR, file);
    const destPath = path.join(PUBLIC_IMAGES_DIR, `product-${i + 1}.png`);
    
    fs.copyFileSync(srcPath, destPath);
    console.log(`✓ Copied product image: ${file} → product-${i + 1}.png`);
    
    // Process each product image
    await processImage(srcPath, `product-${i + 1}`);
  }
};

// Main execution
const main = async () => {
  console.log('🚀 Starting image optimization...\n');
  
  createDirs();
  
  await copyBrandLogos();
  await copyHeroImage();
  await copyProductImages();
  
  console.log('\n✅ Image optimization complete!');
  console.log(`\n📁 Output locations:`);
  console.log(`   - Original images: ${PUBLIC_IMAGES_DIR}`);
  console.log(`   - Optimized images: ${OUTPUT_DIR}`);
};

main().catch(console.error);
