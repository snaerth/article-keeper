// Nodejs encryption with CTR
import crypto from 'crypto';
import config from '../config';
import log from './logService';

const { CRYPTO_ALGORITHM, CRYPTO_PASSWORD } = config;

/**
 * Encrypts text string
 * @param {String} text 
 */
export function encrypt(text) {
  try {
    const cipher = crypto.createCipher(CRYPTO_ALGORITHM, CRYPTO_PASSWORD);
    let crypted = cipher.update(text, 'utf8', 'hex');
    crypted += cipher.final('hex');
    return crypted;
  } catch (error) {
    log.error({ error }, 'Encryption error');
  }
}

/**
 * Decrypts text string
 * @param {String} text 
 */
export function decrypt(text) {
  try {
    const decipher = crypto.createDecipher(CRYPTO_ALGORITHM, CRYPTO_PASSWORD);
    let dec = decipher.update(text, 'hex', 'utf8');
    dec += decipher.final('utf8');
    return dec;
  } catch (error) {
    log.error({ error }, 'Decryption error');
  }
}
