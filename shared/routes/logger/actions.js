import axios from 'axios';
import {
  GET_LOGS_SUCCESS,
  GET_LOGS_ERROR,
  IS_FETCHING,
  IS_NOT_FETCHING,
} from './types';
import { authError } from '../../common/actions';

/**
 * Is fetching data state
 *
 * @returns {Object}
 * @author Snær Seljan Þóroddsson
 */
export function isFetchingData() {
  return { type: IS_FETCHING };
}

/**
 * Is not fetching data state
 *
 * @returns {Object}
 * @author Snær Seljan Þóroddsson
 */
export function isNotFetchingData() {
  return { type: IS_NOT_FETCHING };
}

/**
 * Gets logs from database
 *
 * @param {String} token
 * @param {Object} formData
 * @returns {*}
 */
export function getLogs({ token, formData }) {
  return async (dispatch) => {
    try {
      const config = {
        headers: {
          authorization: token,
        },
      };

      const res = await axios.post('/api/logs', formData, config);
      // Dispatch GET_LOGS_SUCCESS action to logReducer
      dispatch({ type: GET_LOGS_SUCCESS, payload: res.data });
    } catch (error) {
      dispatch(authError(GET_LOGS_ERROR, error));
    }
  };
}
