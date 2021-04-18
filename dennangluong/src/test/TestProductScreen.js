import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import Rating from "../components/Rating";
import { nobody } from "../constants/AppConstants";
import { updateCart } from "../redux/cart/actions";
import { UPDATE } from "../redux/cart/constants";
import { getProduct } from "../redux/product/actions";

function TestProductScreen(props) {
  const id = props.match.params.id;
  console.log("id:", id);
  const productDetails = useSelector((state) => state.productDetails);
  const user = useSelector((state) => state.user);
  const { userInfo } = user;
  const { product, loading, error } = productDetails;
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const [content, setContent] = useState("");
  const detail = nobody.test.description;
  const description = nobody.test.detail;
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (id) {
      dispatch(getProduct(id));
    }
  }, [dispatch, id]);

  const addItem = () => {
    if (userInfo && userInfo.token) {
      dispatch(updateCart(UPDATE, id, quantity, userInfo.token));
    } else {
      props.history.push("/sign-in");
    }

    // props.history.push("/cart");
  };

  if (loading) {
    return <LoadingBox></LoadingBox>;
  } else if (error) {
    // console.log('err', e)
    return <MessageBox variant="danger">{error}</MessageBox>;
  }
  // const link = "/resource/uploads\\1618422189842.jpg";
  return (
    <>
      <div className="product-grid">
        <img className="large" src={product.image} alt={product.name} />
        <div className="product-info">
          <div className="row top splitter">
            <div className="col-1">
              <ul>
                <li>
                  <h1>{product.name}</h1>
                </li>
                <li>
                  <Rating
                    rating={product.rating}
                    numOfReviews={product.numOfReviews}
                  ></Rating>
                </li>
                <li>
                  {nobody.product.price}: {product.price}
                </li>
                <li>
                  {nobody.product.description}: {product.description}
                </li>
              </ul>
            </div>
            <div className="col-1">
              <div className="card card-body">
                <ul>
                  <li className="row">
                    <span>{nobody.product.price}</span>
                    <span className="price">${product.price}</span>
                  </li>
                  <li className="row">
                    <span>{nobody.product.status.title}</span>
                    {product.countInStock > 0 ? (
                      <span className="success">{nobody.product.inStock}</span>
                    ) : (
                      <span className="danger">
                        {nobody.product.unavailable}
                      </span>
                    )}
                  </li>
                  <li className="row">
                    <span>{nobody.product.quantity}</span>
                    <select
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                    >
                      {[...Array(product.countInStock).keys()].map((k, v) => (
                        <option key={k + 1}>{k + 1}</option>
                      ))}
                    </select>
                  </li>
                  <li className="row">
                    <button className="primary block" onClick={addItem}>
                      {nobody.product.addToCart}
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="right-content">
            <div className="row top left">
              <button
                className={active ? "active" : ""}
                onClick={() => {
                //   setActive(false);
                  setContent(detail);
                }}
              >
                Thông tin chi tiết
              </button>
              <button
                className={active ? "" : "active"}
                onClick={() => {
                //   setActive(true);
                  setContent(description);
                }}
              >
                Mô tả sản phẩm
              </button>
            </div>
            <div className="product-description">
              <p>{content}</p>
            </div>
          </div>
        </div>
      </div>

      {/* 
    <div className="row top">
      <div className="col-2">
        <img className="large" src={product.image} alt={product.name} />
      </div>
      <div className="col-1">
        <ul>
          <li>
            <h1>{product.name}</h1>
          </li>
          <li>
            <Rating
              rating={product.rating}
              numOfReviews={product.numOfReviews}
            ></Rating>
          </li>
          <li>
            {nobody.product.price}: {product.price}
          </li>
          <li>
            {nobody.product.description}: {product.description}
          </li>
        </ul>
      </div>
      <div className="col-1">
        <div className="card card-body">
          <ul>
            <li className="row">
              <span>{nobody.product.price}</span>
              <span className="price">${product.price}</span>
            </li>
            <li className="row">
              <span>{nobody.product.status.title}</span>
              {product.countInStock > 0 ? (
                <span className="success">{nobody.product.inStock}</span>
              ) : (
                <span className="danger">{nobody.product.unavailable}</span>
              )}
            </li>
            <li className="row">
              <span>{nobody.product.quantity}</span>
              <select
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              >
                {[...Array(product.countInStock).keys()].map((k, v) => (
                  <option key={k + 1}>{k + 1}</option>
                ))}
              </select>
            </li>
            <li className="row">
              <button className="primary block" onClick={addItem}>
                {nobody.product.addToCart}
              </button>
            </li>
          </ul>
        </div>
      </div>
      
      {/* <div className="col-2">
          <div className="row">
              <button>Thông tin chi tiết</button>
              <button>Mô tả sản phẩm</button>
          </div>
      </div> 
    </div> */}
    </>
  );
}
export default TestProductScreen;
