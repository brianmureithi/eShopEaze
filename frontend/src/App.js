import React from 'react';
import './App.css';
import {useSelector,useDispatch} from 'react-redux';
import {BrowserRouter, Link, Route} from 'react-router-dom';
import { signout } from './actions/userActions';
import AddProductScreen from './screens/AddProductScreen';
import CartScreen from './screens/CartScreen';
import HomeScreen from './screens/HomeScreen';
import OrderScreen from './screens/OrderScreen';
import PaymentMethodScreen from './screens/PaymentMethodScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import ProductScreen from './screens/ProductScreen';
import RegisterScreen from './screens/RegisterScreen';
import ShippingAdressScreen from './screens/ShippingAdressScreen';
import SigninScreen from './screens/SigninScreen';

function App() {
  const cart = useSelector(state => state.cart);
  const {cartItems} = cart;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } =userSignin;
  const dispatch = useDispatch();

  const signoutHandler = () => {
    dispatch(signout());

  };
  return (
    <BrowserRouter>
    <div className="grid-container ">
    <header className="row">
 <div>
    <Link className="brand text-3xl" to ="/">Eazyshop </Link>
</div>
<div>
  <Link to="/cart">Cart{
    cartItems.length>0 &&(
    <span className="badge">{cartItems.length}</span>
    )
  }</Link>
   { 
     userInfo ? (
       <div className="dropdown">
       <Link to='#'>{userInfo.name}{' '}
       <i className="fa fa-caret-down"></i></Link>
       <ul className="dropdown-content">
         <Link to="#signout" onClick={signoutHandler}>Sign out</Link>
       </ul>
       </ div>
):(
      <Link to="/signin" >Sign In</Link>
     ) 
   }

</div>
    </header>
     <main>
     <Route path="/cart/:id?" component={CartScreen}></Route>
       <Route path="/product/:id" component={ProductScreen}></Route>
       <Route path="/signin" component={SigninScreen}></Route>
       <Route path="/register" component={RegisterScreen}></Route>
       <Route path="/shipping" component={ShippingAdressScreen}></Route>
       <Route path="/payment" component={PaymentMethodScreen}></Route>
       <Route path="/placeorder" component={PlaceOrderScreen}></Route>
       <Route path="/order/:id" component={OrderScreen}></Route> 
       <Route path="/products" component={AddProductScreen}></Route>
       <Route path="/" component ={HomeScreen} exact></Route> 
    </main>
    <footer className="row center">
        This Website has been designed by Brian Murithi &copy; 2020

    </footer>
</div>
</BrowserRouter>
  );
}

export default App;
