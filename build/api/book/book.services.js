"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleDeleteBook = exports.handleUpdateBook = exports.handleCreateBook = exports.handleGetBookById = exports.handleGetBooks = void 0;
const database_1 = __importDefault(require("../../loaders/database"));
const shortid_1 = __importDefault(require("shortid"));
const handleGetBooks = async (page, limit, sort, librarian) => {
    const skipCount = (parseInt(page) - 1) * parseInt(limit);
    const options = {
        skip: skipCount,
        limit: parseInt(limit),
        sort: { [sort]: 1 },
        projection: { _id: 0 },
    };
    const collection = (await (0, database_1.default)()).collection('books');
    return await collection.find({ librarian }, options).toArray();
};
exports.handleGetBooks = handleGetBooks;
const handleGetBookById = async (id, librarian) => {
    const collection = (await (0, database_1.default)()).collection('books');
    const books = await collection.find({ librarian }, { projection: { _id: 0 } }).toArray();
    const exist = await books.find(book => {
        return book.uid === id;
    });
    if (!exist) {
        throw Error('Book not found');
    }
    return exist;
};
exports.handleGetBookById = handleGetBookById;
const handleCreateBook = async (name, author, price, description, librarian) => {
    const collection = (await (0, database_1.default)()).collection('books');
    const exist = await collection.findOne({ name, author });
    if (exist) {
        throw new Error('Book already exist with same name and author');
    }
    const bookId = shortid_1.default.generate();
    await collection.insertOne({ uid: bookId, name, author, price, description, librarian });
    return { uid: bookId, name, author, price, description };
};
exports.handleCreateBook = handleCreateBook;
const handleUpdateBook = async (uid, name, author, price, description, librarian) => {
    const collection = (await (0, database_1.default)()).collection('books');
    const books = await collection.find({ librarian }).toArray();
    const exist = await books.find(book => {
        return book.uid === uid;
    });
    if (!exist) {
        throw Error('Book not found');
    }
    await collection.updateOne({ uid }, { $set: { name, author, price, description } });
    return { uid, name, author, price, description };
};
exports.handleUpdateBook = handleUpdateBook;
const handleDeleteBook = async (uid, librarian) => {
    const collection = (await (0, database_1.default)()).collection('books');
    const books = await collection.find({ librarian }).toArray();
    const exist = await books.find(book => {
        return book.uid === uid;
    });
    if (!exist) {
        throw new Error('Book not found');
    }
    await collection.deleteOne({ uid });
};
exports.handleDeleteBook = handleDeleteBook;
//# sourceMappingURL=book.services.js.map