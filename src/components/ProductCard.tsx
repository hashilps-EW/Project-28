import { useState } from 'react';
import type { Product } from '../lib/validation';
import { useCartStore } from '../store/cartStore';
import { ImageZoomModal } from './ImageZoomModal';
import { ProductDetails } from './ProductDetails';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const addToCart = useCartStore((state) => state.addToCart);
  const [isZoomed, setIsZoomed] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  return (
    <>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full h-48 object-cover cursor-pointer hover:opacity-90 transition-opacity"
          onClick={() => setIsZoomed(true)}
        />
        <div className="p-4">
          <h3
            className="font-semibold text-lg mb-2 line-clamp-2 dark:text-white cursor-pointer hover:text-blue-600 dark:hover:text-blue-400"
            onClick={() => setShowDetails(true)}
          >
            {product.title}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{product.category}</p>
          <div className="flex items-center mb-2">
            <span className="text-yellow-500">★</span>
            <span className="ml-1 text-sm dark:text-gray-300">{product.rating}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xl font-bold dark:text-white">${product.price.toFixed(2)}</span>
            <button
              onClick={() => addToCart(product)}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
      {isZoomed && (
        <ImageZoomModal
          imageUrl={product.thumbnail}
          title={product.title}
          onClose={() => setIsZoomed(false)}
        />
      )}
      {showDetails && (
        <ProductDetails product={product} onClose={() => setShowDetails(false)} />
      )}
    </>
  );
}
