import React from "react";
import Rating from "./Rating";

function Product(props) {
  const { product } = props;

  return (
    <div className="card">
      <a href={`/products/${product._id}`}>
        <img className="medium" src={product.image} alt={product.name} />
      </a>
      <div className="card-body">
        <a href={`/products/${product._id}`}>
          <h1>{product.name}</h1>
        </a>
        <Rating
          rating={product.rating}
          numOfReviews={product.numOfReviews}
        ></Rating>
        <span className="price">${product.price}</span>
      </div>
    </div>
  );
}

export default Product;
