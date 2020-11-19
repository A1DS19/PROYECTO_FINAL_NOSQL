import {
  FETCH_WISHLIST_DETAILS,
  FETCH_WISHLIST_ERROR,
  FETCH_WISHLIST_LOADING,
} from '../actions/types';

const initValues = {
  wishlist: {},
  errorMessage: '',
  loading: true,
};

export const wishlistReducer = (state = initValues, action) => {
  switch (action.type) {
    case FETCH_WISHLIST_LOADING:
      return { loading: true };

    case FETCH_WISHLIST_DETAILS:
      return { ...state, loading: false, wishlist: action.payload };

    case FETCH_WISHLIST_ERROR:
      return { ...state, errorMessage: action.payload };
    default:
      return state;
  }
};
