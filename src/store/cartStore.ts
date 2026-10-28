import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Product } from '../lib/validation';

interface CartItem {
  product: Product;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  increaseQuantity: (productId: number) => void;
  decreaseQuantity: (productId: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartCount: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addToCart: (product) => {
        const existingItem = get().items.find((item) => item.product.id === product.id);
        if (existingItem) {
          if (existingItem.quantity < 5) {
            set({
              items: get().items.map((item) =>
                item.product.id === product.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
            });
          }
        } else {
          set({ items: [...get().items, { product, quantity: 1 }] });
        }
      },
      removeFromCart: (productId) => {
        set({ items: get().items.filter((item) => item.product.id !== productId) });
      },
      increaseQuantity: (productId) => {
        set({
          items: get().items.map((item) =>
            item.product.id === productId && item.quantity < 5
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        });
      },
      decreaseQuantity: (productId) => {
        set({
          items: get().items.map((item) =>
            item.product.id === productId && item.quantity > 1
              ? { ...item, quantity: item.quantity - 1 }
              : item
          ),
        });
      },
      clearCart: () => set({ items: [] }),
      getCartTotal: () => {
        return get().items.reduce((total, item) => total + item.product.price * item.quantity, 0);
      },
      getCartCount: () => {
        return get().items.reduce((count, item) => count + item.quantity, 0);
      },
    }),
    {
      name: 'cart-storage',
    }
  )
);
