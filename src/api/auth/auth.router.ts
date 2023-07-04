import { Router } from 'express';
import { createUser, loginUser } from './auth.controller';
import { validateLogin, validateUser } from './auth.middleware';

export default (): Router => {
  const app = Router();
  app.post('/signup', validateUser, createUser);
  app.post('/login', validateLogin, loginUser);
  return app;
};
