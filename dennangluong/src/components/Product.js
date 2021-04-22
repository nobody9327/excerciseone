import React from "react";
import { formatter } from "../util/utils";
import Rating from "./Rating";

function Product(props) {
  const { product } = props;

  return (
    <div className="card">
      <a href={`/products/${product._id}`}>
        <img className="medium" src={product.images[0].url} alt={product.name} />
      </a>
      <div className="card-body">
        <a href={`/products/${product._id}`}>
          <h1>{product.name}</h1>
        </a>
        <Rating
          rating={product.rating}
          numOfReviews={product.numOfReviews}
        ></Rating>
        <span className="price">{formatter.format(product.price)}</span>
      </div>
    </div>
  );
}

export default Product;
