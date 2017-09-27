import { isIcelandicPhoneNumber, isPhoneNumber, validateEmail, validateSeoUrl } from '../validate';
import { replaceIcelandicCharacters } from '../friendlyUrl';

describe('Runs validation tests', () => {
  // Icelandic Phone number
  it('Validate if string is icelandic phone number', () => {
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

  // Phone number
  it('Validate if string is phone number', () => {
    const phone1 = '354-866-6665';
    const phone2 = '+354-866-6665';
    const isPhone1 = isPhoneNumber(phone1);
    const isPhone2 = isPhoneNumber(phone2);

    expect(isPhone1).toEqual(true);
    expect(isPhone2).toEqual(true);
  });

  // Email
  it('Validate if string is email', () => {
    const email1 = 'snaerth@gmail.com';
    const email2 = 'snaerth@gmail.c';
    const isEmail1 = validateEmail(email1);
    const isEmail2 = validateEmail(email2);

    expect(isEmail1).toEqual(true);
    expect(isEmail2).toEqual(false);
  });

  // SEO Url
  it('Validate if string is SEO friendly string', () => {
    const str = 'this-is-seo-firendly-url';
    const str2 = '%this-is- seo &firendly-url';
    const str3 = replaceIcelandicCharacters('Snær-Seljan-Þóroddsson-is-a-Icelandic-name');
    const valid = validateSeoUrl(str);
    const unvalid = validateSeoUrl(str2);
    const valid2 = validateSeoUrl(str3);

    expect(valid).toEqual(true);
    expect(unvalid).toEqual(false);
    expect(valid2).toEqual(true);
  });
});
