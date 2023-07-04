import { Router } from 'express';
import { createBook, deleteBook, getBookById, getBooks, updateBook } from './book.controller';
import { validateBook } from './book.middleware';
import authenticateToken from '../../shared/authenticate';

export default (): Router => {
  const app = Router();
  app.get('/', getBooks);
  app.get('/:id', authenticateToken(), getBookById);
  app.post('/', validateBook, authenticateToken(), createBook);
  app.put('/:id', validateBook, authenticateToken(), updateBook);
  app.delete('/:id', authenticateToken(), deleteBook);
  return app;
};
