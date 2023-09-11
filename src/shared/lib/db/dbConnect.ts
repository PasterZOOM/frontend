import mongoose from 'mongoose'

declare global {
  // eslint-disable-next-line
  var mongoose: any // This must be a `var` and not a `let / const`
}

const MONGODB_URI = `mongodb+srv://${process.env.DB_USER_NAME}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}.iubgsyi.mongodb.net/?retryWrites=true&w=majority`

if (!MONGODB_URI) {
  throw new Error(
    'Please define the DB_USER_NAME, DB_PASSWORD, DB_CLUSTER environment variable inside .env.local'
  )
}

let cached = global.mongoose

if (!cached) {
  global.mongoose = { conn: null, promise: null }
  cached = global.mongoose
}

async function dbConnect(): Promise<typeof mongoose> {
  if (cached.conn) {
    return cached.conn
  }
  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      dbName: 'pi_straps',
    }

    cached.promise = mongoose.connect(MONGODB_URI, opts).then(mongo => {
      return mongo
    })
  }
  try {
    cached.conn = await cached.promise
  } catch (e) {
    cached.promise = null
    throw e
  }

  return cached.conn
}

export default dbConnect
