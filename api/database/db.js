import mongoose from 'mongoose';
import User from '../models/user';

/**
 * Creates initial admin user in db
 * @param {Func} cb
 * @returns {Func} callback
 */
export function createAdminUser(cb) {
  const email = 'admin@admin.com';

  User.findOne(
    {
      email,
    },
    (error, user) => {
      if (error) {
        return cb(error);
      }

      if (user) {
        return cb();
      }

      const adminUser = new User();
      adminUser.email = email;
      adminUser.name = 'Admin';
      adminUser.password = 'Admin123';
      adminUser.roles = ['admin', 'user'];

      // save default admin user to the database
      return adminUser.save((err) => {
        if (err) {
          return cb(err);
        }

        return cb();
      });
    },
  );
}

export default (mongoUri, callback) => {
  const options = {
    server: {
      reconnectTries: 10,
      socketOptions: {
        keepAlive: 1,
        connectTimeoutMS: 30000,
        socketTimeoutMS: 0,
      },
    },
  };

  // Connect to database
  mongoose.connect(mongoUri, options);

  mongoose.connection.on('error', (error) => {
    throw new Error(`Unable to connect to database: ${mongoUri}`, error);
  });

  mongoose.connection.on('open', () => {
    createAdminUser((error) => {
      if (error) {
        throw new Error('Error creating admin user', error);
      }

      callback();
    });
  });
};
