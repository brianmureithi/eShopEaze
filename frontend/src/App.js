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
    <div className=" md:relative relative min-h-full">
    <header className=" flex  md:flex-row justify-between px-2 py-10 md:justify-around  md:py-12 md:px-6 h-[10vh]">
 <div>
    <Link className="font-medium md:font-extrabold text-5xl text-slate-200  md:text-4xl tracking-wider  " to ="/">ShopEazy </Link>
</div>
<div>
  <Link to="/cart" className='text-2xl font-normal text-slate-100'>Cart{
    cartItems.length>0 &&( 
    <span className="rounded-[500%]  text-xl py-[0.2rem] px-[0.7rem] ml-2  shadow-lg bg-red-600  ">{cartItems.length}</span>
    )
  }</Link>
   { 
     userInfo ? (
       <div className="dropdown" >
       <Link to='#' className='text-2xl font-normal text-slate-100 '>{userInfo.name}{' '}
       <i className="fa fa-caret-down "></i></Link>
       <ul className="dropdown-content">
         <Link to="#signout" onClick={signoutHandler} className='text-2xl font-normal text-slate-100 '>Sign out</Link>
       </ul>
       </ div>
):(
      <Link to="/signin" >Sign In</Link>
     ) 
   }

</div>
    </header>
     <main className='flex w-full px-5 pt-3 py-[4rem] md:h-full z-0'>
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
    <footer className="absolute bottom-0   w-full h-[4rem] text-center py-5 mt-2 ">
     <p className='text-xl font-normal'>Developed By B. Murithi with L for humanity</p> 

    </footer>
</div>
</BrowserRouter>
  );
}

export default App;
