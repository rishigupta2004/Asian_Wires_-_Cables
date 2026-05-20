const fs = require('fs');
const path = require('path');

const srcDir = '/Volumes/Space/asian-wires-cables/Cataloge';
const destImgDir = '/Volumes/Space/asian-wires-cables/public/catalog_images/products';
const tsFilePath = '/Volumes/Space/asian-wires-cables/src/lib/catalogData.ts';

if (!fs.existsSync(destImgDir)) {
    fs.mkdirSync(destImgDir, { recursive: true });
}

// Map prefix to category
const catMap = {
    'A': 'MIC AUDIO',
    'B': 'TAAR',
    'C': 'SPEAKER WIRE',
    'E': 'BUNDLE',
    'C': 'DATA / USB'
};

const folders = fs.readdirSync(srcDir).filter(f => fs.statSync(path.join(srcDir, f)).isDirectory());
const catalog = [];
let idCounter = 1;

for (const folder of folders) {
    let name = folder;
    let cat = 'CABLE';
    let prefixMatch = name.match(/^([A-Z]+)\d*\./);
    if (prefixMatch) {
        let prefix = prefixMatch[1];
        if (catMap[prefix]) cat = catMap[prefix];
        name = name.substring(name.indexOf('.') + 1).trim();
    } else if (name.startsWith('CTIP')) {
        cat = 'DATA / USB';
    }

    const type = name;
    const id = `PROD-${String(idCounter).padStart(3, '0')}`;
    idCounter++;

    const folderPath = path.join(srcDir, folder);
    const files = fs.readdirSync(folderPath).filter(f => f.endsWith('.webp') || f.endsWith('.png') || f.endsWith('.jpg'));
    
    const prodImgDir = path.join(destImgDir, id);
    if (!fs.existsSync(prodImgDir)) {
        fs.mkdirSync(prodImgDir, { recursive: true });
    }

    const images = [];
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const ext = path.extname(file);
        const newFileName = `img_${i}${ext}`;
        fs.copyFileSync(path.join(folderPath, file), path.join(prodImgDir, newFileName));
        images.push(`/catalog_images/products/${id}/${newFileName}`);
    }

    const mainImage = images.length > 0 ? images[0] : '';

    const product = {
        id,
        type,
        core: "OFC / Tinned Cu",
        area: "Standard AWG",
        rating: "Standard Level",
        volt: "Low Voltage",
        cat,
        brands_available: {
            "ASIAN": true,
            "TRUE_MASTER": true,
            "M1": true
        },
        desc: `High quality ${type} for reliable transmission.`,
        specs: {
            insulation: "Flexible PVC",
            armor: "None",
            temp: "-10°C to +70°C",
            standard: "Industry Standard"
        },
        image: mainImage,
        images: images,
        variants: [
            {
                id: `${id}-AS`,
                type,
                core: "OFC / Tinned Cu",
                area: "Standard AWG",
                rating: "Standard Level",
                volt: "Low Voltage",
                cat,
                desc: `High quality ${type} for reliable transmission.`,
                specs: {
                    insulation: "Flexible PVC",
                    armor: "None",
                    temp: "-10°C to +70°C",
                    standard: "Industry Standard"
                },
                image: mainImage,
                images: images,
                brand: "ASIAN",
                shielding: "HEAVY_DUTY"
            },
            {
                id: `${id}-TR`,
                type,
                core: "OFC / Tinned Cu",
                area: "Standard AWG",
                rating: "Standard Level",
                volt: "Low Voltage",
                cat,
                desc: `High quality ${type} for reliable transmission.`,
                specs: {
                    insulation: "Flexible PVC",
                    armor: "None",
                    temp: "-10°C to +70°C",
                    standard: "Industry Standard"
                },
                image: mainImage,
                images: images,
                brand: "TRUE_MASTER",
                shielding: "BASIC"
            },
            {
                id: `${id}-M1`,
                type,
                core: "OFC / Tinned Cu",
                area: "Standard AWG",
                rating: "Standard Level",
                volt: "Low Voltage",
                cat,
                desc: `High quality ${type} for reliable transmission.`,
                specs: {
                    insulation: "Flexible PVC",
                    armor: "None",
                    temp: "-10°C to +70°C",
                    standard: "Industry Standard"
                },
                image: mainImage,
                images: images,
                brand: "M1",
                shielding: "STANDARD"
            }
        ]
    };
    catalog.push(product);
}

const prefixContent = 'export const fullCatalog = ';
const updatedContent = `${prefixContent}${JSON.stringify(catalog, null, 2)};\n`;
fs.writeFileSync(tsFilePath, updatedContent);
console.log('Catalog rebuilt successfully! Total products: ' + catalog.length);
