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
  SET_USER,
  UNSET_SET_USER,
  CLEAN,
  SET_PREVIEW_USER_IMAGE,
} from './types';

const initialState = {
  isFetching: false,
  isFetchingUser: false,
  image: null,
  infoUser: null,
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
        user: null,
      };

    case SET_PREVIEW_USER_IMAGE:
      return {
        ...state,
        image: action.payload,
      };

    case SET_USER:
      return {
        ...state,
        infoUser: null,
        user: action.payload,
      };

    case UNSET_SET_USER:
      return {
        ...state,
        infoUser: null,
        user: null,
        image: null,
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
        infoUser: 'User updated',
        errorUser: null,
      };

    case UPDATE_USER_ERROR:
      return {
        ...state,
        isFetchingUser: false,
        infoUser: null,
        errorUser: action.payload,
      };

    case CREATE_USER_SUCCESS:
      return {
        ...state,
        isFetchingUser: false,
        user: action.payload,
        infoUser: 'User created',
        errorUser: null,
      };

    case CREATE_USER_ERROR:
      return {
        ...state,
        isFetchingUser: false,
        infoUser: null,
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
