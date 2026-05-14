import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI!

// Reuse connection across hot-reloads in dev
let cached = (global as any).__mongoose

if (!cached) {
  cached = (global as any).__mongoose = { conn: null, promise: null }
}

export async function connectDB() {
  if (cached.conn) return cached.conn
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, { bufferCommands: false })
  }
  cached.conn = await cached.promise
  return cached.conn
}