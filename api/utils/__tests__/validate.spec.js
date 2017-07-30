import { isIcelandicPhoneNumber, validateEmail } from '../validate';

describe('Runs validation tests', () => {
  // Icelandic Phone number
  it('Is string icelandic phone number', () => {
    const phone1 = '354-866-6665';
    const phone2 = '+354-866-6665';
    const phone3 = '354-866-66659';
    const isPhone1 = isIcelandicPhoneNumber(phone1);
    const isPhone2 = isIcelandicPhoneNumber(phone2);
    const isPhone3 = isIcelandicPhoneNumber(phone3);

    expect(isPhone1).toEqual(true);
    expect(isPhone2).toEqual(true);
    expect(isPhone3).toEqual(false);
  });

  // Email
  it('Check if string is email', () => {
    const email1 = 'snaerth@gmail.com';
    const email2 = 'snaerth@gmail.c';
    const isEmail1 = validateEmail(email1);
    const isEmail2 = validateEmail(email2);

    expect(isEmail1).toEqual(true);
    expect(isEmail2).toEqual(false);
  });
});
