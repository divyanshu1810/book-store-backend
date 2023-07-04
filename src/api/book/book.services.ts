import database from '../../loaders/database';
import shortid from 'shortid';

export const handleGetBooks = async (
  page: unknown,
  limit: unknown,
  sort: unknown,
  librarian: string,
): Promise<unknown[]> => {
  const skipCount = (parseInt(page as string) - 1) * parseInt(limit as string);
  const options = {
    skip: skipCount,
    limit: parseInt(limit as string),
    sort: { [sort as string]: 1 }, // 1 for ascending, -1 for descending
    projection: { _id: 0 },
  };
  const collection = (await database()).collection('books');
  return await collection.find({ librarian }, options).toArray();
};

export const handleGetBookById = async (id: string, librarian: string): Promise<unknown> => {
  const collection = (await database()).collection('books');
  const books = await collection.find({ librarian }, { projection: { _id: 0 } }).toArray();
  const exist = await books.find(book => {
    return book.uid === id;
  });
  if (!exist) {
    throw Error('Book not found');
  }
  return exist;
};

export const handleCreateBook = async (
  name: string,
  author: string,
  price: string,
  description: string,
  librarian: string,
): Promise<unknown> => {
  const collection = (await database()).collection('books');
  const exist = await collection.findOne({ name, author });
  if (exist) {
    throw new Error('Book already exist with same name and author');
  }
  const bookId = shortid.generate();
  await collection.insertOne({ uid: bookId, name, author, price, description, librarian });
  return { uid: bookId, name, author, price, description };
};

export const handleUpdateBook = async (
  uid: string,
  name: string,
  author: string,
  price: string,
  description: string,
  librarian: string,
): Promise<unknown> => {
  const collection = (await database()).collection('books');
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

export const handleDeleteBook = async (uid: string, librarian: string): Promise<void> => {
  const collection = (await database()).collection('books');
  const books = await collection.find({ librarian }).toArray();
  const exist = await books.find(book => {
    return book.uid === uid;
  });
  if (!exist) {
    throw new Error('Book not found');
  }
  await collection.deleteOne({ uid });
};
