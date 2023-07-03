import { Router } from 'express';
import { createBook, deleteBook, getBookById, getBooks, updateBook } from './book.controller';

export default (): Router => {
  const app = Router();
  app.get('/', getBooks);
  app.get('/:id', getBookById);
  app.post('/', createBook);
  app.put('/:id', updateBook);
  app.delete('/:id', deleteBook);
  return app;
};
