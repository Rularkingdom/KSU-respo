export interface ProductVariant {
  sku: string;
  packSize: string;
  mrp: number;
  websitePrice: number;
  shipping: number;
}

export interface ProductFamily {
  id: string;
  slug: string;
  name: string;
  category: 'moong' | 'chana' | 'urad' | 'combo';
  description: string;
  variants: ProductVariant[];
  featured?: boolean;
}

export const PRODUCT_CATALOG: ProductFamily[] = [
  // --- MOONG FAMILY ---
  {
    id: 'moong-master',
    slug: 'moong-master-papad',
    name: 'Moong Master Papad',
    category: 'moong',
    description: 'Traditional premium moong dal papad crafted with authentic spices and Nimar expertise.',
    featured: true,
    variants: [
      { sku: 'KS-MMP-200', packSize: '200g', mrp: 110, websitePrice: 89, shipping: 49 },
      { sku: 'KS-MMP-500', packSize: '500g', mrp: 249, websitePrice: 199, shipping: 49 },
      { sku: 'KS-MMP-1000', packSize: '1000g', mrp: 499, websitePrice: 429, shipping: 0 },
    ],
  },
  {
    id: 'moong-garlic',
    slug: 'moong-garlic-papad',
    name: 'Moong Garlic Papad',
    category: 'moong',
    description: 'Crispy moong papad infused with bold, aromatic garlic seasoning.',
    featured: true,
    variants: [
      { sku: 'KS-MGP-200', packSize: '200g', mrp: 125, websitePrice: 99, shipping: 49 },
      { sku: 'KS-MGP-500', packSize: '500g', mrp: 309, websitePrice: 259, shipping: 49 },
      { sku: 'KS-MGP-1000', packSize: '1000g', mrp: 619, websitePrice: 539, shipping: 0 },
    ],
  },
  {
    id: 'moong-jeera',
    slug: 'moong-jeera-papad',
    name: 'Moong Jeera Papad',
    category: 'moong',
    description: 'Classic moong papad enhanced with whole cumin (jeera) seeds.',
    featured: true,
    variants: [
      { sku: 'KS-MJP-200', packSize: '200g', mrp: 109, websitePrice: 89, shipping: 49 },
      { sku: 'KS-MJP-500', packSize: '500g', mrp: 279, websitePrice: 229, shipping: 49 },
      { sku: 'KS-MJP-1000', packSize: '1000g', mrp: 559, websitePrice: 489, shipping: 0 },
    ],
  },
  {
    id: 'moong-pudhina',
    slug: 'moong-pudhina-papad',
    name: 'Moong Pudhina Papad',
    category: 'moong',
    description: 'Refreshing mint (pudhina) flavored moong papad for a zesty bite.',
    variants: [
      { sku: 'KS-MPP-200', packSize: '200g', mrp: 105, websitePrice: 85, shipping: 49 },
      { sku: 'KS-MPP-500', packSize: '500g', mrp: 265, websitePrice: 219, shipping: 49 },
      { sku: 'KS-MPP-1000', packSize: '1000g', mrp: 529, websitePrice: 459, shipping: 0 },
    ],
  },
  {
    id: 'moong-green-chilli',
    slug: 'moong-green-chilli-papad',
    name: 'Moong Green Chilli Papad',
    category: 'moong',
    description: 'Spicy green chilli kick blended into traditional moong papad.',
    variants: [
      { sku: 'KS-MGCP-200', packSize: '200g', mrp: 105, websitePrice: 85, shipping: 49 },
      { sku: 'KS-MGCP-500', packSize: '500g', mrp: 265, websitePrice: 219, shipping: 49 },
      { sku: 'KS-MGCP-1000', packSize: '1000g', mrp: 529, websitePrice: 459, shipping: 0 },
    ],
  },
  {
    id: 'moong-kasuri-methi',
    slug: 'moong-kasuri-methi-papad',
    name: 'Moong Kasuri Methi Papad',
    category: 'moong',
    description: 'Fragrant dried fenugreek leaves combined with premium moong batter.',
    variants: [
      { sku: 'KS-MKMP-200', packSize: '200g', mrp: 109, websitePrice: 89, shipping: 49 },
      { sku: 'KS-MKMP-500', packSize: '500g', mrp: 229, websitePrice: 198, shipping: 49 },
      { sku: 'KS-MKMP-1000', packSize: '1000g', mrp: 559, websitePrice: 489, shipping: 0 },
    ],
  },
  {
    id: 'moong-punjabi-masala',
    slug: 'moong-punjabi-masala-papad',
    name: 'Moong Punjabi Masala Papad',
    category: 'moong',
    description: 'Robust Punjabi masala spices embedded in crispy moong base.',
    variants: [
      { sku: 'KS-MPMP-200', packSize: '200g', mrp: 119, websitePrice: 99, shipping: 49 },
      { sku: 'KS-MPMP-500', packSize: '500g', mrp: 299, websitePrice: 249, shipping: 49 },
      { sku: 'KS-MPMP-1000', packSize: '1000g', mrp: 599, websitePrice: 529, shipping: 0 },
    ],
  },

  // --- CHANA FAMILY ---
  {
    id: 'chana-chotu',
    slug: 'chana-chotu-papad',
    name: 'Chana Chotu Papad',
    category: 'chana',
    description: 'Earthy and crunchy chana dal papad made with traditional recipes.',
    featured: true,
    variants: [
      { sku: 'KS-CCP-200', packSize: '200g', mrp: 110, websitePrice: 89, shipping: 49 },
      { sku: 'KS-CCP-500', packSize: '500g', mrp: 249, websitePrice: 199, shipping: 49 },
      { sku: 'KS-CCP-1000', packSize: '1000g', mrp: 499, websitePrice: 429, shipping: 0 },
    ],
  },
  {
    id: 'chana-garlic',
    slug: 'chana-garlic-papad',
    name: 'Chana Garlic Papad',
    category: 'chana',
    description: 'Rich chana papad paired with a punchy garlic flavor profile.',
    variants: [
      { sku: 'KS-CGP-200', packSize: '200g', mrp: 125, websitePrice: 99, shipping: 49 },
      { sku: 'KS-CGP-500', packSize: '500g', mrp: 309, websitePrice: 259, shipping: 49 },
      { sku: 'KS-CGP-1000', packSize: '1000g', mrp: 619, websitePrice: 539, shipping: 0 },
    ],
  },
  {
    id: 'chana-khata-mitha',
    slug: 'chana-khata-mitha-papad',
    name: 'Chana Khata Mitha Papad',
    category: 'chana',
    description: 'Tangy and sweet flavor balance on a crispy chana base.',
    variants: [
      { sku: 'KS-CKM-200', packSize: '200g', mrp: 99, websitePrice: 79, shipping: 49 },
      { sku: 'KS-CKM-500', packSize: '500g', mrp: 249, websitePrice: 199, shipping: 49 },
      { sku: 'KS-CKM-1000', packSize: '1000g', mrp: 499, websitePrice: 429, shipping: 0 },
    ],
  },
  {
    id: 'chana-tomato',
    slug: 'chana-tomato-papad',
    name: 'Chana Tomato Papad',
    category: 'chana',
    description: 'Zesty tomato seasoning infused into traditional chana papad.',
    variants: [
      { sku: 'KS-CTP-200', packSize: '200g', mrp: 99, websitePrice: 79, shipping: 49 },
      { sku: 'KS-CTP-500', packSize: '500g', mrp: 249, websitePrice: 199, shipping: 49 },
      { sku: 'KS-CTP-1000', packSize: '1000g', mrp: 499, websitePrice: 429, shipping: 0 },
    ],
  },
  {
    id: 'chana-punjabi-masala',
    slug: 'chana-punjabi-masala-papad',
    name: 'Chana Punjabi Masala Papad',
    category: 'chana',
    description: 'Heavy masala blend crafted specifically for chana papad lovers.',
    variants: [
      { sku: 'KS-CPM-200', packSize: '200g', mrp: 119, websitePrice: 99, shipping: 49 },
      { sku: 'KS-CPM-500', packSize: '500g', mrp: 299, websitePrice: 249, shipping: 49 },
      { sku: 'KS-CPM-1000', packSize: '1000g', mrp: 599, websitePrice: 529, shipping: 0 },
    ],
  },

  // --- URAD FAMILY ---
  {
    id: 'urad-guru',
    slug: 'urad-guru-papad',
    name: 'Urad Guru Papad',
    category: 'urad',
    description: 'The benchmark of urad papads—crispy, light, and full of traditional flavor.',
    featured: true,
    variants: [
      { sku: 'KS-UGP-200', packSize: '200g', mrp: 119, websitePrice: 99, shipping: 49 },
      { sku: 'KS-UGP-500', packSize: '500g', mrp: 299, websitePrice: 249, shipping: 49 },
      { sku: 'KS-UGP-1000', packSize: '1000g', mrp: 599, websitePrice: 529, shipping: 0 },
    ],
  },
  {
    id: 'urad-garlic',
    slug: 'urad-garlic-papad',
    name: 'Urad Garlic Papad',
    category: 'urad',
    description: 'Strong garlic notes combined with premium urad dal dough.',
    variants: [
      { sku: 'KS-UGG-200', packSize: '200g', mrp: 125, websitePrice: 99, shipping: 49 },
      { sku: 'KS-UGG-500', packSize: '500g', mrp: 319, websitePrice: 269, shipping: 49 },
      { sku: 'KS-UGG-1000', packSize: '1000g', mrp: 639, websitePrice: 559, shipping: 0 },
    ],
  },

  // --- COMBO FAMILY ---
  {
    id: 'kawad-swad-combo',
    slug: 'kawad-swad-combo-pack',
    name: 'Kawad Swad Combo Pack',
    category: 'combo',
    description: 'Special assortment pack featuring our finest papad varieties.',
    featured: true,
    variants: [
      { sku: 'KS-COMB-235', packSize: 'Standard Combo', mrp: 199, websitePrice: 199, shipping: 49 },
    ],
  },
];
