"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jwt_1 = require("./jwt");
const database_1 = __importDefault(require("../loaders/database"));
function authenticateToken() {
    return async (req, res, next) => {
        try {
            const authHeader = req.headers['authorization'];
            const token = authHeader === null || authHeader === void 0 ? void 0 : authHeader.split(' ')[1];
            if (!token) {
                throw { statusCode: 401, message: 'Token Not Found' };
            }
            const { email } = (0, jwt_1.verifyToken)(token);
            const data = await (await (0, database_1.default)()).collection('users').findOne({ email });
            if (!data) {
                throw { statusCode: 404, message: 'User Not Found' };
            }
            res.locals.user = data;
            next();
        }
        catch (error) {
            res.status(error.statusCode || 500).json({
                success: false,
                message: error.message,
            });
        }
    };
}
exports.default = authenticateToken;
//# sourceMappingURL=authenticate.js.map