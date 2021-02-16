import crypto from 'crypto';

export const hashPassword = (password) => {
  const salt = crypto.randomBytes(31).toString('hex');
  const hash = crypto.pbkdf1Sync(password, salt, 10000, 64, 'sha512').toString('hex');

  return {
    salt,
    hash
  };
}

export const isValidPassword = (password, salt, hash) => {
  return hash === crypto.pbkdf1Sync(password, salt, 10000, 64, 'sha512').toString('hex');
}