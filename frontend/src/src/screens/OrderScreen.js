import Axios from 'axios';
import {PayPalButton} from 'react-paypal-button-v2';
import React, {useEffect,useState} from 'react';
import {useSelector} from 'react-redux';
import { Link } from 'react-router-dom';
import {useDispatch} from 'react-redux';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { detailsOrder } from '../actions/orderActions';

  

export default function OrderScreen(props) {
 const orderId = props.match.params.id;
 const [sdkReady,setSdkReady] = useState(false);
const orderDetails= useSelector((state) => state.orderDetails);
const {order, loading, error} =orderDetails;
const dispatch = useDispatch();
const userSignin = useSelector((state) => state.userSignin);
const {userInfo} =userSignin;
if(!userInfo){
    props.history.push('/signin');

}



    useEffect(() => {
        const addPayPalScript = async () => {
            const { data } = await Axios.get('/api/config/paypal');
            const script = document.createElement('script');
            script.type='text/javascript';
            script.src=`https://www.paypal.com/sdk/js?client-id=${data}`;
            script.async = true;
            script.onload= () => {
                setSdkReady(true);
            };
            document.body.appendChild(script);


        };
        if(!order) {
            dispatch(detailsOrder(orderId));

        }else{
            if(!order.isPaid){
                if(!window.paypal){
                    addPayPalScript();
                }else{
                    setSdkReady(true);
                }
            }
        }
                },[dispatch, orderId, order, sdkReady]);

        
                const successPaymentHandler = () =>{

                }
    return loading? (<LoadingBox></LoadingBox>):
    error? (<MessageBox variant="danger">{error}</MessageBox>):
    (
        <div>
            <div> <h1>Order: {order._id} </h1></div>
           
           
        <div className="row top">
            <div className="col-2">
                <ul>
                    <li>
                        <div className="card card-body">
                            <h2>Shipping</h2>
                            <p>
            <strong>Name:</strong> {order.shippingAddress.fullName} <br/>
            <strong>Address:</strong> {order.shippingAddress.address},
            {order.shippingAddress.city},
            {order.shippingAddress.postalCode},
            {order.shippingAddress.country}
    </p>
    {order.isDelivered? <MessageBox variant="success"> Delivered on 
    {order.deliveredAt}</MessageBox>:
    <MessageBox variant="danger">Not Delivered Yet</MessageBox>
    } 

       </div>
     </li>
          <li>
        <div className="card card-body">
         
              <p>
            <strong>Payment method: </strong>{order.paymentMethod} 
            
          </p>
{order.isPaid ? <MessageBox variant="success">Paid on {
    order.paidAt
}</MessageBox>: <MessageBox variant="danger">Not Paid for yet</MessageBox>}
               </div>
                    </li>
                    <li>
                 <div className="card card-body">
                   <h2>Items</h2>
                   <ul>
             {
                order.orderItems.map((item)=>(
                     <li key={item.product}>
                         <div className="row"> 
                         <div>
                        <img src={item.image} alt={item.name} className="small"></img>
                         </div>
                         <div className="min-30">
                     <Link to={`/product/${item.product}`}>
                     {item.name}
                     </Link>
                    </div>
                     <div>
                  {item.qty} x sh{item.price} = sh{item.qty * item.price}   
              </div>
                       
            </div>
             </li>
                 ))
             }
         </ul>
               
                    </div>
                    </li>
                </ul>


            </div>
            <div className="col-1">
                <div className= "card card-body">
                    <ul>
                        <li>
                            <h2>Cost Summary</h2>   
                        </li>
                        
                    <li>
                        <div className="row">
                            <div>Items sub-total</div>
                             <div>sh{order.itemsPrice.toFixed(2)}</div>

                        </div>
                    </li>
                    <li>
                        <div className="row">
                            <div>Shipping</div>
                             <div>sh{order.shippingPrice.toFixed(2)}</div>

                        </div>
                    </li>
                    <li>
                        <div className="row">
                            <div>Tax</div>
                             <div>sh{order.taxPrice.toFixed(2)}</div>

                        </div>
                    </li>
                    <li>
                        <div className="row">
                            <div><strong>Order total</strong></div>
                             <div><strong>sh{order.totalPrice.toFixed(2)}</strong></div>

                        </div>
                    </li>
                    {
                        !order.isPaid && (
                            <li>
                                {
                                    !sdkReady? (<LoadingBox></LoadingBox>):
                                    (
                                        <PayPalButton amount={order.totalPrice} onSuccess={successPaymentHandler}>
                                            
                                        </PayPalButton>
                                    )
                                }
                            </li>
                        )
                    }
                    
                  
                        
                    </ul>

                </div>



            </div>
            </div>    
        </div>
    )
}
