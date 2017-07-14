import { MODAL_OPEN, MODAL_CLOSE } from './types';

/**
 * Handles error from server
 *
 * @returns {Object} action
 * @author Snær Seljan Þóroddsson
 */
export function authError(type, error) {
  const errorMessage = error.response.data.error
    ? error.response.data.error
    : error.response.data;

  let payload = errorMessage;

  if (error.response.status === 401) {
    payload = 'Bad login credentials';
  }

  if (
    errorMessage &&
    typeof errorMessage === 'string' &&
    errorMessage.toLowerCase() === 'proxy_error'
  ) {
    payload = 'Error connecting to server';
  }

  return { type, payload };
}

/**
 * Open modal action createor
 *
 * @returns {Object}
 * @author Snær Seljan Þóroddsson
 */
export function openModal() {
  return { type: MODAL_OPEN };
}

/**
 * Close modal action createor
 *
 * @returns {Object}
 * @author Snær Seljan Þóroddsson
 */
export function closeModal() {
  return { type: MODAL_CLOSE };
}
