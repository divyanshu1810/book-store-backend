import { Router } from 'express';
import { createBook, deleteBook, getBookById, getBooks, updateBook } from './book.controller';
import { validateBook } from './book.middleware';

export default (): Router => {
  const app = Router();
  app.get('/', getBooks);
  app.get('/:id', getBookById);
  app.post('/', validateBook, createBook);
  app.put('/:id', validateBook, updateBook);
  app.delete('/:id', deleteBook);
  return app;
};
