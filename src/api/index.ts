import { Router } from 'express';
import bookRouter from './book/book.router';
import authRouter from './auth/auth.router';

export default (): Router => {
  const app = Router();
  app.get('/healthcheck', (req, res) => {
    res.status(200).send({
      success: true,
      message: 'Welcome to the Book API',
    });
  });
  app.use('/books', bookRouter());
  app.use('/auth', authRouter());
  return app;
};
