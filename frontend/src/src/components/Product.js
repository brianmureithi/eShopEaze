import React from 'react'
import { Link } from 'react-router-dom';
import Rating from './Rating';

export default function Product(props) {
    const  {product} =props; 
    return (
        <div key={product._id} className="card w-1/2">
                <Link to={`/product/${product._id}`}>
                    <img className="medium" src={product.image} alt={product.name}/>
                   
                </Link>
                <div className="card-body">
                <Link to={`/product/${product._id}`}>
              <h2>{product.name}</h2>
                    </Link>
                   <Rating rating={product.rating} numReviews={product.numReviews}></Rating>
                    <div className="price">
                       sh{product.price}
                    </div>
                </div>
            </div>
    )
}
