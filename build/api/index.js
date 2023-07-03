"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const book_router_1 = __importDefault(require("./book/book.router"));
exports.default = () => {
    const app = (0, express_1.Router)();
    app.use('/books', (0, book_router_1.default)());
    return app;
};
//# sourceMappingURL=index.js.map