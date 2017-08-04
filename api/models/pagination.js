import mongoose, { Schema } from 'mongoose';

const schema = {
  msg: {
    type: String,
    required: true,
  },
  level: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  time: {
    type: Date,
    required: true,
  },
  res: {
    type: Object,
  },
  req: {
    type: Object,
  },
  err: {
    type: Object,
  },
};

// Define log model
const errorLogSchema = new Schema(schema);

export default mongoose.model('Pagination', errorLogSchema);
