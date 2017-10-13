import axios from 'axios';
import {
  GET_LOGS_SUCCESS,
  GET_LOGS_ERROR,
  DELETE_LOGS_SUCCESS,
  DELETE_LOGS_ERROR,
  IS_FETCHING,
  IS_NOT_FETCHING,
} from './types';
import { authError } from '../../common/actions';

/**
 * Is fetching data state
 *
 * @params {String} orientation vertical or horizontal
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
 * @param {Object} obj - An object
 * @param {String} obj.token - Token string for authentication
 * @param {String} obj.queryString - Query string
 */
export function getLogs({ token, queryString }) {
  return async (dispatch) => {
    try {
      const url = `/api/logs?${queryString}`;
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
 * @param {Object} obj - An object
 * @param {String} obj.token - Token string for authentication
 * @param {String} obj.queryString - Query string
 */
export function getLogsBySearchQuery({ token, queryString }) {
  return async (dispatch) => {
    try {
      const url = `/api/logs/${queryString}`;
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
 * Delete single log by id
 *
 * @param {String} token
 * @param {String} id
 */
export function deleteLogById(token, id) {
  return async (dispatch) => {
    try {
      const url = `/api/logs/${id}`;
      const config = {
        headers: {
          authorization: token,
        },
      };

      const res = await axios.delete(url, config);
      // Dispatch GET_LOGS_SUCCESS action to logReducer
      dispatch({ type: DELETE_LOGS_SUCCESS, payload: res.data });
    } catch (error) {
      dispatch(authError(DELETE_LOGS_ERROR, error));
    }
  };
}
