import {
  GET_USERS_SUCCESS,
  GET_USERS_ERROR,
  DELETE_USERS_SUCCESS,
  DELETE_USERS_ERROR,
  IS_FETCHING,
  IS_NOT_FETCHING,
} from './types';

const initialState = {
  isFetching: false,
  orientation: 'horizontal',
};

export default function (state = initialState, action) {
  switch (action.type) {
    case IS_FETCHING:
      return {
        ...state,
        isFetching: true,
        orientation: action.payload,
        error: null,
      };

    case IS_NOT_FETCHING:
      return {
        ...state,
        isFetching: false,
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

    default:
      return {
        ...state,
        isFetching: false,
      };
  }
}
