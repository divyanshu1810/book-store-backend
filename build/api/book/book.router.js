"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const book_controller_1 = require("./book.controller");
const book_middleware_1 = require("./book.middleware");
const authenticate_1 = __importDefault(require("../../shared/authenticate"));
exports.default = () => {
    const app = (0, express_1.Router)();
    app.get('/', book_controller_1.getBooks);
    app.get('/:id', (0, authenticate_1.default)(), book_controller_1.getBookById);
    app.post('/', book_middleware_1.validateBook, (0, authenticate_1.default)(), book_controller_1.createBook);
    app.put('/:id', book_middleware_1.validateBook, (0, authenticate_1.default)(), book_controller_1.updateBook);
    app.delete('/:id', (0, authenticate_1.default)(), book_controller_1.deleteBook);
    return app;
};
//# sourceMappingURL=book.router.js.map