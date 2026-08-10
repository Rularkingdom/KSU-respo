import { PRODUCT_CATALOG, ProductFamily, ProductVariant } from '../data/product-catalog';

export interface FlatProductItem {
  familyId: string;
  slug: string;
  name: string;
  category: 'moong' | 'chana' | 'urad' | 'combo';
  description: string;
  sku: string;
  packSize: string;
  mrp: number;
  websitePrice: number;
  shipping: number;
  featured?: boolean;
}

export const ProductService = {
  getAllProductFamilies(): ProductFamily[] {
    return PRODUCT_CATALOG;
  },

  getProductBySlug(slug: string): ProductFamily | undefined {
    return PRODUCT_CATALOG.find((p) => p.slug === slug);
  },

  getProductBySku(sku: string): { family: ProductFamily; variant: ProductVariant } | undefined {
    for (const family of PRODUCT_CATALOG) {
      const variant = family.variants.find((v) => v.sku === sku);
      if (variant) {
        return { family, variant };
      }
    }
    return undefined;
  },

  getFeaturedProducts(): ProductFamily[] {
    return PRODUCT_CATALOG.filter((p) => p.featured);
  },

  getProductsByCategory(category: string): ProductFamily[] {
    if (!category || category === 'all') return PRODUCT_CATALOG;
    return PRODUCT_CATALOG.filter((p) => p.category === category);
  },

  searchProducts(query: string): ProductFamily[] {
    if (!query.trim()) return PRODUCT_CATALOG;
    const q = query.toLowerCase();
    return PRODUCT_CATALOG.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.variants.some((v) => v.sku.toLowerCase().includes(q) || v.packSize.toLowerCase().includes(q))
    );
  },

  getAllFlatItems(): FlatProductItem[] {
    const list: FlatProductItem[] = [];
    for (const family of PRODUCT_CATALOG) {
      for (const variant of family.variants) {
        list.push({
          familyId: family.id,
          slug: family.slug,
          name: family.name,
          category: family.category,
          description: family.description,
          sku: variant.sku,
          packSize: variant.packSize,
          mrp: variant.mrp,
          websitePrice: variant.websitePrice,
          shipping: variant.shipping,
          featured: family.featured,
        });
      }
    }
    return list;
  },
};
