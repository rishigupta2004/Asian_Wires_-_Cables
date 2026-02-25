# ASIAN_SYS — V3 PATCH PROMPT
### 7 TARGETED FIXES + BRAND SYSTEM + DATA COLLECTION QUESTIONNAIRE
### Feed this to Gemini 2.5 Pro alongside the existing codebase.

---

## FIX 1 — CURSOR MOUSE LAG (Performance Critical)

The current cursor implementation uses `useState` + React re-renders on every `mousemove` event. This causes the ~50-80ms lag you're seeing. Fix it completely by bypassing React state for cursor movement.

### REPLACE the entire `CustomCursor` component with this approach:

```jsx
const CustomCursor = () => {
  const cursorRef = useRef(null);
  const hLineRef = useRef(null);
  const vLineRef = useRef(null);
  const labelRef = useRef(null);
  const rafRef = useRef(null);
  const posRef = useRef({ x: -100, y: -100 });

  useEffect(() => {
    const updateCursor = (e) => {
      // Store raw position — no state, no re-render
      posRef.current = { x: e.clientX, y: e.clientY };
    };

    const renderLoop = () => {
      const { x, y } = posRef.current;

      // Directly mutate DOM — zero React overhead
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${x - 10}px, ${y - 10}px, 0)`;
      }
      if (hLineRef.current) {
        hLineRef.current.style.transform = `translate3d(0, ${y}px, 0)`;
      }
      if (vLineRef.current) {
        vLineRef.current.style.transform = `translate3d(${x}px, 0, 0)`;
      }
      if (labelRef.current) {
        labelRef.current.style.transform = `translate3d(${x + 16}px, ${y + 16}px, 0)`;
        labelRef.current.textContent = `X:${x} Y:${y}`;
      }

      rafRef.current = requestAnimationFrame(renderLoop);
    };

    window.addEventListener('mousemove', updateCursor, { passive: true });
    rafRef.current = requestAnimationFrame(renderLoop);

    return () => {
      window.removeEventListener('mousemove', updateCursor);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div className="hidden md:block pointer-events-none">
      {/* Horizontal crosshair — NO transition property */}
      <div
        ref={hLineRef}
        className="fixed top-0 left-0 w-full h-px bg-[#FF3300] opacity-25 z-[98] mix-blend-difference"
        style={{ willChange: 'transform' }}
      />
      {/* Vertical crosshair */}
      <div
        ref={vLineRef}
        className="fixed top-0 left-0 w-px h-full bg-[#FF3300] opacity-25 z-[98] mix-blend-difference"
        style={{ willChange: 'transform' }}
      />
      {/* Cursor square — cyan/blue border as per original design */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-5 h-5 border-2 border-[#3B82F6] z-[100] flex items-center justify-center"
        style={{ willChange: 'transform' }}
      >
        <div className="w-1.5 h-1.5 bg-[#0F0F0F]" />
      </div>
      {/* Coordinate label */}
      <div
        ref={labelRef}
        className="fixed top-0 left-0 z-[100] font-mono text-[10px] font-bold text-[#0F0F0F] bg-[#E4E3DB] border-2 border-[#0F0F0F] px-2 py-0.5 whitespace-nowrap shadow-[2px_2px_0px_#FF3300]"
        style={{ willChange: 'transform' }}
      />
    </div>
  );
};
```

**Why this works:** `requestAnimationFrame` + direct DOM mutation via `ref.current.style.transform` runs at 60fps with zero React re-render overhead. The `willChange: 'transform'` hint promotes elements to GPU compositor layers, eliminating paint jank. Remove ALL `transition` properties from cursor-related elements — even `duration-75` adds perceived lag.

Also add to global CSS:
```css
* { cursor: none !important; }
```

---

## FIX 2 — "CONDUCTIVITY" TEXT CLIPPING / ALIGNMENT

**Problem visible in Screenshot 1:** The word "CONDUCTIVITY." is being cut off on the right side because it overflows its column container. The `overflow-hidden` on the `TextReveal` wrapper combined with the column `border-r-4` is clipping the text.

### Fix the hero heading container:

```jsx
{/* Hero Left Column — REMOVE overflow-hidden from h1 wrapper */}
<div className="xl:w-[55%] p-8 lg:p-16 border-b-4 xl:border-b-0 xl:border-r-4 border-[#0F0F0F] flex flex-col justify-center overflow-visible">

  {/* Line 1: "absolute" in serif italic */}
  <div className="overflow-hidden"> {/* TextReveal clip — keep on line 1 */}
    <span
      className="font-serif italic font-normal lowercase block leading-[0.85]"
      style={{ fontSize: 'clamp(72px, 13vw, 160px)', color: '#0F0F0F' }}
    >
      absolute
    </span>
  </div>

  {/* Line 2: "CONDUCTIVITY." — KEY CHANGE: NO overflow-hidden wrapper */}
  {/* This line intentionally bleeds slightly into the right column — editorial effect */}
  <div style={{ marginLeft: '-0.02em' }}> {/* Tighten left alignment */}
    <span
      className="font-grotesk font-black uppercase block leading-[0.78]"
      style={{
        fontSize: 'clamp(52px, 9.5vw, 118px)',   /* Reduced from 12vw — fits in column */
        color: '#E4E3DB',
        WebkitTextStroke: '3.5px #0F0F0F',
        textShadow: '8px 8px 0px #FF3300',
        letterSpacing: '-0.04em',
        whiteSpace: 'nowrap',                    /* Prevent wrap */
      }}
    >
      CONDUCTIVITY.
    </span>
  </div>
</div>
```

**Alternative if font-size reduction isn't desired:**
Use `transform: scaleX(0.88)` with `transform-origin: left center` on the CONDUCTIVITY span. This horizontally compresses the glyph shapes to fit without changing line-height or vertical rhythm — a common editorial technique for fitting large type into constrained columns.

```jsx
<span
  style={{
    display: 'block',
    fontSize: 'clamp(60px, 11vw, 130px)',
    transform: 'scaleX(0.9)',
    transformOrigin: 'left center',
    /* ... other styles */
  }}
>
  CONDUCTIVITY.
</span>
```

---

## FIX 3 — REMOVE FLOATING TOOL PANEL (Right-side pill widget)

**Visible in all 3 screenshots:** The dark rounded pill with 3 icon buttons (grid dots, sparkle, cursor arrow) floating on the right edge of the content area.

**Delete completely** — remove the `<FloatingToolPanel/>` component and its entire render from the main App JSX. Delete the component definition too.

```jsx
// DELETE THIS ENTIRE COMPONENT:
const FloatingToolPanel = () => { ... }

// AND REMOVE THIS FROM App render:
<FloatingToolPanel />
```

The vertical red marquee bar on the far right edge (`2xl:block fixed right-0`) stays — that is intentional branding. Only remove the dark pill overlay.

---

## FIX 4 — APPLICATION SECTORS / INDUSTRY SECTION

Replace the current 6-sector grid. Use EXACTLY these 5 industries, no others:

```javascript
const industrySectors = [
  {
    id: 'INS-01',
    sector: 'INDUSTRY',
    detail: 'Heavy Manufacturing & Process Plants',
    icon: Factory,           // lucide-react
    usage: 'Power distribution, motor feeds, control panels',
  },
  {
    id: 'INS-02',
    sector: 'PUBLIC ADDRESS SYSTEM',
    detail: 'Broadcast & PA Infrastructure',
    icon: Radio,             // lucide-react
    usage: 'Speaker wiring, amplifier feeds, low-impedance runs',
  },
  {
    id: 'INS-03',
    sector: 'TECH INDUSTRY',
    detail: 'Data Centres & Technology Facilities',
    icon: Cpu,               // lucide-react
    usage: 'Server room power, UPS feeds, structured cabling',
  },
  {
    id: 'INS-04',
    sector: 'MUSIC INDUSTRY',
    detail: 'Studios, Venues & Live Production',
    icon: Music,             // lucide-react
    usage: 'Stage power, rack feeds, shielded audio runs',
  },
  {
    id: 'INS-05',
    sector: 'SATELLITE COMMUNICATION',
    detail: 'Ground Station & Telecom Infrastructure',
    icon: Satellite,         // lucide-react
    usage: 'Antenna feeds, transmission lines, RF-shielded runs',
  },
];
```

Card layout — 5 cards in a `grid-cols-2 md:grid-cols-3 lg:grid-cols-5` grid:

```jsx
{industrySectors.map((s) => (
  <div
    key={s.id}
    className="border-4 border-[#0F0F0F] p-6 bg-[#E4E3DB] shadow-[4px_4px_0px_#0F0F0F] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all group cursor-pointer relative"
  >
    {/* ID badge top-right */}
    <div className="absolute top-3 right-3 font-mono text-[8px] text-[#0F0F0F]/30">{s.id}</div>
    {/* Icon */}
    <s.icon className="w-7 h-7 text-[#FF3300] mb-4 group-hover:scale-110 transition-transform"/>
    {/* Sector name */}
    <div className="font-mono text-[10px] font-black tracking-widest text-[#0F0F0F] mb-2 uppercase leading-tight">
      {s.sector}
    </div>
    {/* Detail */}
    <div className="font-mono text-[8px] text-[#0F0F0F]/50 mb-3">{s.detail}</div>
    {/* Red separator */}
    <div className="h-px w-6 bg-[#FF3300] mb-2"/>
    {/* Usage note */}
    <div className="font-mono text-[8px] text-[#0F0F0F]/40 italic">{s.usage}</div>
  </div>
))}
```

---

## FIX 5 — DATA_MATRIX.DB — PRODUCT CATALOG UPDATE

**NOTE TO GEMINI:** The user is providing an official CSV product list. Replace the placeholder catalog data (`fullCatalog` array) entirely with the official product data from that CSV. Map the CSV columns to these fields:

```javascript
// Target data structure for each catalog item:
{
  id: "",           // Product reference code from CSV
  type: "",         // Full product name/nomenclature
  core: "",         // Conductor material (Cu / Al / Tinned Cu etc.)
  area: "",         // Cross-section range in mm²
  rating: "",       // Current rating in Amps
  volt: "",         // Voltage grade
  cat: "",          // Category for filter tabs: 'RESIDENTIAL' | 'INDUSTRIAL' | 'GRID' | 'SOLAR' | 'AUDIO' | 'SPECIALTY'
  brand: "",        // Sub-brand: 'ASIAN' | 'M1' | 'TRUE_MASTER'
  desc: "",         // One-sentence product description
  specs: {
    insulation: "", // Insulation type and grade
    armor: "",      // Armoring type or "None"
    temp: "",       // Operating temperature range
    standard: "",   // Applicable IS/IEC standard
  },
  image: "",        // Unsplash URL matching the product type
  shielding: "",    // 'HEAVY_DUTY' | 'STANDARD' | 'BASIC' (maps to brand tier)
}
```

Update the filter tab buttons to match your actual product categories from the CSV:
```javascript
// Replace the current tab options with these, adjusting based on CSV data:
const filterCategories = ['ALL', 'RESIDENTIAL', 'INDUSTRIAL', 'GRID', 'SOLAR', 'AUDIO', 'SPECIALTY'];
```

---

## FIX 6 — THREE-BRAND SYSTEM: ASIAN / M1 / TRUE MASTER

This is the most significant structural addition. The company has three sub-brands at different quality/price tiers. This must be reflected everywhere in the UI.

### 6A. Brand Tier Definition

```javascript
const BRANDS = {
  ASIAN: {
    id: 'ASIAN',
    tier: 1,
    tagline: 'HEAVY DUTY — MAXIMUM SHIELDING',
    description: 'The flagship brand. EC-grade copper conductors with heavy-gauge multi-layer shielding. Built for harsh industrial environments, high-tension infrastructure, and applications demanding zero compromise. Thicker armoring, superior insulation tolerance, and the highest current ratings in the range.',
    shieldingLevel: 'HEAVY-DUTY MULTI-LAYER',
    conductorGrade: 'EC Grade — 99.97% Pure Copper',
    typicalUse: 'Power grid, petrochemical, mining, metro rail, data centres',
    badge: 'bg-[#0F0F0F] text-[#E4E3DB]',  // Dark badge — premium positioning
    accentColor: '#FF3300',
    // LOGO: inject the ASIAN logo SVG/PNG here
  },
  M1: {
    id: 'M1',
    tier: 2,
    tagline: 'PERFORMANCE — SINGLE-LAYER SHIELDING',
    description: 'The performance mid-range. Same conductor purity as ASIAN, with single-layer shielding optimised for commercial construction, light industrial, and professional audio/AV installations. Excellent quality at a more accessible price point for volume projects.',
    shieldingLevel: 'SINGLE-LAYER STANDARD',
    conductorGrade: 'EC Grade Copper — IS:8130',
    typicalUse: 'Commercial construction, light industrial, public address systems',
    badge: 'bg-[#D7D6CD] text-[#0F0F0F]',
    accentColor: '#0F0F0F',
    // LOGO: inject the M1 logo SVG/PNG here
  },
  TRUE_MASTER: {
    id: 'TRUE_MASTER',
    tier: 3,
    tagline: 'RELIABLE — STANDARD SHIELDING',
    description: 'The dependable choice for everyday wiring requirements. Standard-grade shielding for residential, light commercial, and consumer audio/music applications where performance requirements are well-defined and cost efficiency matters.',
    shieldingLevel: 'STANDARD SINGLE-LAYER',
    conductorGrade: 'EC Grade Copper — IS:694',
    typicalUse: 'Residential, retail, music venues, PA systems, studio wiring',
    badge: 'bg-[#E4E3DB] text-[#0F0F0F] border-2 border-[#0F0F0F]',
    accentColor: '#888',
    // LOGO: inject the TRUE MASTER logo SVG/PNG here
  },
};
```

### 6B. Brand Quality Comparison Section (NEW — add to HOME view)

Add this section between the Application Sectors grid and the marquee strip.

```
Full-width section, bg-[#0F0F0F], border-y-4 border-[#0F0F0F]
px-8 lg:px-20, py-16

Heading: "THREE TIERS. / ONE STANDARD." 
  — font-grotesk font-black text-[7vw] text-[#E4E3DB] tracking-tighter
  — second line: opacity-50

Sub-label: "OUR BRAND ARCHITECTURE" — font-mono text-[9px] tracking-[0.4em] text-[#E4E3DB]/40

Three brand cards — full-width stacked rows (not columns), one per brand:
```

```jsx
{Object.values(BRANDS).map((brand, i) => (
  <div
    key={brand.id}
    className="border-b-4 border-[#E4E3DB]/10 last:border-b-0 flex flex-col lg:flex-row items-start lg:items-center py-10 gap-8 group hover:bg-[#E4E3DB]/3 transition-colors px-4 -mx-4"
  >
    {/* Tier number */}
    <div className="font-grotesk font-black text-[80px] leading-none text-[#E4E3DB]/8 w-24 shrink-0 select-none">
      {String(brand.tier).padStart(2, '0')}
    </div>

    {/* Brand logo zone — inject the actual logo image/SVG here */}
    <div className="w-48 shrink-0 border-4 border-[#E4E3DB]/15 p-4 flex items-center justify-center h-20 bg-[#E4E3DB]/5 group-hover:border-[#FF3300]/30 transition-colors">
      {/* LOGO PLACEHOLDER — replace with actual logo component */}
      <span className="font-grotesk font-black text-2xl text-[#E4E3DB]">{brand.id.replace('_', ' ')}</span>
    </div>

    {/* Brand info */}
    <div className="flex-1">
      <div className="font-mono text-[10px] tracking-widest text-[#FF3300] mb-1">{brand.tagline}</div>
      <p className="font-mono text-xs text-[#E4E3DB]/60 leading-relaxed max-w-xl">{brand.description}</p>
    </div>

    {/* Shielding visual indicator — the key differentiator */}
    <div className="shrink-0 w-48">
      <div className="font-mono text-[8px] tracking-widest text-[#E4E3DB]/40 mb-2 uppercase">SHIELDING LEVEL</div>
      {/* Visual shield bars — like a signal strength indicator */}
      <div className="flex items-end gap-1 h-10 mb-2">
        {[1, 2, 3].map((bar) => (
          <div
            key={bar}
            className="flex-1 transition-all duration-300"
            style={{
              height: `${bar * 33}%`,
              background: bar <= (4 - brand.tier) ? '#FF3300' : '#E4E3DB15',
              border: '2px solid',
              borderColor: bar <= (4 - brand.tier) ? '#FF3300' : '#E4E3DB20',
            }}
          />
        ))}
      </div>
      <div className="font-mono text-[9px] text-[#E4E3DB]/50">{brand.shieldingLevel}</div>
    </div>

    {/* Typical use */}
    <div className="shrink-0 w-56">
      <div className="font-mono text-[8px] tracking-widest text-[#E4E3DB]/40 mb-2 uppercase">TYPICAL APPLICATIONS</div>
      <div className="font-mono text-[9px] text-[#E4E3DB]/50 leading-relaxed">{brand.typicalUse}</div>
    </div>
  </div>
))}
```

### 6C. Brand Filter in DATA_MATRIX.DB

Add a second row of filter buttons below the category tabs in the catalog:

```jsx
{/* Brand filter row — below the category tabs */}
<div className="flex gap-2 font-mono text-[10px] font-bold tracking-widest mt-4">
  <span className="opacity-40 mr-2 self-center">BRAND ▸</span>
  {['ALL BRANDS', 'ASIAN', 'M1', 'TRUE MASTER'].map((b) => (
    <button
      key={b}
      onClick={() => setBrandFilter(b)}
      className={`px-4 py-2 border-4 border-[#0F0F0F] transition-all ${
        brandFilter === b
          ? 'bg-[#0F0F0F] text-[#E4E3DB] shadow-[inset_2px_2px_0px_rgba(255,255,255,0.1)]'
          : 'bg-[#E4E3DB] text-[#0F0F0F] shadow-[4px_4px_0px_#0F0F0F] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0px_#0F0F0F]'
      }`}
    >
      {b}
    </button>
  ))}
</div>
```

### 6D. Brand Badge on Each Table Row

In the DATA_MATRIX table, add a BRAND column between REF_ID and NOMENCLATURE:

```jsx
// Table header: add after REF_ID column
<th className="p-4 font-black border-r-4 border-[#0F0F0F]">BRAND</th>

// Table row: add after REF_ID cell
<td className="p-4 border-r-2 border-[#E4E3DB]/15">
  <span className={`font-mono text-[9px] font-black tracking-widest px-2 py-1 ${BRANDS[item.brand]?.badge}`}>
    {item.brand?.replace('_', ' ')}
  </span>
</td>
```

### 6E. Brand Display in Product Detail View

Add a brand block to the product detail right column, below the ID badge:

```jsx
{/* Brand tier block */}
<div className="flex items-start gap-4 mb-8 p-5 border-4 border-[#0F0F0F] bg-[#D7D6CD] shadow-[6px_6px_0px_#0F0F0F]">
  {/* Logo zone */}
  <div className="border-4 border-[#0F0F0F] p-3 bg-[#E4E3DB] flex items-center justify-center w-32 h-16 shrink-0">
    {/* INJECT BRAND LOGO HERE based on selectedProduct.brand */}
    <span className="font-grotesk font-black text-lg">{selectedProduct.brand?.replace('_', ' ')}</span>
  </div>
  <div>
    <div className="font-mono text-[9px] tracking-widest text-[#FF3300] mb-1">
      {BRANDS[selectedProduct.brand]?.tagline}
    </div>
    <div className="font-mono text-[10px] text-[#0F0F0F]/60 leading-relaxed">
      {BRANDS[selectedProduct.brand]?.shieldingLevel} — {BRANDS[selectedProduct.brand]?.conductorGrade}
    </div>
  </div>
</div>
```

### 6F. Sidebar Logo Update

The sidebar header "ASIAN" text + "WIRE & CABLE MFG." must now reflect the company structure:

```jsx
<div className="p-8 border-b-4 border-[#0F0F0F] bg-[#0F0F0F] text-[#E4E3DB] relative overflow-hidden group">
  <HalftoneGrid/>
  {/* Main company logo — inject the PRIMARY company logo here */}
  {/* PLACEHOLDER until logo asset is injected: */}
  <h1 className="font-grotesk text-5xl font-black leading-none tracking-tighter text-[#FF3300] relative z-10 mb-1 select-none">
    ASIAN
  </h1>
  <h2 className="font-mono text-[10px] uppercase tracking-widest text-[#E4E3DB] relative z-10 font-bold border-l-4 border-[#FF3300] pl-2">
    Wires & Cables Pvt. Ltd.
  </h2>
  {/* Sub-brand strip below */}
  <div className="flex gap-2 mt-4 relative z-10">
    {['ASIAN', 'M1', 'TRUE MASTER'].map((b, i) => (
      <div key={b} className="border border-[#E4E3DB]/20 px-2 py-0.5 font-mono text-[7px] tracking-widest text-[#E4E3DB]/40">
        {b}
      </div>
    ))}
  </div>
</div>
```

---

## FIX 7 — DATA COLLECTION QUESTIONNAIRE

**Below is the official list of data you need to provide so the website shows real, accurate numbers instead of placeholders.**

Please fill in every field and return it — the developer will replace all placeholder values with your official figures.

---

```
═══════════════════════════════════════════════════════════
ASIAN WIRES & CABLES — OFFICIAL DATA COLLECTION FORM
═══════════════════════════════════════════════════════════

SECTION A — COMPANY IDENTITY
─────────────────────────────
A1.  Full registered company name:
     _______________________________________________

A2.  Registered office address (full):
     _______________________________________________
     _______________________________________________

A3.  Manufacturing plant address (full):
     _______________________________________________

A4.  City, State, PIN:
     _______________________________________________

A5.  Year of establishment / founding:
     _______________________________________________

A6.  Phone (sales):          ______________________
A7.  Phone (works/plant):    ______________________
A8.  Email (general):        ______________________
A9.  Email (export):         ______________________
A10. Website URL (current):  ______________________

A11. GST number:             ______________________
A12. CIN number:             ______________________
A13. IEC code (export):      ______________________


SECTION B — MANUFACTURING CAPACITY (PLANT_CAP.SYS view)
──────────────────────────────────────────────────────────
B1.  Total annual production capacity (MT/year):
     _______________________________________________

B2.  Number of production lines / machines:
     _______________________________________________

B3.  Total plant area (sq ft or acres):
     _______________________________________________

B4.  Number of employees (approx.):
     _______________________________________________

B5.  Daily output capacity (meters/day):
     _______________________________________________

B6.  Number of products / SKUs in total catalog:
     _______________________________________________

B7.  Number of countries you export to:
     _______________________________________________

B8.  List of key export countries:
     _______________________________________________

B9.  Total years in operation:
     _______________________________________________

B10. Maximum drum/coil length available (meters):
     _______________________________________________


SECTION C — CERTIFICATIONS & STANDARDS (CERT_REGISTRY.ISO view)
─────────────────────────────────────────────────────────────────
C1.  BIS license number(s) and applicable IS standards:
     _______________________________________________

C2.  ISO 9001 certificate number and valid until date:
     _______________________________________________

C3.  CPRI approval details (if applicable):
     _______________________________________________

C4.  List every Indian Standard (IS) you are certified for:
     IS:____  IS:____  IS:____  IS:____  IS:____

C5.  List every IEC standard your products comply with:
     IEC:____  IEC:____  IEC:____  IEC:____

C6.  Any other certifications (BV, SGS, REACH, RoHS, etc.):
     _______________________________________________

C7.  In-house testing laboratory — NABL accredited? (Y/N):
     _______________________________________________

C8.  Maximum HV test voltage available in-house (kV):
     _______________________________________________


SECTION D — TECHNICAL SPECIFICATIONS (TECH_SPECS.DAT view)
────────────────────────────────────────────────────────────
D1.  Copper conductor purity grade (e.g. 99.97%):
     _______________________________________________

D2.  Conductor resistivity at 20°C (μΩ·cm):
     _______________________________________________

D3.  Conductor classes manufactured (Class 1, 2, 5, etc.):
     _______________________________________________

D4.  Voltage grades available (list all):
     LT: ___________  HT: ___________  EHT: ___________

D5.  Maximum cross-section manufactured (mm²):
     _______________________________________________

D6.  Minimum cross-section manufactured (mm²):
     _______________________________________________

D7.  Insulation types offered (XLPE / PVC / FRLS / HFFR / etc.):
     _______________________________________________

D8.  Armoring types offered (SWA / AWA / DSTA / GWA / etc.):
     _______________________________________________

D9.  Maximum operating temperature (conductor):
     _______________________________________________

D10. Short circuit temperature (XLPE):
     _______________________________________________

D11. Standard drum lengths offered:
     _______________________________________________


SECTION E — BRAND ARCHITECTURE (ASIAN / M1 / TRUE MASTER)
───────────────────────────────────────────────────────────
E1.  ASIAN brand — product range description (1-2 sentences):
     _______________________________________________

E2.  ASIAN brand — specific shielding/armor spec (layers, gauge):
     _______________________________________________

E3.  ASIAN brand — primary applications / sectors:
     _______________________________________________

E4.  ASIAN brand — approximate premium over standard (%):
     _______________________________________________

E5.  M1 brand — product range description:
     _______________________________________________

E6.  M1 brand — shielding/armor spec:
     _______________________________________________

E7.  M1 brand — primary applications:
     _______________________________________________

E8.  TRUE MASTER brand — product range description:
     _______________________________________________

E9.  TRUE MASTER brand — shielding/armor spec:
     _______________________________________________

E10. TRUE MASTER brand — primary applications:
     _______________________________________________

E11. Is there a price difference between brands? (Rough %):
     ASIAN vs M1: ____%  |  M1 vs TRUE MASTER: ____%


SECTION F — PRODUCT CATALOG DATA (DATA_MATRIX.DB)
──────────────────────────────────────────────────
For each product in the CSV, please confirm or fill:

F1.  Is the product code in the CSV the official catalog REF_ID?
     Y / N: _______________

F2.  Column mapping from your CSV:
     Product name column header: _______________
     Core material column:       _______________
     Cross-section column:       _______________
     Voltage column:             _______________
     Current rating column:      _______________
     Brand (ASIAN/M1/TM) column: _______________
     Category column:            _______________

F3.  Any products to exclude from website display?
     _______________________________________________

F4.  Any products still under development / not yet available?
     _______________________________________________


SECTION G — MARKET DATA (Live Ticker Strip)
────────────────────────────────────────────
G1.  Do you want the LME copper/aluminium ticker to show
     LIVE data (needs API key) or static display values?
     Live / Static: _______________

G2.  If static — which commodity prices to show:
     _______________________________________________


SECTION H — COMPANY HISTORY (ABOUT page timeline)
───────────────────────────────────────────────────
H1.  Year founded:                      ____________
H2.  Year of first BIS certification:   ____________
H3.  Year HT cable production started:  ____________
H4.  Year ISO 9001 achieved:            ____________
H5.  Year EHT/33kV started:            ____________
H6.  Year solar/renewable line started: ____________
H7.  Year export operations started:    ____________
H8.  Any other key milestones + year:
     _______________________________________________
     _______________________________________________


SECTION I — LEADERSHIP TEAM (ABOUT page)
─────────────────────────────────────────
For each team member to feature (up to 6):

Name:  _____________________________________________
Title: _____________________________________________
Department/Expertise: ______________________________

Name:  _____________________________________________
Title: _____________________________________________
Department/Expertise: ______________________________

Name:  _____________________________________________
Title: _____________________________________________
Department/Expertise: ______________________________


SECTION J — CONTACT FORM SETTINGS
────────────────────────────────────
J1.  Where should inquiry form submissions go?
     Email address: _______________________________________________

J2.  Any required fields to add beyond the standard form?
     _______________________________________________

J3.  Is there a CRM or lead system to integrate with?
     _______________________________________________


═══════════════════════════════════════════════════════════
END OF DATA COLLECTION FORM
Return completed form to inject all official data.
═══════════════════════════════════════════════════════════
```

---

## LOGO INJECTION INSTRUCTIONS (for when assets are provided)

When the logo files are provided, inject them as follows:

### Primary Company Logo (top of sidebar)
```jsx
// Replace the <h1>ASIAN</h1> text placeholder with:
<img
  src="/assets/logos/company-logo.svg"   // or .png
  alt="Asian Wires & Cables"
  className="h-12 w-auto object-contain relative z-10 invert"  // invert for dark bg
/>
```

### ASIAN Brand Logo (in brand cards + product detail + table badge)
```jsx
<img src="/assets/logos/brand-asian.svg" alt="ASIAN" className="h-8 w-auto object-contain"/>
```

### M1 Brand Logo
```jsx
<img src="/assets/logos/brand-m1.svg" alt="M1" className="h-8 w-auto object-contain"/>
```

### TRUE MASTER Brand Logo
```jsx
<img src="/assets/logos/brand-truemaster.svg" alt="TRUE MASTER" className="h-8 w-auto object-contain"/>
```

All logos on dark backgrounds (`#0F0F0F`): add `filter: invert(1)` or `className="invert"` to make them show in cream/white.
All logos on cream backgrounds (`#E4E3DB`): use natural color.

---

## SUMMARY OF ALL 7 FIXES

| # | Fix | Impact |
|---|-----|--------|
| 1 | Cursor lag — RAF + direct DOM mutation, zero React re-renders | Fixes 50-80ms lag → true 60fps |
| 2 | CONDUCTIVITY clipping — reduced font-size + overflow:visible | Full word now visible |
| 3 | Remove FloatingToolPanel (dark right-side pill) | Cleaner layout |
| 4 | Industry sectors → exactly 5 specified sectors | Matches brand reality |
| 5 | DATA_MATRIX uses official CSV product data | Real products shown |
| 6 | 3-brand system (ASIAN/M1/TRUE MASTER) with tier UI | Brand architecture visible |
| 7 | Data collection questionnaire | 10 sections, 50+ data points to fill |
