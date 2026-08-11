import { ProductService } from '@/services/product-service';

export interface ProductImageConfig {
  sku: string;
  primary: string;
  alt: string;
  status: 'available' | 'pending';
}

// Deterministic mapping registry indexed strictly by authoritative SKU.
// Real PNG files will be placed at /images/products/SKU.png when supplied.
const PRODUCT_IMAGE_REGISTRY: Record<string, Omit<ProductImageConfig, 'sku' | 'alt' | 'status'>> = {
  // Moong Papad
  'KS-MMP-200': { primary: '/images/products/KS-MMP-200.png', status: 'pending' },
  'KS-MMP-500': { primary: '/images/products/KS-MMP-500.png', status: 'pending' },
  'KS-MMP-1000': { primary: '/images/products/KS-MMP-1000.png', status: 'pending' },

  // Moong Special Garlic Papad
  'KS-MSG-200': { primary: '/images/products/KS-MSG-200.png', status: 'pending' },
  'KS-MSG-500': { primary: '/images/products/KS-MSG-500.png', status: 'pending' },

  // Chana Papad
  'KS-CHP-200': { primary: '/images/products/KS-CHP-200.png', status: 'pending' },
  'KS-CHP-500': { primary: '/images/products/KS-CHP-500.png', status: 'pending' },

  // Urad Papad
  'KS-URD-200': { primary: '/images/products/KS-URD-200.png', status: 'pending' },
  'KS-URD-500': { primary: '/images/products/KS-URD-500.png', status: 'pending' },

  // Special Black Masala Papad
  'KS-BMP-200': { primary: '/images/products/KS-BMP-200.png', status: 'pending' },
  'KS-BMP-500': { primary: '/images/products/KS-BMP-500.png', status: 'pending' },

  // Assorted Combo Pack
  'KS-COMBO-1': { primary: '/images/products/KS-COMBO-1.png', status: 'pending' },
};

export function getProductImage(sku: string): ProductImageConfig {
  const product = ProductService.getProductBySku(sku);
  const altText = product ? `${product.name} ${product.variant}` : `Product ${sku}`;
  const config = PRODUCT_IMAGE_REGISTRY[sku];

  if (!config) {
    return {
      sku,
      primary: '',
      alt: altText,
      status: 'pending',
    };
  }

  return {
    sku,
    primary: config.primary,
    alt: altText,
    status: config.status,
  };
}

export function getAllProductImageStats() {
  const allProducts = ProductService.getAllProducts();
  const expectedCount = allProducts.length;
  let availableCount = 0;
  let pendingCount = 0;

  allProducts.forEach((p) => {
    const img = getProductImage(p.sku);
    if (img.status === 'available') {
      availableCount++;
    } else {
      pendingCount++;
    }
  });

  return {
    directory: 'public/images/products/',
    expectedSkuCount: expectedCount,
    mappedSkuCount: Object.keys(PRODUCT_IMAGE_REGISTRY).length,
    availableImageCount: availableCount,
    pendingImageCount: pendingCount,
  };
}
