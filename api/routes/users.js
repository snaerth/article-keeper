import {
  createUser,
  updateUser,
  deleteUser,
  getUser,
  getUsers,
  uploadUserImage,
  isAdmin,
  isSuperUser,
} from '../controllers/users';

/**
 * Default User routes
 * @param {Object} app - Express app referece
 * @param {Func} requireAuth - authentication helper function
 */
export default function (app, requireAuth) {
  // Create user
  app.post('/users', [requireAuth, isSuperUser], createUser);
  // Get all users
  app.get('/users', [requireAuth, isSuperUser], getUsers);
  // Get user by search query
  app.get('/users/:query', [requireAuth, isSuperUser], getUser);
  // Update user
  app.put('/users/:id', [requireAuth, isSuperUser], updateUser);
  // Delete user
  app.delete('/users/:id', [requireAuth, isAdmin], deleteUser);
  // Upload images
  app.post('/users/userimage', [requireAuth, isSuperUser], uploadUserImage);
}
