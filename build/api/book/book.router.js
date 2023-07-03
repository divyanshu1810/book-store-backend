"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const book_controller_1 = require("./book.controller");
exports.default = () => {
    const app = (0, express_1.Router)();
    app.get('/', book_controller_1.getBooks);
    app.get('/:id', book_controller_1.getBookById);
    app.post('/', book_controller_1.createBook);
    app.put('/:id', book_controller_1.updateBook);
    app.delete('/:id', book_controller_1.deleteBook);
    return app;
};
//# sourceMappingURL=book.router.js.map