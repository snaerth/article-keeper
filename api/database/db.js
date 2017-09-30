import mongoose from 'mongoose';
import User from '../models/user';

/**
 * Creates initial admin user in db
 * @returns {Promise}
 */
export async function createAdminUser() {
  return new Promise((resolve, reject) => {
    const email = 'admin@admin.com';

    User.findOne(
      {
        email,
      },
      (error, user) => {
        if (error) {
          return reject(error);
        }

        if (user) {
          return resolve(user);
        }

        const adminUser = new User();
        adminUser.email = email;
        adminUser.name = 'Admin';
        adminUser.password = 'Admin123';
        adminUser.roles = ['admin', 'user'];

        // save default admin user to the database
        return adminUser.save((err) => {
          if (err) {
            return reject(err);
          }

          return resolve(adminUser);
        });
      },
    );
  });
}

export default (mongoUri, callback) => {
  const options = {
    useMongoClient: true,
    keepAlive: 1,
    connectTimeoutMS: 30000,
    socketTimeoutMS: 0,
    reconnectTries: 10,
  };

  // Connect to database
  mongoose.connect(mongoUri, options);

  mongoose.connection.on('error', (error) => {
    throw new Error(`Unable to connect to database: ${mongoUri}`, error);
  });

  mongoose.connection.on('open', async () => {
    try {
      await createAdminUser();
      callback();
    } catch (error) {
      throw new Error('Error creating admin user', error);
    }
  });
};
