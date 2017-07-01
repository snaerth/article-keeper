import axios from 'axios';
import { browserHistory } from 'react-router-dom';
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
 * Post request made to admin with email and passwod
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
      // Post email/password to admin server for sign in Get token back from server
      const response = await axios.post('/admin/signin', { email, password });
      const payload = {
        user: response.data.user,
      };
      // Dispatch admin action to authReducer
      dispatch({ type: AUTH_USER, payload });
      // Save token to localStorage
      localStorage.setItem('user', JSON.stringify(response.data));
      // Reroute user to home page
      browserHistory.push('/');
    } catch (error) {
      dispatch(authError(AUTH_ERROR, error));
    }
  };
}

/**
 * Facebook sign in
 *
 * @returns {undefined}
 * @author Snær Seljan Þóroddsson
 */
export function signinFacebook() {
  return async (dispatch) => {
    try {
      const response = await axios.get('/admin/facebook');
      const payload = response.data; // eslint-disable-line
    } catch (error) {
      dispatch(authError(AUTH_ERROR, error));
    }
  };
}

/**
 * Signup Post request
 * Post request to /admin/signup to signup user
 * Post request to /admin/userimage to save user image
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
      // Post email/password to admin server to register user Get token back from server
      const response = await axios.post('/admin/signup', {
        email,
        password,
        name,
      });
      const payload = {
        user: response.data,
      };

      // Save token to localStorage
      localStorage.setItem('user', JSON.stringify(response.data));
      // Dispatch admin action to authReducer
      dispatch({ type: SIGNUP_USER, payload });
      // Reroute user to home page
      if (!formData) {
        // Reroute user to profile page
        browserHistory.push('/profile');
      }

      if (formData) {
        const config = {
          headers: {
            authorization: response.data.token,
          },
        };

        const res = await axios.post('/admin/userimage', formData, config);
        // Dispatch USER_UPDATED action to authReducer
        dispatch({ type: USER_UPDATED, payload: res.data });
        // Save token to localStorage
        localStorage.setItem('user', {
          user: JSON.stringify(res.data),
        });

        // Reroute user to profile page
        browserHistory.push('/profile');
      }
    } catch (error) {
      dispatch(authError(AUTH_ERROR, error));
    }
  };
}

/**
 * Add user image to user
 * Post request to /admin/userimage to save user image
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
      const response = await axios.post('/admin/userimage', formData, config);
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
 * Signs out user
 * Removes token key from localStorage
 *
 * @returns {Object} action
 * @author Snær Seljan Þóroddsson
 */
export function signoutUser() {
  localStorage.removeItem('user');

  return { type: UNAUTH_USER };
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
      // Post email to admin server to retreive new password
      const response = await axios.post('/admin/forgot', { email });
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
      // Post email to admin server to retreive new password
      const response = await axios.post(`/admin/reset/${token}`, { password });

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
