import mongoose, { Schema } from 'mongoose';

const schema = {
  pid: {
    type: String,
    required: true,
  },
  hostname: {
    type: String,
    required: true,
  },
  level: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  msg: {
    type: String,
    required: false,
  },
  type: {
    type: String,
  },
  stack: {
    type: String,
  },
  v: {
    type: String,
    required: false,
  },
};

// Define log model
const errorLogSchema = new Schema(schema);

export default mongoose.model('errorLog', errorLogSchema);
