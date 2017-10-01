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
  SET_USER,
  CLEAN,
  SET_PREVIEW_USER_IMAGE,
} from './types';

const initialState = {
  isFetching: false,
  isFetchingUser: false,
  image: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case IS_FETCHING:
      return {
        ...state,
        isFetching: true,
        error: null,
      };

    case IS_NOT_FETCHING:
      return {
        ...state,
        isFetching: false,
      };

    case CLEAN:
      return {
        ...state,
        error: null,
        image: null,
      };

    case SET_PREVIEW_USER_IMAGE:
      return {
        ...state,
        image: action.payload,
      };

    case SET_USER:
      return {
        ...state,
        user: action.payload,
      };

    case GET_USERS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        data: action.payload,
      };

    case GET_USERS_ERROR:
      return {
        ...state,
        isFetching: false,
        error: action.payload,
      };

    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        isFetchingUser: false,
        user: action.payload,
        errorUser: null,
      };

    case UPDATE_USER_ERROR:
      return {
        ...state,
        isFetchingUser: false,
        errorUser: action.payload,
      };

    case DELETE_USERS_SUCCESS:
      return {
        ...state,
        deleteStatus: action.payload,
      };

    case DELETE_USERS_ERROR:
      return {
        ...state,
        error: action.payload,
      };

    case IS_FETCHING_USER:
      return {
        ...state,
        isFetchingUser: true,
        error: null,
      };

    case IS_NOT_FETCHING_USER:
      return {
        ...state,
        isFetchingUser: false,
      };

    default:
      return {
        ...state,
        isFetching: false,
      };
  }
}
