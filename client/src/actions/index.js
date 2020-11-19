import {
  AUTH_USER,
  AUTH_ERROR,
  AUTH_CURRENT_USER,
  FETCH_PRODUCTS,
  PRODUCTS_ERROR,
  FETCH_PRODUCT,
  PRODUCT_ERROR,
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD,
  ORDER_CREATE_FAIL,
  ORDER_CREATE_SUCCESS,
  ORDER_DETAILS_ERROR,
  ORDER_CREATE_DETAILS,
  ORDER_PAY_DETAILS,
  ORDER_PAY_ERROR,
  ORDER_LIST_DETAILS,
  ORDER_LIST_ERROR,
  ORDER_LIST_RESET,
  FETCH_WISHLIST_DETAILS,
  FETCH_WISHLIST_ERROR,
  FETCH_WISHLIST_LOADING,
} from './types';
import { instance as axios } from './axiosConfig';
import jwt_decode from 'jwt-decode';

//Auth
export const signup = (formvalues, callback) => {
  return async (dispatch) => {
    try {
      const res = await axios.post('/api/auth/signup', formvalues);
      dispatch({ type: AUTH_USER, payload: res.data.token });
      localStorage.setItem('token', res.data.token);
      callback();
      dispatch({ type: AUTH_ERROR, payload: null });
    } catch (error) {
      dispatch({ type: AUTH_ERROR, payload: error.response.data.errors });
    }
  };
};

export const signin = (formvalues, callback) => {
  return async (dispatch) => {
    try {
      const res = await axios.post('/api/auth/signin', formvalues);
      dispatch({ type: AUTH_USER, payload: res.data.token });
      localStorage.setItem('token', res.data.token);
      callback();
      dispatch({ type: AUTH_ERROR, payload: null });
    } catch (error) {
      dispatch({ type: AUTH_ERROR, payload: error.response.data.errors });
    }
  };
};

export const updateUserData = (id, formvalues, callback) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.put(`/api/auth/update/${id}`, formvalues);
      dispatch({ type: AUTH_USER, payload: data });
      callback();
    } catch (error) {
      dispatch({ type: AUTH_ERROR, payload: error.response.data.error });
    }
  };
};

export const signout = () => {
  return (dispatch) => {
    dispatch({ type: AUTH_USER, payload: null });
    dispatch({ type: AUTH_CURRENT_USER, payload: null });
    dispatch({ type: ORDER_LIST_RESET });
    localStorage.removeItem('token');
  };
};
//Auth Fin

//User

//Decode token
export const fetch_currentUser = () => {
  return (dispatch) => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedJWT = jwt_decode(token);
      dispatch({ type: AUTH_CURRENT_USER, payload: decodedJWT });
    }
  };
};
//User Fin
//Products Inicio
export const fetch_products = () => {
  return async (dispatch) => {
    try {
      const res = await axios.get('/api/products/');
      dispatch({ type: FETCH_PRODUCTS, payload: res.data });
    } catch (error) {
      dispatch({ type: PRODUCTS_ERROR, payload: error.response.data });
    }
  };
};

export const fetch_product = (id) => {
  return async (dispatch) => {
    try {
      const res = await axios.get(`/api/products/id/${id}`);
      dispatch({ type: FETCH_PRODUCT, payload: res.data });
    } catch (error) {
      dispatch({ type: PRODUCT_ERROR, payload: error.response.data });
    }
  };
};
//Products Fin

//Cart inicio
export const addToCart = (id, qty) => {
  return async (dispatch, getState) => {
    try {
      const { data } = await axios.get(`/api/products/id/${id}`);
      dispatch({
        type: CART_ADD_ITEM,
        payload: {
          product: data.product._id,
          title: data.product.title,
          imagePath: data.product.imagePath,
          price: data.product.price,
          countInStock: data.product.countInStock,
          qty,
        },
      });
      localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
    } catch (error) {
      console.log(error);
    }
  };
};

export const removeFromCart = (id) => {
  return (dispatch, getState) => {
    dispatch({ type: CART_REMOVE_ITEM, payload: id });

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
  };
};

export const saveShippingAddress = (formValues, callback) => {
  return (dispatch) => {
    dispatch({ type: CART_SAVE_SHIPPING_ADDRESS, payload: formValues });
    localStorage.setItem('shippingAddress', JSON.stringify(formValues));
    callback();
  };
};

export const savePaymentMethod = (formValues, callback) => {
  return (dispatch) => {
    dispatch({ type: CART_SAVE_PAYMENT_METHOD, payload: formValues });
    localStorage.setItem('paymentMethod', JSON.stringify(formValues));
    callback();
  };
};
//Orders Inicio
export const createOrder = (formvalues, callback) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post('/api/orders/', formvalues);
      dispatch({ type: ORDER_CREATE_SUCCESS, payload: data });
      callback(data.createdOrder._id);
    } catch (error) {
      console.log(error);
      dispatch({ type: ORDER_CREATE_FAIL, payload: error.response });
    }
  };
};

export const fetchOrderDetails = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/orders/${id}`);
      dispatch({ type: ORDER_CREATE_DETAILS, payload: data });
    } catch (error) {
      console.log(error.response);
      dispatch({ type: ORDER_DETAILS_ERROR, payload: error.response });
    }
  };
};

export const payOrder = (orderId, paymentResult) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.put(`/api/orders/${orderId}/pay`, paymentResult);
      console.log(data);
      dispatch({ type: ORDER_PAY_DETAILS, payload: data });
    } catch (error) {
      console.log(error.response);
      dispatch({ type: ORDER_PAY_ERROR, payload: error.response });
    }
  };
};

export const fetchOrders = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/orders/myorders/${id}`);
      dispatch({ type: ORDER_LIST_DETAILS, payload: data });
    } catch (error) {
      dispatch({ type: ORDER_LIST_ERROR, payload: error.response.data.error });
    }
  };
};
//Order Fin
//Wishlist Inicio
export const addToWishlist = (id, wishlistItem, status) => {
  wishlistItem.product = wishlistItem._id;
  wishlistItem.status = status;
  return async (dispatch) => {
    try {
      const { data } = await axios.post(`/api/wishlist/add/${id}`, {
        wishlistItem,
      });
      dispatch({ type: FETCH_WISHLIST_DETAILS, payload: data });
    } catch (error) {
      dispatch({ type: FETCH_WISHLIST_ERROR, payload: error.response.data.error });
    }
  };
};

export const getWishlist = (id) => {
  return async (dispatch) => {
    try {
      dispatch({ type: FETCH_WISHLIST_LOADING });
      const { data } = await axios.get(`/api/wishlist/${id}`);
      dispatch({ type: FETCH_WISHLIST_DETAILS, payload: data });
    } catch (error) {
      dispatch({ type: FETCH_WISHLIST_ERROR, payload: error.response.data.error });
    }
  };
};

export const delItemWishlist = (userid, productid) => {
  return async (dispatch) => {
    try {
      dispatch({ type: FETCH_WISHLIST_LOADING });
      const { data } = await axios.put(`/api/wishlist/${userid}/${productid}`);
      dispatch({ type: FETCH_WISHLIST_DETAILS, payload: data });
    } catch (error) {
      dispatch({ type: FETCH_WISHLIST_ERROR, payload: error.response.data.error });
    }
  };
};
