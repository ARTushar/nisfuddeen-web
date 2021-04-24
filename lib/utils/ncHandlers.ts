import nc from 'next-connect';
import common from '../middlewares/common';

export function onNoMatch(req, res) {
  res.status(404).end("API Route Not found");
}

export function onError(err, req, res) {
  // console.log(err);
  res.status(err.status || 500).end(err.message);
}

export function createNC() {
  const handler = nc({onError: onError, onNoMatch: onNoMatch});
  handler.use(common);
  return handler;
}