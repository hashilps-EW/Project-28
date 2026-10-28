import { productsResponseSchema, type Product } from './validation';

const API_URL = 'https://dummyjson.com/products';

export async function fetchProducts(): Promise<Product[]> {
  const response = await fetch(`${API_URL}?limit=20`);
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }
  const data = await response.json();
  const validatedData = productsResponseSchema.parse(data);
  return validatedData.products;
}
