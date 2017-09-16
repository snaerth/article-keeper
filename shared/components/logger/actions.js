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
 */
export function isFetchingData() {
  return { type: IS_FETCHING };
}

/**
 * Is not fetching data state
 *
 * @returns {Object}
 */
export function isNotFetchingData() {
  return { type: IS_NOT_FETCHING };
}

/**
 * Gets logs from api
 *
 * @param {String} token
 * @param {String} queryString
 */
export function getLogs({ token, queryString }) {
  return async (dispatch) => {
    try {
      const url = `/api/logs${queryString ? `?${queryString}` : ''}`;
      const config = {
        headers: {
          authorization: token,
        },
      };

      const res = await axios.get(url, config);
      // Dispatch GET_LOGS_SUCCESS action to logReducer
      dispatch({ type: GET_LOGS_SUCCESS, payload: res.data });
    } catch (error) {
      dispatch(authError(GET_LOGS_ERROR, error));
    }
  };
}

/**
 * Gets logs from api by search query
 *
 * @param {String} token
 * @param {String} queryString
 */
export function getLogsBySearchQuery(token, queryString) {
  return async (dispatch) => {
    try {
      const url = `/api/logs/search/${queryString}`;
      const config = {
        headers: {
          authorization: token,
        },
      };

      const res = await axios.get(url, config);
      // Dispatch GET_LOGS_SUCCESS action to logReducer
      dispatch({ type: GET_LOGS_SUCCESS, payload: res.data });
    } catch (error) {
      dispatch(authError(GET_LOGS_ERROR, error));
    }
  };
}
