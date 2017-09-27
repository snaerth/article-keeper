import axios from 'axios';
import {
  GET_USERS_SUCCESS,
  GET_USERS_ERROR,
  DELETE_USERS_SUCCESS,
  DELETE_USERS_ERROR,
  UPDATE_USERS_SUCCESS,
  UPDATE_USERS_ERROR,
  IS_FETCHING,
  IS_NOT_FETCHING,
  CLEAN,
  SET_PREVIEW_USER_IMAGE,
} from './types';
import { authError } from '../../common/actions';

/**
 * Resets image and error
 *
 * @returns {Object}
 */
export function clean() {
  return { type: CLEAN };
}

/**
 * Stores user image for preview
 *
 * @param {Object} image
 * @returns {Object}
 */
export function setPreviewUserImage(image) {
  return { type: SET_PREVIEW_USER_IMAGE, payload: image };
}

/**
 * Is fetching data state
 *
 * @params {String} orientation vertical or horizontal
 * @returns {Object}
 */
export function isFetchingData(orientation) {
  return { type: IS_FETCHING, payload: orientation || 'horizontal' };
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
 * Gets users from api
 *
 * @param {String} token
 * @param {String} queryString
 */
export function getUsers({ token, queryString }) {
  return async (dispatch) => {
    try {
      const url = `/api/users${queryString ? `?${queryString}` : ''}`;
      const config = {
        headers: {
          authorization: token,
        },
      };

      const res = await axios.get(url, config);
      dispatch({ type: GET_USERS_SUCCESS, payload: res.data });
    } catch (error) {
      dispatch(authError(GET_USERS_ERROR, error));
    }
  };
}

/**
 * Gets users from api by search query
 *
 * @param {String} token
 * @param {String} queryString
 */
export function getUsersBySearchQuery(token, queryString) {
  return async (dispatch) => {
    try {
      const url = `/api/users/${queryString}`;
      const config = {
        headers: {
          authorization: token,
        },
      };

      const res = await axios.get(url, config);
      dispatch({ type: GET_USERS_SUCCESS, payload: res.data });
    } catch (error) {
      dispatch(authError(GET_USERS_ERROR, error));
    }
  };
}

/**
 * Delete single user by id
 *
 * @param {String} token
 * @param {String} id
 */
export function deleteUserById(token, id) {
  return async (dispatch) => {
    try {
      const url = `/api/users/${id}`;
      const config = {
        headers: {
          authorization: token,
        },
      };

      const res = await axios.delete(url, config);
      dispatch({ type: DELETE_USERS_SUCCESS, payload: res.data });
    } catch (error) {
      dispatch(authError(DELETE_USERS_ERROR, error));
    }
  };
}

/**
 * Updates user
 *
 * @param {String} token
 * @param {String} id
 * @param {Object} formData
 */
export function updateUser(token, id, formData) {
  return async (dispatch) => {
    try {
      const url = `/api/users/${id}`;
      const config = {
        headers: {
          authorization: token,
        },
      };

      const res = await axios.put(url, formData, config);
      dispatch({ type: UPDATE_USERS_SUCCESS, payload: res.data });
    } catch (error) {
      dispatch(authError(UPDATE_USERS_ERROR, error));
    }
  };
}
