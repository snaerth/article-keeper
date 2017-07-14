import { UPLOAD_IMAGE } from './types';

export default function (state = {}, action) {
  switch (action.type) {
    case UPLOAD_IMAGE:
      return {
        ...state,
      };

    default:
      return { ...state };
  }
}
