import { AUTH_ERROR, AUTH_USER, AUTH_CURRENT_USER } from '../actions/types';

const INITIAL_STATE = {
  authenticated: null,
  currentUser: null,
  errorMessage: null,
};

export const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AUTH_USER:
      return { ...state, authenticated: action.payload };
    case AUTH_CURRENT_USER:
      return { ...state, currentUser: action.payload };
    case AUTH_ERROR:
      return { ...state, errorMessage: action.payload };
    default:
      return state;
  }
};
