import { Router } from 'express';
import bookRouter from './book/book.router';

export default (): Router => {
  const app = Router();
  app.use('/books', bookRouter());
  return app;
};
