import { describe, it, expect, beforeEach } from 'vitest';
import { useCartStore } from './cartStore';
import type { Product } from '../lib/validation';

describe('Cart Store Calculations', () => {
  beforeEach(() => {
    useCartStore.getState().clearCart();
  });

  it('should calculate cart total correctly', () => {
    const mockProduct1: Product = {
      id: 1,
      title: 'Product 1',
      price: 10,
      category: 'test',
      rating: 4.5,
      thumbnail: 'http://example.com/thumb1.jpg',
      images: ['http://example.com/img1.jpg'],
    };

    const mockProduct2: Product = {
      id: 2,
      title: 'Product 2',
      price: 20,
      category: 'test',
      rating: 4.0,
      thumbnail: 'http://example.com/thumb2.jpg',
      images: ['http://example.com/img2.jpg'],
    };

    useCartStore.getState().addToCart(mockProduct1);
    useCartStore.getState().addToCart(mockProduct2);
    useCartStore.getState().increaseQuantity(1);

    const total = useCartStore.getState().getCartTotal();
    expect(total).toBe(40); // (10 * 2) + (20 * 1)
  });

  it('should calculate cart count correctly', () => {
    const mockProduct: Product = {
      id: 1,
      title: 'Product 1',
      price: 10,
      category: 'test',
      rating: 4.5,
      thumbnail: 'http://example.com/thumb.jpg',
      images: ['http://example.com/img.jpg'],
    };

    useCartStore.getState().addToCart(mockProduct);
    useCartStore.getState().increaseQuantity(1);
    useCartStore.getState().increaseQuantity(1);

    const count = useCartStore.getState().getCartCount();
    expect(count).toBe(3); // 1 (initial) + 1 + 1 = 3
  });

  it('should not increase quantity beyond 5', () => {
    const mockProduct: Product = {
      id: 1,
      title: 'Product 1',
      price: 10,
      category: 'test',
      rating: 4.5,
      thumbnail: 'http://example.com/thumb.jpg',
      images: ['http://example.com/img.jpg'],
    };

    useCartStore.getState().addToCart(mockProduct);

    for (let i = 0; i < 10; i++) {
      useCartStore.getState().increaseQuantity(1);
    }

    const item = useCartStore.getState().items.find((item) => item.product.id === 1);
    expect(item?.quantity).toBe(5);
  });

  it('should not decrease quantity below 1', () => {
    const mockProduct: Product = {
      id: 1,
      title: 'Product 1',
      price: 10,
      category: 'test',
      rating: 4.5,
      thumbnail: 'http://example.com/thumb.jpg',
      images: ['http://example.com/img.jpg'],
    };

    useCartStore.getState().addToCart(mockProduct);

    for (let i = 0; i < 10; i++) {
      useCartStore.getState().decreaseQuantity(1);
    }

    const item = useCartStore.getState().items.find((item) => item.product.id === 1);
    expect(item?.quantity).toBe(1);
  });

  it('should remove item from cart', () => {
    const mockProduct: Product = {
      id: 1,
      title: 'Product 1',
      price: 10,
      category: 'test',
      rating: 4.5,
      thumbnail: 'http://example.com/thumb.jpg',
      images: ['http://example.com/img.jpg'],
    };

    useCartStore.getState().addToCart(mockProduct);
    expect(useCartStore.getState().items.length).toBe(1);

    useCartStore.getState().removeFromCart(1);
    expect(useCartStore.getState().items.length).toBe(0);
  });

  it('should clear all items from cart', () => {
    const mockProduct1: Product = {
      id: 1,
      title: 'Product 1',
      price: 10,
      category: 'test',
      rating: 4.5,
      thumbnail: 'http://example.com/thumb1.jpg',
      images: ['http://example.com/img1.jpg'],
    };

    const mockProduct2: Product = {
      id: 2,
      title: 'Product 2',
      price: 20,
      category: 'test',
      rating: 4.0,
      thumbnail: 'http://example.com/thumb2.jpg',
      images: ['http://example.com/img2.jpg'],
    };

    useCartStore.getState().addToCart(mockProduct1);
    useCartStore.getState().addToCart(mockProduct2);
    expect(useCartStore.getState().items.length).toBe(2);

    useCartStore.getState().clearCart();
    expect(useCartStore.getState().items.length).toBe(0);
  });

  it('should not add duplicate items, but increase quantity', () => {
    const mockProduct: Product = {
      id: 1,
      title: 'Product 1',
      price: 10,
      category: 'test',
      rating: 4.5,
      thumbnail: 'http://example.com/thumb.jpg',
      images: ['http://example.com/img.jpg'],
    };

    useCartStore.getState().addToCart(mockProduct);
    useCartStore.getState().addToCart(mockProduct);
    useCartStore.getState().addToCart(mockProduct);

    expect(useCartStore.getState().items.length).toBe(1);
    expect(useCartStore.getState().items[0].quantity).toBe(3);
  });
});
