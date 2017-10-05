import {
  GET_LOGS_SUCCESS,
  GET_LOGS_ERROR,
  DELETE_LOGS_SUCCESS,
  DELETE_LOGS_ERROR,
  IS_FETCHING,
  IS_NOT_FETCHING,
} from './types';

const initialState = {
  isFetching: false,
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

    case GET_LOGS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        data: action.payload,
      };

    case GET_LOGS_ERROR:
      return {
        ...state,
        isFetching: false,
        error: action.payload,
      };

    case DELETE_LOGS_SUCCESS:
      return {
        ...state,
        deleteStatus: action.payload,
      };

    case DELETE_LOGS_ERROR:
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
