import nc from 'next-connect';
import common from '../middlewares/common';

export function onNoMatch(req, res) {
  res.status(404).end("Not found");
}


export function onError(err, req, res) {
  // console.log(err);
  res.status(err.status || 500).end(err.message);
}


export function createError(statusCode, message) {
  const err = new Error(message);
  err.status = statusCode;
  return err;
}

export function createNC() {
  const handler = nc({onError: onError, onNoMatch: onNoMatch});
  handler.use(common);
  return handler;
}