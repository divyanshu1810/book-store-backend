import { z } from 'zod';

export const bookSchema = z.object({
  name: z.string().min(10),
  author: z.string().min(10),
  price: z.number().positive().gte(5),
  description: z.string().min(30),
});
