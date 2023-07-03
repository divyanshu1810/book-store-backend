"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleDeleteBook = exports.handleUpdateBook = exports.handleCreateBook = exports.handleGetBookById = exports.handleGetBooks = void 0;
const database_1 = __importDefault(require("../../loaders/database"));
const shortid_1 = __importDefault(require("shortid"));
const handleGetBooks = async () => {
    const collection = (await (0, database_1.default)()).collection('books');
    return await collection.find({}, { projection: { _id: 0 } }).toArray();
};
exports.handleGetBooks = handleGetBooks;
const handleGetBookById = async (id) => {
    const collection = (await (0, database_1.default)()).collection('books');
    return await collection.findOne({ id: id }, { projection: { _id: 0 } });
};
exports.handleGetBookById = handleGetBookById;
const handleCreateBook = async (name, author, price, description) => {
    const collection = (await (0, database_1.default)()).collection('books');
    const exist = await collection.findOne({ name, author });
    if (exist) {
        throw new Error('Book already exists');
    }
    const bookId = shortid_1.default.generate();
    await collection.insertOne({ id: bookId, name, author, price, description });
    return { id: bookId, name, author, price, description };
};
exports.handleCreateBook = handleCreateBook;
const handleUpdateBook = async (id, name, author, price, description) => {
    const collection = (await (0, database_1.default)()).collection('books');
    const exist = await collection.findOne({ id });
    if (!exist) {
        throw new Error('Book not found');
    }
    await collection.updateOne({ id }, { $set: { name, author, price, description } });
    return { id, name, author, price, description };
};
exports.handleUpdateBook = handleUpdateBook;
const handleDeleteBook = async (id) => {
    const collection = (await (0, database_1.default)()).collection('books');
    const exist = await collection.findOne({ id });
    if (!exist) {
        throw new Error('Book not found');
    }
    await collection.deleteOne({ id });
};
exports.handleDeleteBook = handleDeleteBook;
//# sourceMappingURL=book.services.js.map