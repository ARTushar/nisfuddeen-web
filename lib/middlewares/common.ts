import nc from 'next-connect';
import helmet from 'helmet';
import logger from 'morgan';

const common = nc();

common
  .use(logger('dev'))
  .use(helmet())

export default common;