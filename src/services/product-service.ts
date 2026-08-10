import { products, ProductFamily, Sku } from '../data/products';

export interface FlatProductItem {
  familyId: string;
  slug: string;
  name: string;
  hindiName: string;
  category: 'moong' | 'chana' | 'urad' | 'combo';
  description: string;
  sku: string;
  packSize: number | string;
  mrp: number;
  websitePrice: number;
  shipping: number;
  freeShipping: boolean;
  featured?: boolean;
}

export const ProductService = {
  getAllProducts(): ProductFamily[] {
    return products;
  },

  getAllProductFamilies(): ProductFamily[] {
    return products;
  },

  getProductBySlug(slug: string): ProductFamily | undefined {
    return products.find((p) => p.slug === slug);
  },

  getProductBySku(sku: string): { family: ProductFamily; skuObj: Sku } | undefined {
    for (const family of products) {
      const skuObj = family.skus.find((s) => s.sku === sku);
      if (skuObj) {
        return { family, skuObj };
      }
    }
    return undefined;
  },

  getFeaturedProducts(): ProductFamily[] {
    return products.filter((p) => p.featured);
  },

  getProductsByCategory(category: string): ProductFamily[] {
    if (!category || category === 'all') return products;
    return products.filter((p) => p.category === category);
  },

  searchProducts(query: string): ProductFamily[] {
    if (!query.trim()) return products;
    const q = query.toLowerCase().trim();
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.hindiName.includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.skus.some((s) => s.sku.toLowerCase().includes(q) || String(s.packSize).includes(q))
    );
  },

  getAllFlatItems(): FlatProductItem[] {
    const list: FlatProductItem[] = [];
    for (const family of products) {
      for (const skuObj of family.skus) {
        list.push({
          familyId: family.id,
          slug: family.slug,
          name: family.name,
          hindiName: family.hindiName,
          category: family.category,
          description: family.description,
          sku: skuObj.sku,
          packSize: skuObj.packSize,
          mrp: skuObj.mrp,
          websitePrice: skuObj.websitePrice,
          shipping: skuObj.shipping,
          freeShipping: skuObj.freeShipping,
          featured: family.featured,
        });
      }
    }
    return list;
  },
};
