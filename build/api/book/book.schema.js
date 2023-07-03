"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookSchema = void 0;
const zod_1 = require("zod");
exports.bookSchema = zod_1.z.object({
    name: zod_1.z.string(),
    author: zod_1.z.string(),
    price: zod_1.z.number().positive(),
    quantity: zod_1.z.number().positive(),
    description: zod_1.z.string(),
    category: zod_1.z.string(),
    rating: zod_1.z.number().positive(),
});
//# sourceMappingURL=book.schema.js.map