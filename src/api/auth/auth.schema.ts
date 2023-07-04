import { z } from 'zod';

export const authSchema = z.object({
  name: z.string().min(5),
  email: z.string().email(),
  password: z.string().min(8),
});

export const loginUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});
