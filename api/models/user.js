import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt-nodejs';
import Promise from 'bluebird';

// Let mongoose use bluebird promises because mongoose promise library is
// deprecated
mongoose.Promise = Promise;

const schema = {
  email: {
    type: String,
    unique: true,
    lowercase: true,
    required: true,
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
  roles: {
    type: Array,
    required: true,
    default: ['user'],
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
  oauthID: {
    type: Number,
    required: false,
  },
  facebook: {
    id: String,
    token: String,
    email: String,
    name: String,
  },
};

// Define user model
const userSchema = new Schema(schema);

// On save, encrypt password Before saving user model, run this function
userSchema.pre('save', function (next) {
  const user = this;

  // Encrypt our password using the salt above
  bcrypt.hash(user.password, bcrypt.genSaltSync(10), null, (error, hash) => {
    if (error) {
      return next(error);
    }

    // Override plain password with encrypted password
    user.password = hash;
    return next(user);
  });
});

// Compare password to encrypted password
/* eslint func-names: ["error", "never"]*/
userSchema.methods.comparePassword = function (candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, (error, isMatch) => {
    if (error) {
      return callback(error);
    }
    return callback(null, isMatch);
  });
};

export default mongoose.model('user', userSchema);
