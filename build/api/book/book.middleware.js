"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateBook = void 0;
const book_schema_1 = require("./book.schema");
const validateBook = async (req, res, next) => {
    try {
        await book_schema_1.bookSchema.parseAsync(req.body);
        next();
    }
    catch (error) {
        const error_data = JSON.parse(error);
        res.status(400).json({ success: 'false', message: 'invalid body JSON', error: error_data });
    }
};
exports.validateBook = validateBook;
//# sourceMappingURL=book.middleware.js.map