import React from 'react'
import { Link } from 'react-router-dom';
import Rating from './Rating';

export default function Product(props) {
    const  {product} =props; 
    return (
        <div key={product._id} className=" w-[23%] p-2 border border-gray-200 bg-white rounded-lg mx-2 mb-4 ">
                <Link to={`/product/${product._id}`}>
                    <img className="object-contain w-full md:max-h-[30rem] md:h-[23rem]" src={product.image} alt={product.name} />
                   
                </Link>
                <div className="p-2 bg-slate-100 mt-2 rounded-sm shadow-md p-4 relative">
                <Link to={`/product/${product._id}`}>
              <h2 className='text-3xl font-bold text-[#0b2b1b] hover:text-[#f59b0c]'>{product.name}</h2>
                    </Link>
                    <div className=" absolute bottom-2 right-2 ">
                       <p className='py-2 px-1 bg-teal-500 text-white rounded-none w-fit text-2xl shadow-sm font-[500]'>KES {product.price}</p>
                    </div>
                   <Rating rating={product.rating} numReviews={product.numReviews}></Rating>
                    
                </div>
            </div>
    )
}
