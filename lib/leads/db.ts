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

// Schema
const LeadSchema = new mongoose.Schema(
  {
    leadType:      { type: String, required: true },
    sourcePage:    { type: String },
    name:          { type: String, required: true },
    phone:         { type: String, required: true },
    email:         { type: String },
    preferredDate: { type: String },
    preferredTime: { type: String },
    message:       { type: String },
    context:       { type: String },
    consent:       { type: Boolean, required: true },
    consentAt:     { type: Date, default: Date.now },  // DPDP compliance
  },
  { timestamps: true }  // adds createdAt + updatedAt automatically
)

export const Lead =
  mongoose.models.Lead ?? mongoose.model('Lead', LeadSchema)