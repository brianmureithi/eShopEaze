import React from 'react'
import { Link } from 'react-router-dom';
import Rating from './Rating';

export default function Product(props) {
    const  {product} =props; 
    return (
        <div key={product._id} className=" w-full md:w-[23%] p-2 border border-gray-200 bg-white rounded-lg mx-2 mb-8 ">
                <Link to={`/product/${product._id}`}>
                    <img className="object-contain w-full md:max-h-[30rem] md:h-[23rem]" src={product.image} alt={product.name} />
                   
                </Link>
                <div className="p-2 bg-slate-100 mt-2 rounded-sm shadow-md relative">
                <Link to={`/product/${product._id}`}>
              <h2 className='text-3xl font-bold text-[#0b2b1b] hover:text-[#f59b0c]'>{product.name}</h2>
                    </Link>
                    <div className=" absolute bottom-4 right-1 ">
                       <Link to={`/product/${product._id}`} className='py-2 px-1 hover:text-white bg-teal-500 text-white rounded-none w-fit text-2xl shadow-sm font-[500]'>KES {product.price}</Link>
                    </div>
                    <Link to={`/product/${product._id}`} className='md:hidden inline-flex rounded-md  bg-green-500 py-2 px-2 w-[17rem]  justify-center mb-5 text-white font-normal'> View
              
                </Link>
                   <Rating rating={product.rating} numReviews={product.numReviews}></Rating>
                    
                </div>
            </div>
    )
}
