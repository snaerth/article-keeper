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

// Define log model
const logSchema = new Schema(schema);
// Add mongoose pagination plugin to schema
// https://github.com/edwardhotchkiss/mongoose-paginate
mongoosePaginate.paginate.options = {
  limit: 20,
};
logSchema.plugin(mongoosePaginate);

export default mongoose.model('Log', logSchema);