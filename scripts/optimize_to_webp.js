const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const targetDir = '/Volumes/Space/asian-wires-cables/Cataloge';

function optimizeDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            optimizeDir(fullPath);
        } else if (file.match(/\.(png|jpe?g)$/i)) {
            const ext = path.extname(file);
            const base = path.basename(file, ext);
            const webpPath = path.join(dir, `${base}.webp`);
            
            console.log(`Converting ${file} -> ${base}.webp`);
            try {
                // Resize to max 800px wide to save huge amounts of space, format webp, quality 75
                execSync(`cwebp -q 75 -resize 800 0 "${fullPath}" -o "${webpPath}"`, { stdio: 'ignore' });
                // Delete original
                fs.unlinkSync(fullPath);
            } catch (e) {
                console.error(`Failed to convert ${fullPath}`);
            }
        }
    }
}

console.log('Starting WebP conversion...');
optimizeDir(targetDir);
console.log('Done!');
