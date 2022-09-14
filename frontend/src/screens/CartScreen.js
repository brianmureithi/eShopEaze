import React,{useEffect} from 'react'
import { addToCart, removeFromCart } from '../actions/cartActions';
import {useDispatch,useSelector} from 'react-redux';
import MessageBox from '../components/MessageBox';
import { Link } from 'react-router-dom';

export default function CartScreen(props) {

    const productId =props.match.params.id;
    const qty =props.location.search? Number(props.location.search.split('=')[1]):1;
    const cart =useSelector((state) =>state.cart);
    const{cartItems} = cart;
 
    const dispatch =useDispatch();
    useEffect(()  =>{
     if(productId){
         dispatch(addToCart(productId,qty));
     } 

  },[dispatch, productId, qty]);

  const removeFromCartHandler =(id) =>{ 
      dispatch(removeFromCart(id));
       
  };
  const checkOutHandler =()=> {
      props.history.push('/signin?redirect=shipping');
  }
    return (
        
        <div className="flex flex-col md:flex-row justify-between w-full">
            
            <div className="w-full md:w-3/4">
                <h1>Cart</h1>
     {cartItems.length === 0 ? <MessageBox>
         Cart is empty. <Link to="/">Start Shopping </Link>
     </MessageBox>:
     (
         <ul className=''>
             {
                 cartItems.map((item)=>(
                     <li key={item.product}>
                         <div className=" flex flex-row justify-between flex-wrap border p-2"> 
                         <div>
                             <img src={item.image} alt={item.name} className="small"></img>
                         </div>
                         <div className="w-1/2 py-5 md:w-max">
                             <Link className='text-2xl font-semibold' to={`/product/${item.product}`}>
                                 {item.name}
                             </Link>
                         </div>
                         <div className='w-1/2 mt-3  md:w-max'>
                        <select value={item.qty} 
                        onChange={e=> dispatch(
                            addToCart(item.product,Number(e.target.value))
                         )}>
                               {
                            [...Array(item.countInStock).keys()].map(x=>(
                                                 <option key={x+1}  value={x+1}>{x+1}</option>
                                             ))
                                         }
                            </select>   
                         </div>
                         <div className='w-1/4 py-5  md:w-max md:font-semibold'>
                           kes {item.price}     
                         </div>
                         <div className='w-1/4  '>
                             <button type="button" className='hover:bg-red-500 hover:text-white hover:border-none transition ease-in-out hover:scale-90'onClick={() => removeFromCartHandler(item.product)}>
                                 Delete
                             </button>
                         </div>
                         </div>
                     </li>
                 ))
             }
         </ul>
     )}           

            </div>
            <div className="mt-4 md:w-1/4">
                <div className="card card-body">
                    <ul>
                        <li>
            <h2>SubTotal <span className='text-xl font-black text-gray-700'>({cartItems.reduce((a, c) => a + c.qty, 0)} items)</span>: 
            kes {cartItems.reduce((a, c) => a + c.price * c.qty, 0)}</h2>
                        </li>
                        <li>
                       <button type="button" 
                       onClick={checkOutHandler} 
                       className="primary block" 
                       disabled={cartItems.length ===0}>
                           Proceed to CheckOut
                       </button>
                        </li>
                    </ul>
                   
                <Link to="/">Back to Home</Link>
               
                </div>
                
                
            </div>
           </div>
    );
}
