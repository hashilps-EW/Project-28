import { useCartStore } from '../store/cartStore';

export function CartSummary() {
  const items = useCartStore((state) => state.items);
  const getCartTotal = useCartStore((state) => state.getCartTotal);

  const subtotal = getCartTotal();
  const tax = subtotal * 0.05;
  const discount = subtotal > 100 ? subtotal * 0.1 : 0;
  const total = subtotal + tax - discount;
  const canCheckout = total >= 10;

  if (items.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <p className="text-gray-600 dark:text-gray-400 text-center">Your cart is empty</p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4 dark:text-white">Order Summary</h2>
      <div className="space-y-2">
        <div className="flex justify-between dark:text-gray-300">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between dark:text-gray-300">
          <span>Tax (5%)</span>
          <span>${tax.toFixed(2)}</span>
        </div>
        {discount > 0 && (
          <div className="flex justify-between text-green-600 dark:text-green-400">
            <span>Discount (10%)</span>
            <span>-${discount.toFixed(2)}</span>
          </div>
        )}
        <div className="border-t dark:border-gray-700 pt-2 mt-2">
          <div className="flex justify-between font-bold text-lg dark:text-white">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
      </div>
      {!canCheckout && (
        <p className="text-red-600 text-sm mt-4">
          Minimum order value is $10. Add more items to proceed.
        </p>
      )}
    </div>
  );
}
