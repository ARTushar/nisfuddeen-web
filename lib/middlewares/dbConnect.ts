import mongoose from 'mongoose';
import next from 'next';

async function dbConnect(req, res, next) {
  // check if we have a connection to the database or if it's currently
  // connecting or disconnecting (readyState 1, 2 and 3)
  if (mongoose.connection.readyState >= 1) {
    return next();
  }

  const connection = mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })

  connection.then((db) => {
    console.log("Connected Corectly to the atlas server");
  }, err => console.log(err));
  return next();
}

export default dbConnect;
