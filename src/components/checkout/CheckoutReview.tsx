import { useCartStore } from '../../store/cartStore';
import { CartItem } from '../CartItem';
import { CartSummary } from '../CartSummary';

export function CheckoutReview() {
  const items = useCartStore((state) => state.items);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold dark:text-white">Review Your Order</h2>
      <div className="space-y-4">
        {items.map((item) => (
          <CartItem key={item.product.id} product={item.product} quantity={item.quantity} />
        ))}
      </div>
      <CartSummary />
    </div>
  );
}
