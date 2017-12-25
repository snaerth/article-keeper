// Nodejs encryption with CTR
import crypto from 'crypto';
import config from '../../config';

/**
 * Encrypts text string
 * @param {String} text
 */
export function encrypt(text) {
  try {
    const cipher = crypto.createCipher(config('cryptoAlgorrithm'), config('cryptoPassword'));
    let crypted = cipher.update(text, 'utf8', 'hex');
    crypted += cipher.final('hex');
    return crypted;
  } catch (error) {
    console.error(error);
  }
}

/**
 * Decrypts text string
 * @param {String} text
 */
export function decrypt(text) {
  try {
    const decipher = crypto.createDecipher(config('cryptoAlgorrithm'), config('cryptoPassword'));
    let dec = decipher.update(text, 'hex', 'utf8');
    dec += decipher.final('utf8');
    return dec;
  } catch (error) {
    console.error(error);
  }
}
