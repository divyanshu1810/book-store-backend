"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
exports.default = () => {
    const app = (0, express_1.Router)();
    app.get('/', getUsers);
    app.get('/:id', getUserById);
    app.post('/', validateBook, createBook);
    app.put('/:id', validateBook, updateBook);
    app.delete('/:id', deleteBook);
    return app;
};
//# sourceMappingURL=user.router.js.map