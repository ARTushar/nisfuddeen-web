import jwt from 'jsonwebtoken';
import mongoose, { mongo } from 'mongoose';
import auth from '../config/auth';
import dbConnect from '../middlewares/dbConnect';
import User from '../models/User';
import UserDetail from '../models/UserDetail';
import { createError } from './ncHandlers';

export const getToken = (user, type='default') => {
  const _id = user._id;
  let expiresIn;
  if (type === 'refresh')
      expiresIn = auth.refreshTokenExpiration;
  else expiresIn = auth.tokenExpiration;

  const payload = {
      _id,
  };
  return jwt.sign(payload, auth.privateKey, { expiresIn: expiresIn, algorithm: 'RS256' })
}


export const createNewUser = async (name, email, password, accountType) => {
  if (!name || !email || !password) throw createError(403, 'invalid input');
  const newUser = new User({
    name, email
  });
  if (accountType && accountType === 'guardian') {
    newUser.accountType = accountType;
  }
  try {
    await newUser.setPassword(password);
    await mongoose.connection.transaction(async function executor(session) {
      const user = await newUser.save({ session });
      await new UserDetail({ userId: user._id }).save({ session });
    })
    // const user = await newUser.save();
    // await new UserDetail({ userId: user._id }).save();
  } catch (err) {
    throw err;
  }
}