import mongoose, {
  Schema,
} from 'mongoose'

const LeadSchema = new Schema(
  {
    leadType: String,
    sourcePage: String,

    name: String,
    phone: String,
    email: String,

    preferredDate: String,
    preferredTime: String,

    message: String,

    context: String,

    consent: Boolean,

    createdAt: String,
  },
  {
    timestamps: true,
  }
)

export default mongoose.models
  .Lead ||
  mongoose.model(
    'Lead',
    LeadSchema
  )