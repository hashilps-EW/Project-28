import { useCartStore } from '../store/cartStore';
import { CartItem } from './CartItem';
import { CartSummary } from './CartSummary';

export function Cart() {
  const items = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);

  if (items.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow text-center">
        <h2 className="text-2xl font-bold mb-4 dark:text-white">Your Cart</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">Your cart is empty</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold dark:text-white">Your Cart ({items.length} items)</h2>
        <button
          onClick={clearCart}
          className="text-red-600 hover:text-red-800"
        >
          Clear Cart
        </button>
      </div>
      <div className="space-y-4">
        {items.map((item) => (
          <CartItem key={item.product.id} product={item.product} quantity={item.quantity} />
        ))}
      </div>
      <CartSummary />
    </div>
  );
}
