import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_DETAILS,
  ORDER_DETAILS_ERROR,
  ORDER_PAY_DETAILS,
  ORDER_PAY_ERROR,
  ORDER_PAY_RESET,
  ORDER_LIST_DETAILS,
  ORDER_LIST_ERROR,
  ORDER_LIST_RESET,
} from '../actions/types';

export const orderCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_CREATE_SUCCESS:
      return {
        ...state,
        order: action.payload,
      };

    case ORDER_CREATE_FAIL:
      return { ...state, errorMessage: action.payload };

    default:
      return state;
  }
};

export const orderDetailsReducer = (
  state = { orderItems: [], shippingAddress: {} },
  action
) => {
  switch (action.type) {
    case ORDER_CREATE_DETAILS:
      return { ...state, order: action.payload };

    case ORDER_DETAILS_ERROR:
      return { ...state, errorMessage: action.payload };

    default:
      return state;
  }
};

export const orderPayReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_PAY_DETAILS:
      return { ...state, order: action.payload };

    case ORDER_PAY_ERROR:
      return { ...state, errorMessage: action.payload };

    case ORDER_PAY_RESET:
      return {};

    default:
      return state;
  }
};

export const orderListReducer = (state = [], action) => {
  switch (action.type) {
    case ORDER_LIST_DETAILS:
      return { ...state, orders: action.payload };

    case ORDER_LIST_ERROR:
      return { ...state, errorMessage: action.payload };

    case ORDER_LIST_RESET:
      return { ...state, orders: [] };
    default:
      return state;
  }
};
