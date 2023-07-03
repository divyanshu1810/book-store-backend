import database from '../../loaders/database';
import shortid from 'shortid';

export const handleGetBooks = async (): Promise<unknown[]> => {
  const collection = (await database()).collection('books');
  return await collection.find({}, { projection: { _id: 0 } }).toArray();
};

export const handleGetBookById = async (id: string): Promise<unknown> => {
  const collection = (await database()).collection('books');
  return await collection.findOne({ id: id }, { projection: { _id: 0 } });
};

export const handleCreateBook = async (
  name: string,
  author: string,
  price: string,
  description: string,
): Promise<unknown> => {
  const collection = (await database()).collection('books');
  const exist = await collection.findOne({ name, author });
  if (exist) {
    throw new Error('Book already exists');
  }
  const bookId = shortid.generate();
  await collection.insertOne({ id: bookId, name, author, price, description });
  return { id: bookId, name, author, price, description };
};

export const handleUpdateBook = async (
  id: string,
  name: string,
  author: string,
  price: string,
  description: string,
): Promise<unknown> => {
  const collection = (await database()).collection('books');
  const exist = await collection.findOne({ id });
  if (!exist) {
    throw new Error('Book not found');
  }
  await collection.updateOne({ id }, { $set: { name, author, price, description } });
  return { id, name, author, price, description };
};

export const handleDeleteBook = async (id: string): Promise<void> => {
  const collection = (await database()).collection('books');
  const exist = await collection.findOne({ id });
  if (!exist) {
    throw new Error('Book not found');
  }
  await collection.deleteOne({ id });
};
