import { MODAL_OPEN, MODAL_CLOSE, MENU_OPEN, MENU_CLOSE, ERROR_UNKNOWN } from './types';

if (typeof window === 'undefined') {
  global.window = {};
}

const initialState = {
  modalOpen: false,
  menuOpen: !(window && window.innerWidth < 1080),
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

    case MENU_OPEN:
      return {
        ...state,
        menuOpen: true,
      };

    case MENU_CLOSE:
      return {
        ...state,
        menuOpen: false,
      };

    default:
      return { ...state };
  }
}
