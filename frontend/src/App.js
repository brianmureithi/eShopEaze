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
    <BrowserRouter >
    <div className="md:relative">
    <header className="flex md:flex-row justify-around md:py-12 mdpx-6 h-[10vh]">
 <div>
    <Link className="brand text-3xl" to ="/">ShopEazy </Link>
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
     <main className='flex w-full p-5 md:h-full z-0'>
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
    <footer className=" md:fixed md:bottom-0 w-full h-3vh text-center py-5 mt-2 ">
     <p className='text-lg font-medium'>Developed By B. Murithi with L for humanity</p> 

    </footer>
</div>
</BrowserRouter>
  );
}

export default App;
