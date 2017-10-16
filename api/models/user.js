import mongoose, { Schema } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';
import bcrypt from 'bcrypt-nodejs';
import Promise from 'bluebird';

// Let mongoose use bluebird promises because mongoose promise library is
// deprecated
mongoose.Promise = Promise;

const schema = {
  email: {
    type: String,
    lowercase: true,
    unique: true,
  },
  password: {
    type: String,
    required: false,
  },
  name: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  roles: {
    type: Array,
    required: true,
    enum: ['user', 'admin', 'superuser'],
    default: 'user',
  },
  imageUrl: {
    type: String,
    required: false,
  },
  thumbnailUrl: {
    type: String,
    required: false,
  },
  dateOfBirth: {
    type: Date,
    required: false,
  },
  phone: {
    type: String,
    required: false,
  },
  resetPasswordToken: {
    type: String,
    required: false,
  },
  resetPasswordExpires: {
    type: Date,
  },
  profile: {
    type: String,
    required: true,
    enum: ['FACEBOOK', 'TWITTER', 'GOOGLE', 'LOCAL'],
    default: 'LOCAL',
  },
  facebook: {
    id: String,
    token: String,
    email: String,
    name: String,
    image: String,
  },
  twitter: {
    id: String,
    token: String,
    email: String,
    name: String,
    image: String,
  },
  google: {
    id: String,
    token: String,
    email: String,
    name: String,
    image: String,
  },
};

// Define user model
const userSchema = new Schema(schema);

// Pagination
mongoosePaginate.paginate.options = {
  limit: 100,
};

// Add mongoose pagination plugin to schema
userSchema.plugin(mongoosePaginate);

// On save, encrypt password Before saving user model, run this function
userSchema.pre('save', function preSave(next) {
  const user = this;

  // Encrypt our password using the salt above
  bcrypt.hash(user.password, bcrypt.genSaltSync(12), null, (error, hash) => {
    if (error) {
      return next(error);
    }

    // Override plain password with encrypted password
    user.password = hash;
    return next(user);
  });
});

// On findOneAndUpdate, encrypt password Before updating user model, run this function
userSchema.pre('findOneAndUpdate', function preUpdate(next) {
  const password = this._update.$set.password || ''; // eslint-disable-line
  if (!password) return next();
  // Encrypt our password using the salt above
  bcrypt.hash(password, bcrypt.genSaltSync(12), null, (error, hash) => {
    if (error) {
      return next(error);
    }

    // Update password with encrypted password
    this.update({ $set: { password: hash } });
    return next();
  });
});

// Compare password to encrypted password
userSchema.methods.comparePassword = function comparePassword(
  candidatePassword,
  callback,
) {
  bcrypt.compare(candidatePassword, this.password, (error, isMatch) => {
    if (error) {
      return callback(error);
    }
    return callback(null, isMatch);
  });
};

export default mongoose.model('user', userSchema);
