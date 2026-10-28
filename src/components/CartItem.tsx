import { useState } from 'react';
import type { Product } from '../lib/validation';
import { useCartStore } from '../store/cartStore';
import { ImageZoomModal } from './ImageZoomModal';

interface CartItemProps {
  product: Product;
  quantity: number;
}

export function CartItem({ product, quantity }: CartItemProps) {
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const increaseQuantity = useCartStore((state) => state.increaseQuantity);
  const decreaseQuantity = useCartStore((state) => state.decreaseQuantity);
  const [isZoomed, setIsZoomed] = useState(false);

  return (
    <>
      <div className="flex items-center gap-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-24 h-24 object-cover rounded cursor-pointer hover:opacity-90 transition-opacity"
          onClick={() => setIsZoomed(true)}
        />
        <div className="flex-1">
          <h3 className="font-semibold mb-1 dark:text-white">{product.title}</h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm">${product.price.toFixed(2)}</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => decreaseQuantity(product.id)}
            disabled={quantity <= 1}
            className="w-8 h-8 rounded bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed dark:text-white"
          >
            -
          </button>
          <span className="w-8 text-center dark:text-white">{quantity}</span>
          <button
            onClick={() => increaseQuantity(product.id)}
            disabled={quantity >= 5}
            className="w-8 h-8 rounded bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed dark:text-white"
          >
            +
          </button>
        </div>
        <div className="text-right w-24">
          <p className="font-semibold dark:text-white">${(product.price * quantity).toFixed(2)}</p>
        </div>
        <button
          onClick={() => removeFromCart(product.id)}
          className="text-red-600 hover:text-red-800 px-2"
        >
          Remove
        </button>
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
