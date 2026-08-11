import { ProductService } from '@/services/product-service';

export interface ProductImageConfig {
  sku: string;
  primary: string;
  alt: string;
  status: 'available' | 'pending';
}

// Deterministic mapping registry indexed strictly by the authoritative 43 SKUs.
const PRODUCT_IMAGE_REGISTRY: Record<string, Omit<ProductImageConfig, 'sku' | 'alt' | 'status'>> = {
  // Moong Master Papad
  'KS-MMP-200': { primary: '/images/products/KS-MMP-200.png', status: 'pending' },
  'KS-MMP-500': { primary: '/images/products/KS-MMP-500.png', status: 'pending' },
  'KS-MMP-1000': { primary: '/images/products/KS-MMP-1000.png', status: 'pending' },

  // Moong Garlic Papad
  'KS-MGP-200': { primary: '/images/products/KS-MGP-200.png', status: 'pending' },
  'KS-MGP-500': { primary: '/images/products/KS-MGP-500.png', status: 'pending' },
  'KS-MGP-1000': { primary: '/images/products/KS-MGP-1000.png', status: 'pending' },

  // Moong Jeera Papad
  'KS-MJP-200': { primary: '/images/products/KS-MJP-200.png', status: 'pending' },
  'KS-MJP-500': { primary: '/images/products/KS-MJP-500.png', status: 'pending' },
  'KS-MJP-1000': { primary: '/images/products/KS-MJP-1000.png', status: 'pending' },

  // Moong Pudhina Papad
  'KS-MPP-200': { primary: '/images/products/KS-MPP-200.png', status: 'pending' },
  'KS-MPP-500': { primary: '/images/products/KS-MPP-500.png', status: 'pending' },
  'KS-MPP-1000': { primary: '/images/products/KS-MPP-1000.png', status: 'pending' },

  // Moong Green Chilli Papad
  'KS-MGCP-200': { primary: '/images/products/KS-MGCP-200.png', status: 'pending' },
  'KS-MGCP-500': { primary: '/images/products/KS-MGCP-500.png', status: 'pending' },
  'KS-MGCP-1000': { primary: '/images/products/KS-MGCP-1000.png', status: 'pending' },

  // Moong Kasuri Methi Papad
  'KS-MKMP-200': { primary: '/images/products/KS-MKMP-200.png', status: 'pending' },
  'KS-MKMP-500': { primary: '/images/products/KS-MKMP-500.png', status: 'pending' },
  'KS-MKMP-1000': { primary: '/images/products/KS-MKMP-1000.png', status: 'pending' },

  // Moong Punjabi Masala Papad
  'KS-MPMP-200': { primary: '/images/products/KS-MPMP-200.png', status: 'pending' },
  'KS-MPMP-500': { primary: '/images/products/KS-MPMP-500.png', status: 'pending' },
  'KS-MPMP-1000': { primary: '/images/products/KS-MPMP-1000.png', status: 'pending' },

  // Chana Chotu Papad
  'KS-CCP-200': { primary: '/images/products/KS-CCP-200.png', status: 'pending' },
  'KS-CCP-500': { primary: '/images/products/KS-CCP-500.png', status: 'pending' },
  'KS-CCP-1000': { primary: '/images/products/KS-CCP-1000.png', status: 'pending' },

  // Chana Garlic Papad
  'KS-CGP-200': { primary: '/images/products/KS-CGP-200.png', status: 'pending' },
  'KS-CGP-500': { primary: '/images/products/KS-CGP-500.png', status: 'pending' },
  'KS-CGP-1000': { primary: '/images/products/KS-CGP-1000.png', status: 'pending' },

  // Chana Khata Mitha Papad
  'KS-CKM-200': { primary: '/images/products/KS-CKM-200.png', status: 'pending' },
  'KS-CKM-500': { primary: '/images/products/KS-CKM-500.png', status: 'pending' },
  'KS-CKM-1000': { primary: '/images/products/KS-CKM-1000.png', status: 'pending' },

  // Chana Tomato Papad
  'KS-CTP-200': { primary: '/images/products/KS-CTP-200.png', status: 'pending' },
  'KS-CTP-500': { primary: '/images/products/KS-CTP-500.png', status: 'pending' },
  'KS-CTP-1000': { primary: '/images/products/KS-CTP-1000.png', status: 'pending' },

  // Chana Punjabi Masala Papad
  'KS-CPM-200': { primary: '/images/products/KS-CPM-200.png', status: 'pending' },
  'KS-CPM-500': { primary: '/images/products/KS-CPM-500.png', status: 'pending' },
  'KS-CPM-1000': { primary: '/images/products/KS-CPM-1000.png', status: 'pending' },

  // Urad Guru Papad
  'KS-UGP-200': { primary: '/images/products/KS-UGP-200.png', status: 'pending' },
  'KS-UGP-500': { primary: '/images/products/KS-UGP-500.png', status: 'pending' },
  'KS-UGP-1000': { primary: '/images/products/KS-UGP-1000.png', status: 'pending' },

  // Urad Garlic Papad
  'KS-UGG-200': { primary: '/images/products/KS-UGG-200.png', status: 'pending' },
  'KS-UGG-500': { primary: '/images/products/KS-UGG-500.png', status: 'pending' },
  'KS-UGG-1000': { primary: '/images/products/KS-UGG-1000.png', status: 'pending' },

  // Combo Pack
  'KS-COMB-235': { primary: '/images/products/KS-COMB-235.png', status: 'pending' },
};

export function getProductImage(sku: string): ProductImageConfig {
  const allProducts = ProductService.getAllProducts();
  const matchedSkuObj = allProducts
    .flatMap((p) => p.skus)
    .find((s) => s.sku === sku);

  const altText = matchedSkuObj
    ? `${ProductService.getAllProducts().find((p) => p.skus.some((s) => s.sku === sku))?.name || 'Product'} ${matchedSkuObj.packSize >= 1000 ? `${matchedSkuObj.packSize / 1000}kg` : `${matchedSkuObj.packSize}g`}`
    : `Product ${sku}`;

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
  const allSkus = allProducts.flatMap((p) => p.skus.map((s) => s.sku));
  const expectedCount = allSkus.length;
  const mappedKeys = Object.keys(PRODUCT_IMAGE_REGISTRY);

  let availableCount = 0;
  let pendingCount = 0;
  let missingMappingCount = 0;
  let unknownMappingCount = 0;

  allSkus.forEach((sku) => {
    if (!PRODUCT_IMAGE_REGISTRY[sku]) {
      missingMappingCount++;
    } else {
      const img = getProductImage(sku);
      if (img.status === 'available') {
        availableCount++;
      } else {
        pendingCount++;
      }
    }
  });

  mappedKeys.forEach((key) => {
    if (!allSkus.includes(key)) {
      unknownMappingCount++;
    }
  });

  const duplicateMappingCount = mappedKeys.length - new Set(mappedKeys).size;

  return {
    directory: 'public/images/products/',
    expectedSkuCount: expectedCount,
    mappedSkuCount: mappedKeys.length,
    availableImageCount: availableCount,
    pendingImageCount: pendingCount,
    missingMappingCount,
    unknownMappingCount,
    duplicateMappingCount,
  };
}
