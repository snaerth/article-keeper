import mongoose, { Schema } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

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

// Create new log schema
const logSchema = new Schema(schema);

mongoosePaginate.paginate.options = {
  limit: 100,
};

// Add mongoose pagination plugin to schema
logSchema.plugin(mongoosePaginate);

export default mongoose.model('Log', logSchema);
