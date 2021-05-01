import path from 'path';
import fs from 'fs';

const pathToPublicKey = path.resolve('files', 'rsa_public.pem');
const PUBLIC_KEY = fs.readFileSync(pathToPublicKey, 'utf-8');
const pathToPrivateKey = path.resolve('files', 'rsa_private.pem');
const PRIVATE_KEY = fs.readFileSync(pathToPrivateKey,'utf-8');

export default {
  tokenSecret: "fkdfjAiDFJejkdjf3i99093jkdDfj3939df33j",
  tokenExpiration: '1h',
  refreshTokenExpiration: '3d',
  publicKey: PUBLIC_KEY,
  privateKey: PRIVATE_KEY,
  googleClientId: process.env.GOOGLE_ID,
  googleClientSecret: process.env.GOOGLE_SECRET,
  facebookClientId: process.env.FACEBOOK_ID,
  facebookClientSecret: process.env.FACEBOOK_SECRET,
  emailUser: process.env.EMAIL_SERVER_USER,
  emailPassword: process.env.EMAIL_SERVER_PASSWORD,
  emailHost: process.env.EMAIL_SERVER_HOST,
  emailPort: parseInt(process.env.EMAIL_SERVER_PORT),
  emailFrom: process.env.EMAIL_SERVER_EMAIL_FROM,
}
