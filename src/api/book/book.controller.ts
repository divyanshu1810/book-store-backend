import { Request, Response } from 'express';
import {
  handleCreateBook,
  handleDeleteBook,
  handleGetBookById,
  handleGetBooks,
  handleUpdateBook,
} from './book.services';

export const getBooks = async (req: Request, res: Response): Promise<void> => {
  try {
    const { page = 1, limit = 2, sort = 'price' } = req.query;
    const books = await handleGetBooks(page, limit, sort);
    res.status(200).json({
      success: 'true',
      message: 'Books retrieved successfully',
      page: parseInt(page as string),
      books,
    });
  } catch (error) {
    res.status(500).json({ success: 'false', error: error.message });
  }
};

export const getBookById = async (req: Request, res: Response): Promise<void> => {
  try {
    const book = await handleGetBookById(req.params.id);
    if (!book) {
      res.status(404).json({
        success: 'false',
        error: 'Book not found',
      });
      return;
    }
    res.status(200).json({
      success: 'true',
      message: 'Book retrieved successfully',
      book,
    });
  } catch (error) {
    res.status(500).json({ success: 'false', error: error.message });
  }
};

export const createBook = async (req: Request, res: Response): Promise<void> => {
  try {
    const book = await handleCreateBook(req.body.name, req.body.author, req.body.price, req.body.description);
    res.status(200).json({
      success: 'true',
      message: 'Book created successfully',
      data: book,
    });
  } catch (error) {
    if (error.message === 'Book already exist with same name and author') {
      res.status(409).json({ success: 'false', error: error.message });
    }
    res.status(500).json({ success: 'false', error: error.message });
  }
};

export const updateBook = async (req: Request, res: Response): Promise<void> => {
  try {
    const book = await handleUpdateBook(
      req.params.id,
      req.body.name,
      req.body.author,
      req.body.price,
      req.body.description,
    );
    res.status(200).json({
      success: 'true',
      message: 'Book updated successfully',
      data: book,
    });
  } catch (error) {
    if (error.message === 'Book not found') {
      res.status(404).json({ success: 'false', error: error.message });
    }
    res.status(500).json({ success: 'false', error: error.message });
  }
};

export const deleteBook = async (req: Request, res: Response): Promise<void> => {
  try {
    await handleDeleteBook(req.params.id);
    res.status(200).json({
      success: 'true',
      message: 'Book deleted successfully',
    });
  } catch (error) {
    if (error.message === 'Book not found') {
      res.status(404).json({ success: 'false', error: error.message });
    }
    res.status(500).json({ success: 'false', error: error.message });
  }
};
