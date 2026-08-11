import { ProductService } from '@/services/product-service';

export interface ProductFamilyImageConfig {
  productId: string;
  primary: string;
  alt: string;
  status: 'available' | 'pending';
}

// Deterministic family-level mapping registry indexed by ProductFamily.id
const PRODUCT_FAMILY_IMAGE_REGISTRY: Record<string, Omit<ProductFamilyImageConfig, 'productId' | 'alt' | 'status'>> = {
  'moong-master': { primary: '/images/products/moong-master.png', status: 'pending' },
  'moong-garlic': { primary: '/images/products/moong-garlic.png', status: 'pending' },
  'moong-jeera': { primary: '/images/products/moong-jeera.png', status: 'pending' },
  'moong-pudhina': { primary: '/images/products/moong-pudhina.png', status: 'pending' },
  'moong-green-chilli': { primary: '/images/products/moong-green-chilli.png', status: 'pending' },
  'moong-kasuri-methi': { primary: '/images/products/moong-kasuri-methi.png', status: 'pending' },
  'moong-punjabi-masala': { primary: '/images/products/moong-punjabi-masala.png', status: 'pending' },
  'chana-chotu': { primary: '/images/products/chana-chotu.png', status: 'pending' },
  'chana-garlic': { primary: '/images/products/chana-garlic.png', status: 'pending' },
  'chana-khata-mitha': { primary: '/images/products/chana-khata-mitha.png', status: 'pending' },
  'chana-tomato': { primary: '/images/products/chana-tomato.png', status: 'pending' },
  'chana-punjabi-masala': { primary: '/images/products/chana-punjabi-masala.png', status: 'pending' },
  'urad-guru': { primary: '/images/products/urad-guru.png', status: 'pending' },
  'urad-garlic': { primary: '/images/products/urad-garlic.png', status: 'pending' },
  'combo-235': { primary: '/images/products/combo-235.png', status: 'pending' },
};

export function getProductFamilyImage(productId: string): ProductFamilyImageConfig {
  const product = ProductService.getAllProducts().find((p) => p.id === productId);
  const altText = product ? product.name : `Product ${productId}`;
  const config = PRODUCT_FAMILY_IMAGE_REGISTRY[productId];

  if (!config) {
    return {
      productId,
      primary: '',
      alt: altText,
      status: 'pending',
    };
  }

  return {
    productId,
    primary: config.primary,
    alt: altText,
    status: config.status,
  };
}

export function getAllProductFamilyImageStats() {
  const allProducts = ProductService.getAllProducts();
  const expectedFamilyCount = allProducts.length;
  const mappedKeys = Object.keys(PRODUCT_FAMILY_IMAGE_REGISTRY);

  let availableCount = 0;
  let pendingCount = 0;
  let missingMappingCount = 0;
  let unknownMappingCount = 0;

  allProducts.forEach((p) => {
    if (!PRODUCT_FAMILY_IMAGE_REGISTRY[p.id]) {
      missingMappingCount++;
    } else {
      const img = getProductFamilyImage(p.id);
      if (img.status === 'available') {
        availableCount++;
      } else {
        pendingCount++;
      }
    }
  });

  mappedKeys.forEach((key) => {
    if (!allProducts.some((p) => p.id === key)) {
      unknownMappingCount++;
    }
  });

  const duplicateMappingCount = mappedKeys.length - new Set(mappedKeys).size;

  return {
    directory: 'public/images/products/',
    expectedFamilyCount,
    mappedFamilyCount: mappedKeys.length,
    availableImageCount: availableCount,
    pendingImageCount: pendingCount,
    missingMappingCount,
    unknownMappingCount,
    duplicateMappingCount,
  };
}
