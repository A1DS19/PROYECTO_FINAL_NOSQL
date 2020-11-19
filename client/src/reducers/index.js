import { combineReducers } from 'redux';
import { authReducer } from './Auth';
import { productsReducer, productReducer } from './Products';
import { cartReducer } from './Cart';
import {
  orderCreateReducer,
  orderDetailsReducer,
  orderPayReducer,
  orderListReducer,
} from './Order';
import { wishlistReducer } from './Wishlist';

export default combineReducers({
  auth: authReducer,
  products: productsReducer,
  product_detail: productReducer,
  cart: cartReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderList: orderListReducer,
  wishlist: wishlistReducer,
});
