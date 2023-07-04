"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateLogin = exports.validateUser = void 0;
const auth_schema_1 = require("./auth.schema");
const validateUser = async (req, res, next) => {
    try {
        await auth_schema_1.authSchema.parseAsync(req.body);
        next();
    }
    catch (error) {
        const error_data = JSON.parse(error);
        res.status(400).json({ success: 'false', message: 'invalid body JSON', error: error_data });
    }
};
exports.validateUser = validateUser;
const validateLogin = async (req, res, next) => {
    try {
        await auth_schema_1.loginUserSchema.parseAsync(req.body);
        next();
    }
    catch (error) {
        const error_data = JSON.parse(error);
        res.status(400).json({ success: 'false', message: 'invalid body JSON', error: error_data });
    }
};
exports.validateLogin = validateLogin;
//# sourceMappingURL=auth.middleware.js.map