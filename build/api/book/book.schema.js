"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookSchema = void 0;
const zod_1 = require("zod");
exports.bookSchema = zod_1.z.object({
    name: zod_1.z.string().min(10),
    author: zod_1.z.string().min(10),
    price: zod_1.z.number().positive().gte(5),
    description: zod_1.z.string().min(30),
});
//# sourceMappingURL=book.schema.js.map