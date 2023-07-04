import database from '../../loaders/database';
import shortid from 'shortid';

export const handleGetBooks = async (page: unknown, limit: unknown, sort: unknown): Promise<unknown[]> => {
  const skipCount = (parseInt(page as string) - 1) * parseInt(limit as string);
  const options = {
    skip: skipCount,
    limit: parseInt(limit as string),
    sort: { [sort as string]: 1 }, // 1 for ascending, -1 for descending
    projection: { _id: 0 },
  };
  const collection = (await database()).collection('books');
  return await collection.find({}, options).toArray();
};

export const handleGetBookById = async (id: string): Promise<unknown> => {
  const collection = (await database()).collection('books');
  return await collection.findOne({ uid: id }, { projection: { _id: 0 } });
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
    throw new Error('Book already exist with same name and author');
  }
  const bookId = shortid.generate();
  await collection.insertOne({ uid: bookId, name, author, price, description });
  return { uid: bookId, name, author, price, description };
};

export const handleUpdateBook = async (
  uid: string,
  name: string,
  author: string,
  price: string,
  description: string,
): Promise<unknown> => {
  const collection = (await database()).collection('books');
  const exist = await collection.findOne({ uid });
  if (!exist) {
    throw new Error('Book not found');
  }
  await collection.updateOne({ uid }, { $set: { name, author, price, description } });
  return { uid, name, author, price, description };
};

export const handleDeleteBook = async (uid: string): Promise<void> => {
  const collection = (await database()).collection('books');
  const exist = await collection.findOne({ uid });
  if (!exist) {
    throw new Error('Book not found');
  }
  await collection.deleteOne({ uid });
};
