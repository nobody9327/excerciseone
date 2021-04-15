import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CheckoutStep from "../components/CheckoutStep";
import { ORDER_RESET } from "../redux/order/constants";
import MessageBox from "../components/MessageBox";
import LoadingBox from "../components/LoadingBox";
import { createOrder } from "../redux/order/actions";
import { productReducer } from "../redux/product/reducer";
import { emptyCart } from "../redux/cart/actions";

function PlaceOrderScreen(props) {
  const user = useSelector((state) => state.user);
  const { userInfo } = user;
  const cart = useSelector((state) => state.cart) || {};
  const shippingAddress = cart.shippingAddress || {};
  const order = useSelector((state) => state.order);
  const { loading, error, orderDetails, success } = order;
  const dispatch = useDispatch();

  cart.itemsPrice = cart.cartItems.reduce(
    (a, b) => a + b.price * b.quantity,
    0
  );
  cart.taxPrice = (cart.itemsPrice * 10) / 100;
  cart.totalPrice = cart.itemsPrice + cart.taxPrice;
  cart.itemsPrice = cart.itemsPrice.toFixed(2);
  cart.taxPrice = cart.taxPrice.toFixed(2);
  cart.totalPrice = cart.totalPrice.toFixed(2);
  cart.shippingPrice = 0;

  const orderHandler = (e) => {
    e.preventDefault();
    // console.log(cart);
    const orderItems = cart.cartItems.map((item) => {
      return { ...item, product: item._id };
    });
    dispatch(
      createOrder({
        ...cart,
        orderItems,
      })
    );
  };

  if (!cart || !cart.paymentMethod) {
    // console.log("about to go to payment");
    props.history.push("/payment");
  }

  useEffect(() => {
    if (success) {
      props.history.push(`/orders/${orderDetails._id}`);
      dispatch({ type: ORDER_RESET });
      dispatch(emptyCart());
    }
  }, [success]);

  return (
    <div>
      <CheckoutStep step1 step2 step3 step4></CheckoutStep>
      <div className="row top">
        <div className="col-2">
          <div className="card card-body">
            <div>
              <h1>Shipping</h1>
            </div>
            <p>
              <strong>Name: </strong>
              {shippingAddress.fullName}
              <br />
              <strong>Address: </strong>
              {shippingAddress.address}, {shippingAddress.city},{" "}
              {shippingAddress.postalCode}, {shippingAddress.country}
            </p>
          </div>
          <div className="card card-body">
            <div>
              <h1>Payment</h1>
            </div>
            <p>
              <strong>Method:</strong> {cart.paymentMethod}
            </p>
          </div>
          <div className="card card-body">
            <div>
              <h1>Order Items</h1>
            </div>
            {cart.cartItems &&
              cart.cartItems.map((item) => (
                <div className="item-detail">
                  <img className="small" src={item.image} />
                  <a href={`/products/${item._id}`}>{item.name}</a>
                  <span>
                    {item.quantity} x {item.price}={item.quantity * item.price}
                  </span>
                </div>
              ))}
          </div>
        </div>
        <div className="col-1">
          <div className="card card-body">
            <h1>Order Summary</h1>
            <ul>
              <li className="row">
                <span>Items</span>
                <span>${cart.itemsPrice}</span>
              </li>
              <li className="row">
                <span>Shipping</span>
                <span>${0}</span>
              </li>
              <li className="row">
                <span>Tax</span>
                <span>${cart.tax}</span>
              </li>
              <li className="row">
                <span>
                  <strong>Order Total</strong>
                </span>
                <span>${cart.totalPrice}</span>
              </li>
              <li>
                <button className="block primary" onClick={orderHandler}>
                  Order
                </button>
              </li>
              {loading && <LoadingBox></LoadingBox>}
              {error && <MessageBox variant="danger">{error}</MessageBox>}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlaceOrderScreen;
