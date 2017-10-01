import axios from 'axios';
import {
  GET_USERS_SUCCESS,
  GET_USERS_ERROR,
  DELETE_USERS_SUCCESS,
  DELETE_USERS_ERROR,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
  IS_FETCHING,
  IS_NOT_FETCHING,
  IS_FETCHING_USER,
  IS_NOT_FETCHING_USER,
  CLEAN,
  SET_PREVIEW_USER_IMAGE,
  SET_USER,
} from './types';
import { errorHelper } from '../../common/actions';

/**
 * Set user
 *
 * @param {Object} user
 * @returns {Object}
 */
export function setUser(payload) {
  return { type: SET_USER, payload };
}

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
 * Is fetching user
 *
 * @returns {Object}
 */
export function isFetchingUser() {
  return { type: IS_FETCHING_USER };
}

/**
 * Is not fetching user
 *
 * @returns {Object}
 */
export function isNotFetchingUser() {
  return { type: IS_NOT_FETCHING_USER };
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
      const payload = errorHelper(error);
      dispatch({ type: GET_USERS_ERROR, payload });
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
      const payload = errorHelper(error);
      dispatch({ type: GET_USERS_ERROR, payload });
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
      const payload = errorHelper(error);
      dispatch({ type: DELETE_USERS_ERROR, payload });
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
      dispatch({ type: UPDATE_USER_SUCCESS, payload: res.data });
      return Promise.resolve();
    } catch (error) {
      const payload = errorHelper(error);
      dispatch({ type: UPDATE_USER_ERROR, payload });
    }
  };
}
