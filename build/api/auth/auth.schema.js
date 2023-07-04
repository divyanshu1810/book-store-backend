"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUserSchema = exports.authSchema = void 0;
const zod_1 = require("zod");
exports.authSchema = zod_1.z.object({
    name: zod_1.z.string().min(5),
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(8),
});
exports.loginUserSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(8),
});
//# sourceMappingURL=auth.schema.js.map