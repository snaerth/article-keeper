import { GET_LOGS_SUCCESS, GET_LOGS_ERROR } from './types';

const initialState = {
  isFetching: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
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

    default:
      return { ...state };
  }
}
