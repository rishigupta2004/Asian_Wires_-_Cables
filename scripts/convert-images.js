const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function convertImages() {
  const imagesDir = path.join(__dirname, '../public/images');
  const files = fs.readdirSync(imagesDir);
  const pngFiles = files.filter(f => f.endsWith('.png'));
  
  console.log(`Found ${pngFiles.length} PNG files to convert...`);
  
  let totalOriginalSize = 0;
  let totalWebpSize = 0;
  
  for (const file of pngFiles) {
    const inputPath = path.join(imagesDir, file);
    const outputPath = path.join(imagesDir, file.replace('.png', '.webp'));
    
    try {
      const originalStats = fs.statSync(inputPath);
      totalOriginalSize += originalStats.size;
      
      await sharp(inputPath)
        .webp({ quality: 85 })
        .toFile(outputPath);
      
      const webpStats = fs.statSync(outputPath);
      totalWebpSize += webpStats.size;
      
      const savings = ((originalStats.size - webpStats.size) / originalStats.size * 100).toFixed(1);
      console.log(`${file}: ${(originalStats.size/1024/1024).toFixed(2)}MB -> ${(webpStats.size/1024/1024).toFixed(2)}MB (${savings}% saved)`);
    } catch (err) {
      console.error(`Failed to convert ${file}:`, err.message);
    }
  }
  
  const totalSavings = ((totalOriginalSize - totalWebpSize) / totalOriginalSize * 100).toFixed(1);
  console.log(`\nTotal: ${(totalOriginalSize/1024/1024).toFixed(2)}MB -> ${(totalWebpSize/1024/1024).toFixed(2)}MB (${totalSavings}% saved)`);
}

convertImages().catch(console.error);
