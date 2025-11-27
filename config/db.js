import mongoose from "mongoose";

// ----- HARD-CODED MONGODB URI -----
// NOTE: DO NOT USE THIS IN PUBLIC OR PRODUCTION
const MONGODB_URI =
  "mongodb+srv://dripmobilesss:sdsdsd323232@quickcart.uxlikis.mongodb.net/quickcart";

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  // If already connected, return existing connection
  if (cached.conn) return cached.conn;

  // If no connection promise exists, create one
  if (!cached.promise) {
    const opts = { bufferCommands: false };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      console.log("✔ Connected to MongoDB");
      return mongoose;
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectDB;
