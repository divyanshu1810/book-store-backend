import { z } from 'zod';

export const bookSchema = z.object({
  name: z.string(),
  author: z.string(),
  price: z.number().positive(),
  quantity: z.number().positive(),
  description: z.string(),
  category: z.string(),
  rating: z.number().positive(),
});
