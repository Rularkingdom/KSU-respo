import { brand } from '@/data/brand';
import type { ProductFamily } from '@/data/products';
import { CATEGORY_LABELS } from '@/data/products';

interface ProductImageProps {
  product: ProductFamily;
  variant?: 'card' | 'detail' | 'hero';
  className?: string;
}

/**
 * Branded placeholder product tile.
 * Designed to be replaced one-for-one with a real product PNG:
 *   <img src={`/products/${product.id}.png`} alt={product.name} />
 * The outer aspect ratio and sizing remain identical.
 */
export function ProductImage({ product, variant = 'card', className = '' }: ProductImageProps) {
  const categoryLabel = CATEGORY_LABELS[product.category];
  const isCombo = product.category === 'combo';

  const sizeClass =
    variant === 'detail'
      ? 'text-7xl'
      : variant === 'hero'
        ? 'text-8xl'
        : 'text-5xl';

  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden ${className}`}
      aria-label={`${product.name} product image placeholder`}
      role="img"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-cream-dark via-brand-cream to-brand-yellow/10" />

      {/* Decorative dot pattern */}
      <div className="absolute inset-0 bg-dots opacity-40" />

      {/* Papad silhouette */}
      <div className="relative z-10 flex flex-col items-center gap-3 p-4">
        <div
          className={`${sizeClass} font-serif font-bold text-brand-red/20 leading-none`}
          aria-hidden="true"
        >
          ◯
        </div>
        <div className="text-center">
          <p className="font-serif font-semibold text-brand-brown text-sm sm:text-base">
            {product.name}
          </p>
          <p className="font-devanagari text-xs text-brand-brown/60 mt-0.5">
            {product.hindiName}
          </p>
        </div>
      </div>

      {/* Category badge */}
      <div className="absolute top-3 left-3 z-10">
        <span className="badge-brown">{categoryLabel}</span>
      </div>

      {/* Brand mark */}
      <div className="absolute bottom-3 right-3 z-10">
        <span className="text-2xs font-bold uppercase tracking-wider text-brand-brown/40">
          {isCombo ? 'Combo' : 'Placeholder'}
        </span>
      </div>
    </div>
  );
}
