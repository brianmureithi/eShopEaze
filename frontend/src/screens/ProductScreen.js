import React ,{useEffect,useState} from 'react'
import { Link } from 'react-router-dom';
import Rating from '../components/Rating';
import {useSelector,useDispatch} from 'react-redux';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { detailsProducts } from '../actions/productActions';

export default function ProductScreen(props) {
    const dispatch =useDispatch();
    const productId=props.match.params.id;
    const [qty, setQty] = useState(1);
   const productDetails = useSelector((state) => state.productDetails);
    const {loading,error,product} = productDetails;

    useEffect(() =>{
        dispatch(detailsProducts(productId));
    },[dispatch, productId]);

    const addToCartHandler =() =>{
        props.history.push(`/cart/${productId}?qty=${qty}`);
    }
  
    return (
        <div className='w-full'>
        {loading?(<LoadingBox></LoadingBox>)
        : error?(<MessageBox variant="danger">{error}</MessageBox>)
    :  ( 
        <div className='px-2 md:py-2 md:px-8 '>
        <Link to="/" className='p-2 inline-block border border-[#6c6435] m-1 rounded-md text-gray-900 bg-[#e6d057] hover:text-slate-700 
        transition ease-in-out hover:scale-95'>Back to Home</Link>
    <div className="flex flex-col md:flex-row w-full md:mt-6 py-1">
        <div className="w-full md:w-1/2 py-3 md-t-2 md:p-4 md:h-[70vh]">
        <img className="w-full h-full object-contain border " src ={product.image} alt={product.name}/>
        </div>
        <div className="w-full md:w-1/4 p-4">
        <ul>
            <li>
                <h1 className='text-4xl font-bold'>{product.name}</h1>
            </li>
            <li className='my-4'>
                <Rating rating={product.rating}
                numReviews={product.numReviews}></Rating>
            </li>
            <li className='my-4'>
               <p className='text-3xl md:text-2xl font-medium'>Costs  <span> KES{product.price}</span></p> 
             </li>
             <li className='py-3 px-2 border h-[10vh] rounded-md shadow-sm'>
               <p className=' text-3xl font-normal'>{product.description}</p>
             </li>
        </ul>
        </div>
        <div className="w-full md:w-1/4">
            <div className="card card-body">
                <ul>
                    <li>
                        <div className="row">
                       <div>Price</div>     
                        <div className="price">sh{product.price}</div>  
                        </div>
                    </li>
                    <li>
                        <div className="row">
                       <div>Status</div>     
                        <div className="status">
                            {product.countInStock>0 ? (<span className="success">In stock</span>):
                             (<span className="danger">Out Of Stock</span>)}
                            </div>  
                        </div>
                    </li>  
                    {
                        product.countInStock>0 &&(
                            <>
                            <li>
                             <div className="row">
                                 <div>Qty</div>
                                 <div>
                                     <select value={qty} onChange={e =>setQty(e.target.value)}>
                                         {
                                             [...Array(product.countInStock).keys()].map(x=>(
                                                 <option key={x+1}  value={x+1}>{x+1}</option>
                                             ))
                                         }
                                     </select>
                                 </div>
                                 </div>       
                            </li>
                         <li>
                            <button onClick={addToCartHandler} className="primary block">Add to Cart</button>
                        </li>
                            </>
                         
                        )
                    }
                  

                </ul>
            </div>

        </div>
    </div>
    </div>
    )}
</div>
       
    )
}
