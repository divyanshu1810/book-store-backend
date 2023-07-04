import database from '../../loaders/database';
import shortid from 'shortid';
import bcrypt from 'bcrypt';
import generateToken from '../../shared/jwt';

export const handleCreateUser = async (name: string, email: string, password: string): Promise<void> => {
  const collection = (await database()).collection('users');
  const user = await collection.findOne({ email });
  if (user) {
    throw new Error('User already exist with same email');
  }
  const saltRounds = 10;
  const hash = await bcrypt.hash(password, saltRounds);

  await collection.insertOne({
    uid: shortid.generate(),
    name,
    email,
    password: hash,
  });
};

export const handleLoginUser = async (email: string, password: string): Promise<unknown> => {
  const data = await (await database()).collection('users').findOne({ email: email });

  if (!data) {
    throw { statusCode: 404, message: 'User Does Not Exsist' };
  }

  const res = await bcrypt.compare(password, data.password);
  if (!res) {
    throw { statusCode: 401, message: 'Incorrect Password / Not Allowed' };
  }
  return generateToken(email);
};
