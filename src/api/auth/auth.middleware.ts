import { NextFunction, Request, Response } from 'express';
import { authSchema, loginUserSchema } from './auth.schema';

export const validateUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    await authSchema.parseAsync(req.body);
    next();
  } catch (error) {
    const error_data = JSON.parse(error);
    res.status(400).json({ success: 'false', message: 'invalid body JSON', error: error_data });
  }
};

export const validateLogin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    await loginUserSchema.parseAsync(req.body);
    next();
  } catch (error) {
    const error_data = JSON.parse(error);
    res.status(400).json({ success: 'false', message: 'invalid body JSON', error: error_data });
  }
};
