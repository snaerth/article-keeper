import { MODAL_OPEN, MODAL_CLOSE, ERROR_UNKNOWN } from './types';

const initialState = {
  modalOpen: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ERROR_UNKNOWN:
      return {
        ...state,
        error: action.payload,
      };

    case MODAL_OPEN:
      return {
        ...state,
        modalOpen: true,
      };

    case MODAL_CLOSE:
      return {
        ...state,
        modalOpen: false,
      };

    default:
      return { ...state };
  }
}
