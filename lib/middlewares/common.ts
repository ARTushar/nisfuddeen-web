import nc from 'next-connect';
import passport from './passport';
import dbConnect from './dbConnect';
import helmet from 'helmet';
import logger from 'morgan';

const common = nc();

common
  .use(dbConnect)
  .use(logger('dev'))
  .use(helmet())
  .use(passport.initialize());

export default common;