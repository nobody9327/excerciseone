import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { getCart, updateCart } from "../redux/cart/actions";
import { UPDATE } from "../redux/cart/constants";

function CartScreens(props) {
  const productId = props.match.params.id;
  const quantity = props.location.search && props.location.search.split("=")[1];

  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user);
  const { userInfo } = user;
  const { cartItems, loading, error } = cart;

  const dispatch = useDispatch();

  const modifyQuantityHandler = (id, qty) => {
    dispatch(updateCart(UPDATE, id, qty, userInfo.token));
  };

  const checkOutHandler = (e) => {
    e.preventDefault();
    props.history.push("/shipping");
  };

  useEffect(() => {
    if(userInfo && userInfo.token)
    dispatch(getCart(userInfo.token));
  }, [dispatch, userInfo]);

  if (loading) {
    return <LoadingBox></LoadingBox>;
  } else if (error) {
    return <MessageBox>{error}</MessageBox>;
  } else if (!cartItems || cartItems.length === 0) {
    return (
      <MessageBox variant="info">
        Cart is empty. <Link to="/">Go Shopping</Link>
      </MessageBox>
    );
  }

  return (
    <div className="row top">
      <div className="col-2">
        <ul>
          {cartItems.map((item) => (
            <li key={item._id} className="row">
              <img className="small" src={item.image} alt={item.name} />
              <div className="min-30">
                <span>{item.name}</span>
              </div>
              <select
                value={item.quantity}
                onChange={(e) =>
                  modifyQuantityHandler(item._id, e.target.value)
                }
              >
                {[...Array(item.countInStock).keys()].map((k) => (
                  <option key={k + 1}>{k + 1}</option>
                ))}
              </select>
              <p>${item.price}</p>
              <button onClick={(e) => modifyQuantityHandler(item._id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="col-1">
        <div className="card card-body">
        <h2>
          Subtotal ({cartItems.length} items):{" $"}
          {cartItems.reduce((a, b) => a + b.price * b.quantity, 0)}
        </h2>
        <button className="primary block" onClick={checkOutHandler}>
          Checkout
        </button>
        </div>
      </div>
    </div>
  );
}

export default CartScreens;
