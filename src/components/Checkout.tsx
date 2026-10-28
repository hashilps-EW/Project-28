import { useState } from 'react';
import { useCartStore } from '../store/cartStore';
import { CheckoutReview } from './checkout/CheckoutReview';
import { CheckoutShipping } from './checkout/CheckoutShipping';
import { CheckoutPayment } from './checkout/CheckoutPayment';
import type { ShippingFormData } from '../lib/shippingValidation';

type CheckoutStep = 'review' | 'shipping' | 'payment' | 'success';

export function Checkout() {
  const [step, setStep] = useState<CheckoutStep>('review');
  const [shippingData, setShippingData] = useState<ShippingFormData | null>(null);
  const clearCart = useCartStore((state) => state.clearCart);
  const getCartTotal = useCartStore((state) => state.getCartTotal);

  const subtotal = getCartTotal();
  const tax = subtotal * 0.05;
  const discount = subtotal > 100 ? subtotal * 0.1 : 0;
  const total = subtotal + tax - discount;
  const canCheckout = total >= 10;

  const handleShippingSubmit = (data: ShippingFormData) => {
    setShippingData(data);
    setStep('payment');
  };

  const handlePlaceOrder = () => {
    clearCart();
    setStep('success');
  };

  const handleBack = () => {
    if (step === 'shipping') setStep('review');
    if (step === 'payment') setStep('shipping');
  };

  if (step === 'success') {
    return (
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow text-center">
        <div className="text-green-600 text-6xl mb-4">✓</div>
        <h2 className="text-2xl font-bold mb-4 dark:text-white">Order Placed Successfully!</h2>
        <p className="text-gray-600 dark:text-gray-400">Thank you for your purchase.</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className={`flex-1 text-center ${step === 'review' ? 'text-blue-600 dark:text-blue-400 font-semibold' : 'text-gray-400 dark:text-gray-500'}`}>
            1. Review
          </div>
          <div className="flex-1 text-center border-t-2 border-gray-200 dark:border-gray-700" />
          <div className={`flex-1 text-center ${step === 'shipping' ? 'text-blue-600 dark:text-blue-400 font-semibold' : 'text-gray-400 dark:text-gray-500'}`}>
            2. Shipping
          </div>
          <div className="flex-1 text-center border-t-2 border-gray-200 dark:border-gray-700" />
          <div className={`flex-1 text-center ${step === 'payment' ? 'text-blue-600 dark:text-blue-400 font-semibold' : 'text-gray-400 dark:text-gray-500'}`}>
            3. Payment
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        {step === 'review' && (
          <div>
            <CheckoutReview />
            {canCheckout ? (
              <button
                onClick={() => setStep('shipping')}
                className="w-full mt-6 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors"
              >
                Proceed to Shipping
              </button>
            ) : (
              <p className="text-red-600 text-center mt-6">
                Minimum order value is $10. Add more items to proceed.
              </p>
            )}
          </div>
        )}
        {step === 'shipping' && (
          <div>
            <CheckoutShipping onNext={handleShippingSubmit} />
            <button
              onClick={handleBack}
              className="w-full mt-4 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 py-2 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              Back
            </button>
          </div>
        )}
        {step === 'payment' && shippingData && (
          <div>
            <CheckoutPayment shippingData={shippingData} onPlaceOrder={handlePlaceOrder} />
            <button
              onClick={handleBack}
              className="w-full mt-4 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 py-2 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              Back
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
