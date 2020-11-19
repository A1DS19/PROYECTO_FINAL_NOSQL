import './css/app.css';
import React from 'react';
import { useHistory } from 'react-router';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//Components
import Signup from './auth/Signup';
import Signin from './auth/Signin';
import Navbar from './resources/Navbar';
import Index from './Index';
import ProductScreen from './product/ProductScreen';
import Cart from './product/Cart';
import Shipping from './product/Shipping';
import PaymentMethod from './product/PaymentMethod';
import PlaceOrder from './product/PlaceOrder';
import Order from './product/Order';
import MyOrders from './product/MyOrders';
import MyWishlist from './product/MyWishlist';
import UpdateUserData from '../components/userData/updateUserData';
import NotFound from './resources/NotFound';

function App() {
  const history = useHistory();
  return (
    <BrowserRouter>
      <ToastContainer />
      <Navbar />
      <div className='container'>
        <Switch>
          <Route exact path='/' history={history} component={Index} />
          <Route exact path='/auth/signup' component={Signup} history={history} />
          <Route exact path='/auth/signin' component={Signin} history={history} />
          <Route path='/product/:id' component={ProductScreen} />
          <Route path='/cart/:id?' component={Cart} />
          <Route path='/shipping' component={Shipping} />
          <Route path='/payment' component={PaymentMethod} />
          <Route path='/placeorder' component={PlaceOrder} />
          <Route path='/order/:id' component={Order} />
          <Route path='/myorders/:id' component={MyOrders} />
          <Route path='/wishlist/:id' component={MyWishlist} />
          <Route path='/myprofile/:id' component={UpdateUserData} />
          <Route exact path='*' component={NotFound} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
