import axios from 'axios';
import { UPLOAD_IMAGE, STORE_IMAGE_FORM_DATA } from './types';
import { authError } from '../../common/actions';

/**
 * Upload image to server
 *
 * @param {Object} email, password
 * @returns {undefined}
 * @author Snær Seljan Þóroddsson
 */
export function uploadImages({ formData, token }) {
  return async (dispatch) => {
    const config = {
      headers: {
        authorization: token,
      },
    };

    try {
      // Post images to server to upload images to server
      const response = await axios.post(
        '/api/uploads/images/news',
        formData,
        config,
      );

      const payload = {
        images: response.data,
      };
      // Dispatch admin action to authReducer
      dispatch({ type: UPLOAD_IMAGE, payload });
      return Promise.resolve(payload);
    } catch (error) {
      dispatch(authError(UPLOAD_IMAGE, error));
    }
  };
}

export function storeImageFormData(formData) {
  return { type: STORE_IMAGE_FORM_DATA, payload: formData };
}
