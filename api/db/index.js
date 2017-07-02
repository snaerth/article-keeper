import mongoose from 'mongoose';

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
    callback();
  });
};
