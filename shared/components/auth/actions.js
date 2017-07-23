import axios from 'axios';
import {
  AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR,
  SIGNUP_USER,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_ERROR,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_ERROR,
  SET_PREVIEW_USER_IMAGE,
  USER_UPDATED,
  IS_FETCHING,
  MODAL_OPEN,
  MODAL_CLOSE,
  CLEAN,
} from './types';
import { authError } from '../../common/actions';

/**
 * Is fetching data state
 *
 * @returns {Object}
 * @author Snær Seljan Þóroddsson
 */
export function isFetching() {
  return { type: IS_FETCHING };
}

/**
 * Stores user image for preview
 *
 * @param {Object} image
 * @returns {Object}
 * @author Snær Seljan Þóroddsson
 */
export function setPreviewUserImage(image) {
  return { type: SET_PREVIEW_USER_IMAGE, payload: image };
}

/**
 * Post request made to api with email and passwod
 * Stores token in localStorage if response success and dispatches action AUTH_USER
 * if auth error dispatch error auth
 *
 * @param {Object} email, password
 * @returns {undefined}
 * @author Snær Seljan Þóroddsson
 */
export function signinUser({ email, password }) {
  return async (dispatch) => {
    try {
      // Post email/password to api server for sign in Get token back from server
      const response = await axios.post('/api/signin', { email, password });
      const payload = {
        user: response.data,
      };

      // Dispatch api action to authReducer
      dispatch({ type: AUTH_USER, payload });
      // Save token to localStorage
      localStorage.setItem('user', JSON.stringify(response.data));
      return Promise.resolve();
    } catch (error) {
      dispatch(authError(AUTH_ERROR, error));
    }
  };
}

/**
 * Signup Post request
 * Post request to /api/signup to signup user
 * Post request to /api/userimage to save user image
 * Stores token in localStorage if response success and dispatches action AUTH_USER
 * if auth error dispatch error auth
 *
 * @param {Object} email, password, name, formData
 * @returns {undefined}
 * @author Snær Seljan Þóroddsson
 */
export function signupUser({ email, password, name, formData }) {
  return async (dispatch) => {
    try {
      // Post email/password to api server to register user Get token back from server
      const response = await axios.post('/api/signup', {
        email,
        password,
        name,
      });
      const payload = {
        user: response.data,
      };

      // Dispatch api action to authReducer
      dispatch({ type: SIGNUP_USER, payload });
      // Reroute user to home page
      if (!formData) {
        // Save token to localStorage
        localStorage.setItem('user', JSON.stringify(response.data));
        return Promise.resolve();
      }

      const config = {
        headers: {
          authorization: response.data.token,
        },
      };

      const res = await axios.post('/api/userimage', formData, config);
      // Dispatch USER_UPDATED action to authReducer
      dispatch({ type: USER_UPDATED, payload: res.data });
      // Save token to localStorage
      localStorage.setItem('user', {
        user: JSON.stringify(res.data),
      });

      return Promise.resolve();
    } catch (error) {
      dispatch(authError(AUTH_ERROR, error));
    }
  };
}

/**
 * Add user image to user
 * Post request to /api/userimage to save user image
 * if success dispatch action ADD_USER_IMAGE_SUCCESS
 * if auth error dispatch error auth
 *
 * @param {Object} formData
 * @param {String} token
 * @returns {undefined}
 * @author Snær Seljan Þóroddsson
 */
export function addUserImage(formData, token) {
  return async (dispatch) => {
    const config = {
      headers: {
        authorization: token,
      },
    };

    try {
      const response = await axios.post('/api/userimage', formData, config);
      // Dispatch USER_UPDATED action to authReducer
      dispatch({ type: USER_UPDATED, payload: response.data });
      // Save token to localStorage
      localStorage.setItem('user', { user: JSON.stringify(response.data) });
    } catch (error) {
      dispatch(authError(AUTH_ERROR, error));
    }
  };
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

/**
 * Resets image and error for auth
 *
 * @returns {Object}
 * @author Snær Seljan Þóroddsson
 */
export function clean() {
  return { type: CLEAN };
}

/**
 * Signs out user and removes token key from localStorage
 *
 * @returns {Object} action
 * @author Snær Seljan Þóroddsson
 */
export function signoutUser() {
  return async (dispatch) => {
    try {
      // Post email to api server to retreive new password
      const response = await axios.get('/api/signout');
      await axios.get('/signout');
      localStorage.removeItem('user');
      dispatch({ type: UNAUTH_USER, payload: response.data });
    } catch (error) {
      dispatch(authError(AUTH_ERROR, error));
    }
  };
}

/**
 * Forgot password
 *
 * @param {String} email
 * @returns {undefined}
 * @author Snær Seljan Þóroddsson
 */
export function forgotPassword({ email }) {
  return async (dispatch) => {
    try {
      // Post email to api server to retreive new password
      const response = await axios.post('/api/forgot', { email });
      dispatch({ type: FORGOT_PASSWORD_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch(authError(FORGOT_PASSWORD_ERROR, error));
    }
  };
}

/**
 * Reset password
 *
 * @param {String} password
 * @returns {undefined}
 * @author Snær Seljan Þóroddsson
 */
export function resetPassword({ password, token }) {
  return async (dispatch) => {
    try {
      // Post email to api server to retreive new password
      const response = await axios.post(`/api/reset/${token}`, { password });

      if (!response.data.error) {
        dispatch({
          type: RESET_PASSWORD_SUCCESS,
          payload: response.data.message,
        });
      } else {
        const error = {
          response,
        };
        dispatch(authError(RESET_PASSWORD_ERROR, error));
      }
    } catch (error) {
      dispatch(authError(RESET_PASSWORD_ERROR, error));
    }
  };
}
