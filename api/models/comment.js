import mongoose, { Schema } from 'mongoose';

const schema = {
  text: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    lowercase: true,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
};

// Define user model
const commentSchema = new Schema(schema);

export default mongoose.model('comment', commentSchema);
