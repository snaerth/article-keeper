import {
  updateUser,
  createUser,
  deleteUser,
  getUser,
  getUsers,
  uploadUserImage,
  isAdmin,
} from '../controllers/users';

/**
 * Default User routes
 * @param {Object} app - Express app referece
 * @param {Func} requireAuth - authentication helper function
 */
export default function (app, requireAuth) {
  // Create user
  app.post('/users', [requireAuth, isAdmin], createUser);
  // Get all users
  app.get('/users', [requireAuth, isAdmin], getUsers);
  // Get user by search query
  app.get('/users/:query', [requireAuth, isAdmin], getUser);
  // Update user
  app.put('/users/:id', [requireAuth, isAdmin], updateUser);
  // Delete user
  app.delete('/users/:id', [requireAuth, isAdmin], deleteUser);
  // Upload images
  app.post('/users/userimage', [requireAuth, isAdmin], uploadUserImage);
}
