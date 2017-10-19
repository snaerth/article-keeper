import axios from 'axios';
import {
  GET_USERS_SUCCESS,
  GET_USERS_ERROR,
  DELETE_USERS_SUCCESS,
  DELETE_USERS_ERROR,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
  CREATE_USER_SUCCESS,
  CREATE_USER_ERROR,
  IS_FETCHING,
  IS_NOT_FETCHING,
  IS_FETCHING_USER,
  IS_NOT_FETCHING_USER,
  CLEAN,
  SET_PREVIEW_USER_IMAGE,
  SET_USER,
  UNSET_SET_USER,
} from './types';
import { USER_UPDATED } from '../auth/types';
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
 * Unset user
 *
 * @returns {Object}
 */
export function unsetUser() {
  return { type: UNSET_SET_USER };
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
 * @param {Object} obj - An object
 * @param {String} obj.token - Token string for authentication
 * @param {String} obj.queryString - Query string
 */
export function getUsersBySearchQuery({ token, queryString }) {
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
 * @param {Object} data - Form post data
 * @param {Object} imageFormData - Image formData
 * @param {String=} type
 */
export function updateUser(token, id, data, imageFormData, type) {
  return async (dispatch) => {
    try {
      const url = `/api/users/${id}`;
      const config = {
        headers: {
          authorization: token,
        },
      };

      // Update user
      const res = await axios.put(url, data, config);

      if (imageFormData) {
        // Update userimage
        const imageRes = await axios.post('/api/users/userimage', imageFormData, config);
        dispatch({ type: UPDATE_USER_SUCCESS, payload: imageRes.data });

        if (type === 'profile') {
          // Save token to localStorage
          localStorage.setItem('user', {
            user: JSON.stringify(imageRes.data),
          });
          dispatch({ type: USER_UPDATED, payload: { user: imageRes.data } });
        }
      } else {
        dispatch({ type: UPDATE_USER_SUCCESS, payload: { user: res.data } });

        if (type === 'profile') {
          // Save token to localStorage
          localStorage.setItem('user', {
            user: JSON.stringify(res.data),
          });
          dispatch({ type: USER_UPDATED, payload: { user: res.data } });
        }
      }

      return Promise.resolve('User updated');
    } catch (error) {
      const payload = errorHelper(error);
      dispatch({ type: UPDATE_USER_ERROR, payload });
    }
  };
}

/**
 * Creates new user
 *
 * @param {String} token
 * @param {Object} data - Form post data
 * @param {Object} imageFormData - Image formData
 */
export function createUser(token, data, imageFormData) {
  return async (dispatch) => {
    try {
      const url = '/api/users/';
      const config = {
        headers: {
          authorization: token,
        },
      };

      // Create user
      const res = await axios.post(url, data, config);

      if (imageFormData) {
        // Upload userimage
        const imageRes = await axios.post('/api/users/userimage', imageFormData, config);
        dispatch({ type: CREATE_USER_SUCCESS, payload: imageRes.data });
      } else {
        dispatch({ type: CREATE_USER_SUCCESS, payload: res.data });
      }

      return Promise.resolve('User updated');
    } catch (error) {
      const payload = errorHelper(error);
      dispatch({ type: CREATE_USER_ERROR, payload });
    }
  };
}
