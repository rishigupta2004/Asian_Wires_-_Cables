export function getOptimizedCatalogImageSrc(src: string): string {
  if (!src) return src;

  if (src.startsWith('/catalog_images/')) {
    return src
      .replace('/catalog_images/', '/catalog_images_optimized/')
      .replace(/\.png$/i, '.jpg');
  }

  if (src.startsWith('/products/')) {
    return src
      .replace('/products/', '/products_optimized/')
      .replace(/\.png$/i, '.jpg');
  }

  return src;
}

export function getOptimizedProductImageSrc(src: string): string {
  if (!src) return src;

  if (/^\/images\/product-\d+\.png$/i.test(src)) {
    return src.replace(/\.png$/i, '.webp');
  }

  return src;
}
