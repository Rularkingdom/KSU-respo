import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Check } from 'lucide-react';
import type { ProductFamily } from '../data/products';
import { PACK_LABELS } from '../data/products';
import { ProductImage } from '../components/ProductImage';
import { useCart, formatPrice } from '../context/CartContext';

interface ProductCardProps {
  product: ProductFamily;
  className?: string;
}

export function ProductCard({ product, className = '' }: ProductCardProps) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const defaultSku = product.skus[0];
  const discount = Math.round(
    ((defaultSku.mrp - defaultSku.websitePrice) / defaultSku.mrp) * 100,
  );

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(defaultSku.sku, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <Link
      to={`/product/${product.slug}`}
      className={`group block ${className}`}
    >
      <div className="card overflow-hidden hover:shadow-lift hover:-translate-y-1 transition-all duration-300 bg-white border border-brand-brown/5">
        {/* Image */}
        <div className="relative aspect-square overflow-hidden bg-brand-cream-dark">
          <ProductImage
            sku={defaultSku.sku}
            product={product}
            variant="card"
            className="w-full h-full transition-transform duration-500 group-hover:scale-105"
          />
          {discount > 0 && (
            <div className="absolute top-3 right-3 z-10">
              <span className="badge-red">{discount}% OFF</span>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="p-5">
          <h3 className="font-serif font-semibold text-brand-brown text-base leading-tight mb-1 group-hover:text-brand-red transition-colors">
            {product.name}
          </h3>
          <p className="text-xs text-brand-brown/60 mb-4">
            {product.variant} · From {PACK_LABELS[defaultSku.packSize] || `${defaultSku.packSize}g`}
          </p>

          <div className="flex items-baseline gap-2.5 mb-1">
            <span className="text-lg font-bold text-brand-red">
              {formatPrice(defaultSku.websitePrice)}
            </span>
            <span className="text-sm text-brand-brown/40 line-through">
              {formatPrice(defaultSku.mrp)}
            </span>
          </div>
          <p className="text-2xs text-brand-brown/60 mb-4">
            {defaultSku.freeShipping ? (
              <span className="text-green-600 font-medium">Free shipping</span>
            ) : (
              `+ ${formatPrice(defaultSku.shipping)} shipping`
            )}
          </p>

          <button
            onClick={handleAdd}
            className={`w-full py-2.5 px-4 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all ${
              added 
                ? 'bg-emerald-600 text-white' 
                : 'border border-brand-brown/20 text-brand-brown hover:bg-brand-brown/5'
            }`}
            aria-label={`Add ${product.name} to cart`}
          >
            {added ? (
              <>
                <Check className="w-4 h-4" /> Added
              </>
            ) : (
              <>
                <Plus className="w-4 h-4" /> Add to Cart
              </>
            )}
          </button>
        </div>
      </div>
    </Link>
  );
}
