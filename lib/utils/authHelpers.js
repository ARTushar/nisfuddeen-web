import jwt from 'jsonwebtoken';
import auth from '../config/auth';
import User from '../models/User';

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


export const createNewUser = async (name, email, password) => {
  const newUser = new User({
    name, email
  });
  try {
    await newUser.setPassword(password);
    await newUser.save();
  } catch (err) {
    throw err;
  }
}