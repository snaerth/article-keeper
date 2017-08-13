import { GET_LOGS_SUCCESS, GET_LOGS_ERROR } from './types';

export default function (state = {}, action) {
  switch (action.type) {
    case GET_LOGS_SUCCESS:
      return {
        ...state,
        isFetching: true,
        data: action.payload,
      };

    case GET_LOGS_ERROR:
      return {
        ...state,
        isFetching: false,
        error: action.payload,
      };

    default:
      return { ...state };
  }
}
