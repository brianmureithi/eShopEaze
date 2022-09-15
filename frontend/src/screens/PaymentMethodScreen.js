import React, {useState} from 'react';
import CheckoutSteps from '../components/CheckoutSteps';
import {useDispatch,useSelector} from 'react-redux';
import { savePaymentMethod } from '../actions/cartActions';


export default function PaymentMethodScreen(props) {
    const cart = useSelector((state) => state.cart);
    const {shippingAddress} =cart;
   const userSignin = useSelector((state) => state.userSignin);
    const {userInfo} =userSignin;
    if(!userInfo){
        props.history.push('/signin');

    }
    
    if(!shippingAddress.address){
        props.history.push('/shipping');

    }
    

    const [paymentMethod, setPaymentMethod] = useState('mpesa');
    const dispatch =useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod));
        props.history.push('/placeorder');
    }
    return (
        <div className='w-full'>
            <CheckoutSteps step1 step2 step3 ></CheckoutSteps>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>Payment Method</h1>
                </div>
                <div>
                    <div>
                    <input 
                    type="radio" 
                    id="mpesa" 
                    value="mpesa"
                     name="paymentMethod"
                     checked 
                    
                    onChange={(e) => setPaymentMethod(e.target.value)}>
                    </input>
                    <label htmlFor="mpesa">Mpesa</label>
                </div>
                </div>
                <div>
                    <div>
                
                    <input 
                    type="radio" 
                    id="paypal" 
                    value="paypal"
                     name="paymentMethod"
                  
                   
                    onChange={(e) => setPaymentMethod(e.target.value)}>
                    </input>
                    <label htmlFor="paypal">Paypal</label>
                    </div>
                </div>
              
               
                <div>
                 <button className="primary" type="submit">
                     Continue
                 </button>
                </div>
            </form>
            
        </div>
    )
}
