import React, {useState} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import { saveShippingAddress } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';

export default function ShippingAdressScreen(props) {
    const userSignin = useSelector((state) => state.userSignin);
    const {userInfo} =userSignin;
    const cart = useSelector((state) => state.cart);
    const {shippingAddress} = cart;
    if(!userInfo){
        props.history.push('/signin');
    }

    const [fullName, setFullName] = useState(shippingAddress.fullName);
    const [address, setAddress] = useState(shippingAddress.address);
    const [city, setCity] = useState(shippingAddress.city);
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
    const [phoneNumber, setPhoneNumber] = useState(shippingAddress.phoneNumber);
    const [country, setCountry] = useState(shippingAddress.country);
    const dispatch = useDispatch();
  
    const submitHandler = (e) => {
        e.preventDefault(); 
        dispatch(saveShippingAddress({fullName, address, city, postalCode,phoneNumber,
            country}));
            props.history.push('/payment');
    };
    
    return (
        <div className='w-full'>
            <CheckoutSteps step1 step2></CheckoutSteps>
    <form className="form" onSubmit={submitHandler}>
        <div>
            <h1>Your Address</h1>
            </div>
            <div>
                <label htmlFor ="fullName">Full Name</label>
                <input type="text" 
                id="fullName"
                placeholder="Enter fullname" 
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                 required ></input>
            </div>
            <div>
                <label htmlFor ="city">Phone Number</label>
                <input type="tel" 
                pattern='[0-9]*'
                inputMode='numeric'
                id="phone"
                placeholder="Enter MPESA Number e.g 0712..." 
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                 required />
            </div>
            <div>
         
                <label htmlFor ="address">Address</label>
                <input type="text" 
                id="address"
                placeholder="Enter address" 
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                 required />
            </div>
            <div>
                <label htmlFor ="city">City</label>
                <input type="text" 
                id="city"
                placeholder="Enter city" 
                value={city}
                onChange={(e) => setCity(e.target.value)}
                 required />
            </div>
            <div>
                <label htmlFor ="postalCode">Postal Code</label>
                <input type="text" 
                id="postalCode"
                placeholder="Enter postal code" 
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                 required />
            </div>
            <div>
                <label htmlFor ="country">Country</label>
                <input type="text" 
                id="country"
                placeholder="Enter Country" 
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                 required />
            </div>
            <div>
                <label/>
                <button className="primary" type="submit">Continue</button>
            </div>
        
    </form>
        </div>
    )
}
