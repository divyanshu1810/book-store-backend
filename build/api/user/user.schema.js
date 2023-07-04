"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSchema = void 0;
const zod_1 = require("zod");
exports.userSchema = zod_1.z.object({
    name: zod_1.z.string().min(5),
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(8),
});
//# sourceMappingURL=user.schema.js.map