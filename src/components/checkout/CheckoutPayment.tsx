import { useCartStore } from '../../store/cartStore';
import type { ShippingFormData } from '../../lib/shippingValidation';

interface CheckoutPaymentProps {
  shippingData: ShippingFormData;
  onPlaceOrder: () => void;
}

export function CheckoutPayment({ shippingData, onPlaceOrder }: CheckoutPaymentProps) {
  const items = useCartStore((state) => state.items);
  const getCartTotal = useCartStore((state) => state.getCartTotal);

  const subtotal = getCartTotal();
  const tax = subtotal * 0.05;
  const discount = subtotal > 100 ? subtotal * 0.1 : 0;
  const total = subtotal + tax - discount;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold dark:text-white">Payment Summary</h2>

      <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
        <h3 className="font-semibold mb-3 dark:text-white">Shipping Details</h3>
        <div className="space-y-1 text-sm dark:text-gray-300">
          <p><span className="font-medium">Name:</span> {shippingData.fullName}</p>
          <p><span className="font-medium">Email:</span> {shippingData.email}</p>
          <p><span className="font-medium">Phone:</span> {shippingData.phone}</p>
          <p><span className="font-medium">Address:</span> {shippingData.address}</p>
          <p><span className="font-medium">City:</span> {shippingData.city}</p>
          <p><span className="font-medium">Postal Code:</span> {shippingData.postalCode}</p>
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-3 dark:text-white">Order Items</h3>
        <div className="space-y-2">
          {items.map((item) => (
            <div key={item.product.id} className="flex justify-between text-sm dark:text-gray-300">
              <span>{item.product.title} x {item.quantity}</span>
              <span>${(item.product.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t dark:border-gray-700 pt-4">
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
          <div className="flex justify-between font-bold text-lg border-t dark:border-gray-700 pt-2 dark:text-white">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <button
        onClick={onPlaceOrder}
        className="w-full bg-green-600 text-white py-3 rounded hover:bg-green-700 transition-colors font-semibold"
      >
        Place Order
      </button>
    </div>
  );
}
