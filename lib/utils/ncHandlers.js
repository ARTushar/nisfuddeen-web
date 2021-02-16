
export function onNoMatch(req, res) {
  res.status(404).end("Not found");
}


export function onError(err, req, res) {
  // console.log(err);
  res.status(err.status).end(err.message);
}


export function createError(statusCode, message) {
  const err = new Error(message);
  err.status = statusCode;
  return err;
}