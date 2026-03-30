// Image mapping configuration for Asian Wires & Cables
// All images are now in WebP format for better performance

export const imagePaths = {
  // Hero image
  hero: '/images/hero.png',
  
  // Brand logos (keeping PNG for logos with transparency)
  brands: {
    asian: '/images/brands/ASIAN.png',
    m1: '/images/brands/M1_VOICE.png',
    true: '/images/brands/True_MAster.png',
  },
  
  // Product images (1-19 total) - Using reliable PNGs
  products: {
    // Homepage category images (1-6)
    speaker: '/images/product-1.png',
    audio: '/images/product-2.png',
    cctv: '/images/product-3.png',
    multicore: '/images/product-4.png',
    digital: '/images/product-5.png',
    industrial: '/images/product-6.png',
    
    // Additional product images (7-19)
    product7: '/images/product-7.png',
    product8: '/images/product-8.png',
    product9: '/images/product-9.png',
    product10: '/images/product-10.png',
    product11: '/images/product-11.png',
    product12: '/images/product-12.png',
    product13: '/images/product-13.png',
    product14: '/images/product-14.png',
    product15: '/images/product-15.png',
    product16: '/images/product-16.png',
    product17: '/images/product-17.png',
    product18: '/images/product-18.png',
    product19: '/images/product-19.png',
  },
};

// Homepage product card mapping
export const homepageProductImages = [
  { name: 'Speaker Wires', image: imagePaths.products.speaker, description: 'High-fidelity audio transmission' },
  { name: 'Audio Cables', image: imagePaths.products.audio, description: 'Professional audio connections' },
  { name: 'CCTV Cables', image: imagePaths.products.cctv, description: 'Security surveillance systems' },
  { name: 'Multi-Core Cables', image: imagePaths.products.multicore, description: 'Multi-conductor solutions' },
  { name: 'Digital Mic Cables', image: imagePaths.products.digital, description: 'Digital microphone connections' },
  { name: 'Industrial Cables', image: imagePaths.products.industrial, description: 'Heavy-duty industrial use' },
];

// Products page mapping (15 products mapped to available images)
export const productImageMapping = [
  { id: 1, image: imagePaths.products.speaker },
  { id: 2, image: imagePaths.products.speaker }, // Share speaker image
  { id: 3, image: imagePaths.products.speaker }, // Share speaker image
  { id: 4, image: imagePaths.products.audio },
  { id: 5, image: imagePaths.products.audio }, // Share audio image
  { id: 6, image: imagePaths.products.audio }, // Share audio image
  { id: 7, image: imagePaths.products.cctv },
  { id: 8, image: imagePaths.products.cctv }, // Share CCTV image
  { id: 9, image: imagePaths.products.cctv }, // Share CCTV image
  { id: 10, image: imagePaths.products.multicore },
  { id: 11, image: imagePaths.products.multicore }, // Share multicore
  { id: 12, image: imagePaths.products.multicore }, // Share multicore
  { id: 13, image: imagePaths.products.industrial },
  { id: 14, image: imagePaths.products.industrial }, // Share industrial
  { id: 15, image: imagePaths.products.industrial }, // Share industrial
];

// Gallery images (all 19 images)
export const allGalleryImages = [
  imagePaths.products.speaker,
  imagePaths.products.audio,
  imagePaths.products.cctv,
  imagePaths.products.multicore,
  imagePaths.products.digital,
  imagePaths.products.industrial,
  imagePaths.products.product7,
  imagePaths.products.product8,
  imagePaths.products.product9,
  imagePaths.products.product10,
  imagePaths.products.product11,
  imagePaths.products.product12,
  imagePaths.products.product13,
  imagePaths.products.product14,
  imagePaths.products.product15,
  imagePaths.products.product16,
  imagePaths.products.product17,
  imagePaths.products.product18,
  imagePaths.products.product19,
];

// Helper function to get image by product ID
export const getProductImage = (productId: number): string => {
  const mapping = productImageMapping.find(p => p.id === productId);
  return mapping?.image || imagePaths.products.speaker;
};

// Helper function to get image with fallback format
// Returns WebP path with PNG fallback for older browsers
export const getImageWithFallback = (webpPath: string): { webp: string; png: string } => {
  const pngPath = webpPath.replace('.webp', '.png');
  return { webp: webpPath, png: pngPath };
};
