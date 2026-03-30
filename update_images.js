const fs = require('fs');
const path = require('path');

const tsFilePath = path.join(__dirname, 'src/lib/catalogData.ts');
let content = fs.readFileSync(tsFilePath, 'utf8');

const micCablesDir = path.join(__dirname, 'public/catalog_images/mic_cables');
const speakerWiresDir = path.join(__dirname, 'public/catalog_images/speaker_wires');

const micImages = fs.readdirSync(micCablesDir).filter(f => f.endsWith('.png'));
const speakerImages = fs.readdirSync(speakerWiresDir).filter(f => f.endsWith('.png'));

// Extract array
const prefix = 'export const fullCatalog = ';
const arrayString = content.substring(content.indexOf('['));
// There's a semicolon at the end, so remove it safely
const jsonData = arrayString.replace(/;\s*$/, '');
const catalog = eval('(' + jsonData + ')');

for (const product of catalog) {
    let newImage = product.image;
    // Attempt to find a matching image based on type
    const searchType = product.type.replace(/\//g, ':'); // some filenames use : instead of /

    if (product.cat.includes('MIC')) {
        const exactMatch = micImages.find(img => img === `${searchType}.png`);
        if (exactMatch) {
            newImage = `/catalog_images/mic_cables/${exactMatch}`;
        } else {
            // Fuzzy match
            const fuzzy = micImages.find(img => img.toUpperCase().includes(searchType.toUpperCase()));
            if (fuzzy) newImage = `/catalog_images/mic_cables/${fuzzy}`;
        }
    } else if (product.cat.includes('SPEAKER')) {
        const exactMatch = speakerImages.find(img => img === `${searchType}.png` || img === `${searchType} Speaker Wire.png`);
        if (exactMatch) {
            newImage = `/catalog_images/speaker_wires/${exactMatch}`;
        } else {
            // Try to match things like "100/40 2 CORE" -> "100:40 2 CORE Speaker Wire.png"
            const fuzzy = speakerImages.find(img => img.toUpperCase().includes(searchType.toUpperCase()));
            if (fuzzy) newImage = `/catalog_images/speaker_wires/${fuzzy}`;
        }
    }

    product.image = newImage;
    if (product.variants) {
        for (const variant of product.variants) {
            variant.image = newImage;
        }
    }
}

const updatedContent = `${prefix}${JSON.stringify(catalog, null, 2)};\n`;
fs.writeFileSync(tsFilePath, updatedContent);
console.log('Images updated successfully!');
