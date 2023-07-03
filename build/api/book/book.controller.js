"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBook = exports.updateBook = exports.createBook = exports.getBookById = exports.getBooks = void 0;
const book_services_1 = require("./book.services");
const getBooks = async (req, res) => {
    try {
        const books = await (0, book_services_1.handleGetBooks)();
        res.status(200).json({
            success: 'true',
            message: 'Books retrieved successfully',
            books,
        });
    }
    catch (error) {
        res.status(500).json({ success: 'false', error: error.message });
    }
};
exports.getBooks = getBooks;
const getBookById = async (req, res) => {
    try {
        const book = await (0, book_services_1.handleGetBookById)(req.params.id);
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
    }
    catch (error) {
        res.status(500).json({ success: 'false', error: error.message });
    }
};
exports.getBookById = getBookById;
const createBook = async (req, res) => {
    try {
        const book = await (0, book_services_1.handleCreateBook)(req.body.name, req.body.author, req.body.price, req.body.description);
        res.status(200).json({
            success: 'true',
            message: 'Book created successfully',
            data: book,
        });
    }
    catch (error) {
        res.status(500).json({ success: 'false', error: error.message });
    }
};
exports.createBook = createBook;
const updateBook = async (req, res) => {
    try {
        const book = await (0, book_services_1.handleUpdateBook)(req.params.id, req.body.name, req.body.author, req.body.price, req.body.description);
        res.status(200).json({
            success: 'true',
            message: 'Book updated successfully',
            data: book,
        });
    }
    catch (error) {
        res.status(500).json({ success: 'false', error: error.message });
    }
};
exports.updateBook = updateBook;
const deleteBook = async (req, res) => {
    try {
        await (0, book_services_1.handleDeleteBook)(req.params.id);
        res.status(200).json({
            success: 'true',
            message: 'Book deleted successfully',
        });
    }
    catch (error) {
        res.status(500).json({ success: 'false', error: error.message });
    }
};
exports.deleteBook = deleteBook;
//# sourceMappingURL=book.controller.js.map