//A new version of ProductScreen
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ImagesList from "../../components/ImagesList";
import LoadingBox from "../../components/LoadingBox";
import MessageBox from "../../components/MessageBox";
import Rating from "../../components/Rating";
import { nobody } from "../../constants/AppConstants";
import { updateCart } from "../../redux/cart/actions";
import { UPDATE } from "../../redux/cart/constants";
import { getProduct } from "../../redux/product/actions";
import { formatter } from "../../util/utils";

function ProductDetailsScreen(props) {
  const id = props.match.params.id;
  const dispatch = useDispatch();
  //   console.log("id:", id);
  const productDetails = useSelector((state) => state.productDetails);
  const user = useSelector((state) => state.user);
  const { userInfo } = user;
  const { product, loading, error } = productDetails;
  const [quantity, setQuantity] = useState(1);
  //   const detail = nobody.test.description;
  //   const description = nobody.test.detail;
  const [active, setActive] = useState(true);
  const { images } = product;
  const [displayImage, setDisplayImage] = useState("");
  const mounted = useRef(false);

  const addItem = () => {
    if (userInfo && userInfo.token) {
      dispatch(updateCart(UPDATE, id, quantity, userInfo.token));
    } else {
      props.history.push("/sign-in");
    }
  };

  useEffect(() => {
    if (!mounted.current && images) {
      mounted.current = true;
      setDisplayImage(images[0].url);
    }
  }, [mounted, images]);

  useEffect(() => {
    if (id) {
      dispatch(getProduct(id));
    }
  }, [dispatch, id]);

  if (loading) {
    return <LoadingBox></LoadingBox>;
  } else if (error) {
    return <MessageBox variant="danger">{error}</MessageBox>;
  }

  return (
    <>
      <div className="row top">
        <div className="col-2">
          {/* <img className="large" src={product.image} alt={product.name} /> */}
          <img className="large" src={displayImage} />
          <ImagesList
            images={images}
            onClickHandler={(e) => setDisplayImage(e.url)}
          />
        </div>
        <div className="col-2">
          <div className="row top">
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
                  {nobody.product.price}: {formatter.format(product.price)}
                </li>
                <li>
                  {nobody.product.description}:{" "}
                  <div
                    dangerouslySetInnerHTML={{
                      __html:
                        product.description && product.description.length > 150
                          ? product.description.substring(0, 100) + "..."
                          : product.description,
                    }}
                  ></div>
                </li>
              </ul>
            </div>
            <div className="col-1">
              <div className="card card-body">
                <ul>
                  <li className="row">
                    <span>{nobody.product.price}</span>
                    <span className="price">
                      {formatter.format(product.price)}
                    </span>
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
        </div>
      </div>
      <div className="row">
        <div className="col-2">
          <div className="right-content">
            <div className="row top center">
              <button
                className={(active ? "active" : "") + " product-info-btn"}
                onClick={() => {
                  setActive(true);
                }}
              >
                {nobody.product.details.specification.title}
              </button>
              <button
                className={(active ? "" : "active") + " product-info-btn"}
                onClick={() => {
                  setActive(false);
                }}
              >
                {nobody.product.details.description.title}
              </button>
            </div>
            <div
              className="product-description"
              dangerouslySetInnerHTML={{
                __html: active ? product.specification : product.description,
              }}
            ></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductDetailsScreen;
