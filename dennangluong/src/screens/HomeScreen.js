import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import Product from "../components/Product";
import { getProducts } from "../redux/product/actions";

function HomeScreen() {
  const productList = useSelector((state) => state.productList);
  const { products, loading, error } = productList;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  if (loading) {
    return <LoadingBox></LoadingBox>;
  } else if (error) {
    return <MessageBox>{error}</MessageBox>;
  }

  return (
    <div className="row center">
      {products.map(
        (product) =>
          product.active && (
            <Product key={product._id} product={product}></Product>
          )
      )}
    </div>
  );
}

export default HomeScreen;
