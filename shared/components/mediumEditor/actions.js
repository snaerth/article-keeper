import axios from 'axios';
import { UPLOAD_IMAGE } from './types';
import { authError } from '../../common/actions';

/**
 * Upload image to server
 *
 * @param {Object} email, password
 * @returns {undefined}
 * @author Snær Seljan Þóroddsson
 */
export default function uploadImage({ email, password }) {
  return async (dispatch) => {
    try {
      // Post email/password to admin server for sign in Get token back from server
      const response = await axios.post('/api/signin', { email, password });
      const payload = {
        user: response.data.user,
      };
      // Dispatch admin action to authReducer
      dispatch({ type: UPLOAD_IMAGE, payload });
      return Promise.resolve();
    } catch (error) {
      dispatch(authError(UPLOAD_IMAGE, error));
    }
  };
}
