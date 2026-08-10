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
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

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

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 8;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -8;
    setTilt({ x, y });
  };

  return (
    <Link
      to={`/product/${product.slug}`}
      className={`group block perspective-1000 ${className}`}
    >
      <div
        className="card overflow-hidden hover:shadow-lift hover:-translate-y-1 transition-all duration-300 preserve-3d"
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setTilt({ x: 0, y: 0 })}
        style={{
          transform: `rotateY(${tilt.x}deg) rotateX(${tilt.y}deg)`,
        }}
      >
        {/* Image */}
        <div className="relative aspect-square overflow-hidden">
          <ProductImage
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
        <div className="p-4">
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3 className="font-serif font-semibold text-brand-brown text-base leading-tight">
              {product.name}
            </h3>
          </div>
          <p className="text-xs text-brand-brown/60 mb-3">
            {product.variant} · From {PACK_LABELS[defaultSku.packSize]}
          </p>

          <div className="flex items-baseline gap-2 mb-1">
            <span className="text-lg font-bold text-brand-red">
              {formatPrice(defaultSku.websitePrice)}
            </span>
            <span className="text-sm text-brand-brown/40 line-through">
              {formatPrice(defaultSku.mrp)}
            </span>
          </div>
          <p className="text-2xs text-brand-brown/60 mb-3">
            {defaultSku.freeShipping ? (
              <span className="text-green-600 font-medium">Free shipping</span>
            ) : (
              `+ ${formatPrice(defaultSku.shipping)} shipping`
            )}
          </p>

          <button
            onClick={handleAdd}
            className={`w-full ${added ? 'btn-secondary' : 'btn-outline'} text-sm py-2.5 flex items-center justify-center gap-2`}
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
