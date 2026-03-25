import mongoose from 'mongoose';

type MongooseCache = {
  conn: mongoose.Mongoose | null;
  promise: Promise<mongoose.Mongoose> | null;
};

declare global {
  var mongoose: MongooseCache | undefined; // This must be a var and not a let or const
}

let cached = global.mongoose;

if (!cached) {
  global.mongoose = { conn: null, promise: null };
  cached = global.mongoose;
}

const dbCache = cached as MongooseCache;

async function dbConnect() {
  const MONGODB_URI = process.env.MONGODB_URI!;

  if (!MONGODB_URI) {
    throw new Error(
      'Please define the MONGODB_URI environment variable inside .env.local',
    );
  }

  if (dbCache.conn) {
    return dbCache.conn;
  }
  if (!dbCache.promise) {
    const opts = {
      bufferCommands: false,
    };
    dbCache.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }
  try {
    dbCache.conn = await dbCache.promise;
  } catch (e) {
    dbCache.promise = null;
    throw e;
  }

  return dbCache.conn;
}

export default dbConnect;
