"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleLoginUser = exports.handleCreateUser = void 0;
const database_1 = __importDefault(require("../../loaders/database"));
const shortid_1 = __importDefault(require("shortid"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jwt_1 = __importDefault(require("../../shared/jwt"));
const handleCreateUser = async (name, email, password) => {
    const collection = (await (0, database_1.default)()).collection('users');
    const user = await collection.findOne({ email });
    if (user) {
        throw new Error('User already exist with same email');
    }
    const saltRounds = 10;
    const hash = await bcrypt_1.default.hash(password, saltRounds);
    await collection.insertOne({
        uid: shortid_1.default.generate(),
        name,
        email,
        password: hash,
    });
};
exports.handleCreateUser = handleCreateUser;
const handleLoginUser = async (email, password) => {
    const data = await (await (0, database_1.default)()).collection('users').findOne({ email: email });
    if (!data) {
        throw { statusCode: 404, message: 'User Does Not Exsist' };
    }
    const res = await bcrypt_1.default.compare(password, data.password);
    if (!res) {
        throw { statusCode: 401, message: 'Incorrect Password / Not Allowed' };
    }
    return (0, jwt_1.default)(email);
};
exports.handleLoginUser = handleLoginUser;
//# sourceMappingURL=auth.services.js.map