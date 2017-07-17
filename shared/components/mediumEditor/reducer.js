import { STORE_IMAGE_FORM_DATA } from './types';

const initialState = {
  imagesFormData: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case STORE_IMAGE_FORM_DATA:
      return {
        ...state,
        imagesFormData: [...state.imagesFormData, action.payload],
      };
    default:
      return { ...state };
  }
}
