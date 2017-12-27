/**
 * Detects where to find email in user object and returns email
 *
 * @param {Object} user
 * @param {String} email
 */
export default function getUserEmail(user) {
  switch (user.profile) {
    case 'LOCAL':
      return user.email;

    case 'FACEBOOK':
      return user.facebook.email;

    case 'GOOGLE':
      return user.google.email;

    default:
      return 'Email missing';
  }
}
