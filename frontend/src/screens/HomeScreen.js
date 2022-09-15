import React, {useEffect} from 'react'
import Product from '../components/Product'
import LoadingBox from '../components/LoadingBox';
import {useDispatch,useSelector} from 'react-redux';
import MessageBox from '../components/MessageBox';
import { listProducts } from '../actions/productActions';
import Banner from '../components/Banner';


export default function HomeScreen() {
    const dispatch = useDispatch();
    const productList  = useSelector((state) => state.productList);
    const {loading,error,products} =productList;

    useEffect(() =>{ 
dispatch(listProducts());
 },[dispatch])

    return (
        <div className='w-full'>
        {/*    <Banner/> */}
            <div className='flex justify-center p-4 mt-2 mb-4 '>
                <p className='text-6xl font-thin text-[#f59b0c]'>Available Products</p>
            </div>
            {loading?(<LoadingBox></LoadingBox>) 
            : error?(<MessageBox variant="danger">{error}</MessageBox>)
        :  (<div className="flex md:flex-row md:w-[90%]  md:px-4 flex-wrap w-full mx-auto mb-20 justify-center bg-gradient-to-tr rounded-lg from-slate-200 to-amber-100 py-8 ">
        {
          products.map((product) => (
            <Product key={product._id} product={product}></Product>
            ))}      
</div> )}
 </div>
    )
};
