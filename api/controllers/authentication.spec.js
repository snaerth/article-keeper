import { validateSignup } from './authentication';

// Validate signup form fields
describe('Validate signup form fields from post request', () => {
  it('Validates signup fields', () => {
    const isValid = validateSignup({
      email: 'snaerth@gmail.com',
      password: 'ThisIsAPassword1',
      newPassword: 'ThisIsAPassword2',
      name: 'John Smith',
      dateOfBirth: new Date(),
    });

    expect(isValid).toBe(null);
  });
});
