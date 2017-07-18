import { STORE_IMAGE_FORM_DATA } from './types';

const initialState = {
  formData: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case STORE_IMAGE_FORM_DATA:
      return {
        ...state,
        formData: action.payload,
      };
    default:
      return { ...state };
  }
}
