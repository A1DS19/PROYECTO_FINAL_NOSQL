import {
  FETCH_PRODUCTS,
  PRODUCTS_ERROR,
  FETCH_PRODUCT,
  PRODUCT_ERROR,
} from '../actions/types';

const productsInitValues = {
  products: [],
  errorMessage: '',
};

const productDetailInitValues = {
  product: { reviews: [] },
  errorMessage: '',
};

export const productsReducer = (state = productsInitValues, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS:
      return { ...state, products: action.payload };

    case PRODUCTS_ERROR:
      return { ...state, errorMessage: action.payload };

    default:
      return state;
  }
};

export const productReducer = (state = productDetailInitValues, action) => {
  switch (action.type) {
    case FETCH_PRODUCT:
      return { ...state, product: action.payload };

    case PRODUCT_ERROR:
      return { ...state, errorMessage: action.payload };

    default:
      return state;
  }
};
