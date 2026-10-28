import { useState, useEffect } from 'react';
import { ProductList } from './components/ProductList';
import { Cart } from './components/Cart';
import { Checkout } from './components/Checkout';
import { useCartStore } from './store/cartStore';
import { useThemeStore } from './store/themeStore';

type View = 'products' | 'cart' | 'checkout';

export function App() {
  const [view, setView] = useState<View>('products');
  const cartCount = useCartStore((state) => state.getCartCount());
  const { isDarkMode, toggleDarkMode } = useThemeStore();

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors">
      <nav className="bg-white dark:bg-gray-800 shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400">Shopping Cart</h1>
            <div className="flex gap-4 items-center">
              <button
                onClick={toggleDarkMode}
                className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                {isDarkMode ? '☀️ Light' : '🌙 Dark'}
              </button>
              <button
                onClick={() => setView('products')}
                className={`px-4 py-2 rounded transition-colors ${
                  view === 'products'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                Products
              </button>
              <button
                onClick={() => setView('cart')}
                className={`px-4 py-2 rounded transition-colors ${
                  view === 'cart'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                Cart ({cartCount})
              </button>
              {cartCount > 0 && (
                <button
                  onClick={() => setView('checkout')}
                  className={`px-4 py-2 rounded transition-colors ${
                    view === 'checkout'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                  }`}
                >
                  Checkout
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {view === 'products' && <ProductList />}
        {view === 'cart' && <Cart />}
        {view === 'checkout' && <Checkout />}
      </main>
    </div>
  );
}
