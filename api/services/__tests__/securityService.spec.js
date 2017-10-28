import { encrypt, decrypt } from '../securityService';

describe('Run tests for security service', () => {
  test('Encrypt and decrypt text string', () => {
    const res = decrypt(encrypt('Hello world'));
    expect(res).toEqual('Hello world');
  });
});
