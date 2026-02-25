const fs = require('fs');
const micCsv = fs.readFileSync('CATALOG/MICROPHONE CABLES-ASIAN WIRES & CABLE CATALOG.csv', 'utf8').split('\n');
const spkCsv = fs.readFileSync('CATALOG/SPEAKER WIRE-ASIAN WIRES & CABLE CATALOG.csv', 'utf8').split('\n');

const catalog = [];
let idCounter = 1;

function processLines(lines, prefix) {
  let inData = false;
  for (let line of lines) {
    if (line.includes('XLRM TO XLRF') || line.includes('40/38 2 CORE')) inData = true;
    if (!inData || !line.trim()) continue;
    
    let parts = line.split(',');
    let name = parts[0].trim();
    if (!name) continue;
    
    // Each row has ASIAN, TRUE MASTER, M1 checkmarks. We create an entry for each brand it is available in.
    const brands = ['ASIAN', 'TRUE_MASTER', 'M1'];
    
    brands.forEach(b => {
      catalog.push({
        id: `${prefix}-${idCounter.toString().padStart(3, '0')}-${b.substring(0,2)}`,
        type: name,
        core: "OFC / Tinned Cu",
        area: "Standard Audio AWG",
        rating: "Audio Line Level",
        volt: "Low Voltage",
        cat: "AUDIO",
        brand: b,
        desc: `Professional grade ${name.toLowerCase()} for reliable audio transmission.`,
        specs: {
          insulation: "Flexible PVC / Rubber",
          armor: "None",
          temp: "-10°C to +70°C",
          standard: "Audio Grade Standard"
        },
        image: "/products/Wire Image Request Feb 8 2026 (18).png",
        shielding: b === 'ASIAN' ? 'HEAVY_DUTY' : b === 'M1' ? 'STANDARD' : 'BASIC'
      });
      idCounter++;
    });
  }
}

processLines(micCsv, 'MIC');
processLines(spkCsv, 'SPK');

fs.writeFileSync('src/lib/catalogData.ts', `export const fullCatalog = ${JSON.stringify(catalog, null, 2)};`);
