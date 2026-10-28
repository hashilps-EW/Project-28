import { useState } from 'react';
import type { Product } from '../lib/validation';
import { useCartStore } from '../store/cartStore';
import { ImageZoomModal } from './ImageZoomModal';

interface ProductDetailsProps {
  product: Product;
  onClose: () => void;
}

export function ProductDetails({ product, onClose }: ProductDetailsProps) {
  const addToCart = useCartStore((state) => state.addToCart);
  const [isZoomed, setIsZoomed] = useState(false);

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 bg-white dark:bg-gray-800 p-4 border-b dark:border-gray-700 flex justify-between items-center">
            <h2 className="text-2xl font-bold dark:text-white">{product.title}</h2>
            <button
              onClick={onClose}
              className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 text-2xl"
            >
              ✕
            </button>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="w-full h-64 object-cover rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                  onClick={() => setIsZoomed(true)}
                />
                {product.images && product.images.length > 1 && (
                  <div className="grid grid-cols-4 gap-2 mt-4">
                    {product.images.slice(0, 4).map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`${product.title} ${index + 1}`}
                        className="w-full h-20 object-cover rounded cursor-pointer hover:opacity-90 transition-opacity"
                        onClick={() => setIsZoomed(true)}
                      />
                    ))}
                  </div>
                )}
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{product.category}</p>
                <div className="flex items-center mb-4">
                  <span className="text-yellow-500 text-xl">★</span>
                  <span className="ml-2 text-lg dark:text-gray-300">{product.rating}</span>
                </div>
                <p className="text-3xl font-bold mb-6 dark:text-white">${product.price.toFixed(2)}</p>
                <button
                  onClick={() => addToCart(product)}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold mb-4"
                >
                  Add to Cart
                </button>
                <div className="border-t dark:border-gray-700 pt-4">
                  <h3 className="font-semibold mb-2 dark:text-white">Product Description</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    This is a high-quality {product.category} product. It features excellent craftsmanship and modern design.
                  </p>
                </div>
              </div>
            </div>
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
    </>
  );
}
