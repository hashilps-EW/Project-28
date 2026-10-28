import { z } from 'zod';

export const productSchema = z.object({
  id: z.number(),
  title: z.string(),
  price: z.number(),
  category: z.string(),
  rating: z.number(),
  thumbnail: z.string().url(),
  images: z.array(z.string().url()),
});

export const productsResponseSchema = z.object({
  products: z.array(productSchema),
  total: z.number(),
  skip: z.number(),
  limit: z.number(),
});

export type Product = z.infer<typeof productSchema>;
export type ProductsResponse = z.infer<typeof productsResponseSchema>;
