import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CheckoutStep from "../../components/CheckoutStep";
import LoadingBox from "../../components/LoadingBox";
import MessageBox from "../../components/MessageBox";
import { nobody } from "../../constants/AppConstants";
import { emptyCart } from "../../redux/cart/actions";
import { createOrder } from "../../redux/order/actions";
import { ORDER_RESET } from "../../redux/order/constants";

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
  cart.taxPrice = 0;//(cart.itemsPrice * 10) / 100;
  cart.totalPrice = cart.itemsPrice + cart.taxPrice;
  cart.itemsPrice = cart.itemsPrice.toFixed(2);
  cart.taxPrice = cart.taxPrice.toFixed(2);
  cart.totalPrice = cart.totalPrice.toFixed(2);
  cart.shippingPrice = 0;

  const orderHandler = (e) => {
    e.preventDefault();
    // console.log(cart);
    const orderItems = cart.cartItems.map((item) => {
      return { ...item, product: item._id, image: item.images[0].url};
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
      props.history.push(`/user/orders/${orderDetails._id}`);
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
              <h1>{nobody.checkout.shipping}</h1>
            </div>
            <p>
              <strong>{nobody.user.name}: </strong>
              {shippingAddress.fullName}
              <br />
              <strong>{nobody.user.address}: </strong>
              {shippingAddress.address}, {shippingAddress.city},{" "}
              {shippingAddress.postalCode}, {shippingAddress.country}
            </p>
          </div>
          <div className="card card-body">
            <div>
              <h1>{nobody.checkout.payment}</h1>
            </div>
            <p>
              <strong>{nobody.payment.method}:</strong> {cart.paymentMethod}
            </p>
          </div>
          <div className="card card-body">
            <div>
              <h1>{nobody.cart.items}</h1>
            </div>
            <table className="table">
              {/* <thead>
                <tr>
                  <th></th>
                  <th></th>
                  <th>sl x đơn giá</th>
                  <th>thành tiền</th>
                </tr>
              </thead> */}
              <tbody>
                {cart.cartItems &&
                  cart.cartItems.map((item) => (
                    <tr key={item._id}>
                      <td>
                        <img className="small" src={item.images && item.images[0].url} />
                      </td>
                      <td>
                        <a href={`/products/${item._id}`}>{item.name}</a>
                      </td>
                      <td>
                        {item.quantity} x {item.price}
                      </td>
                      <td>{item.quantity * item.price}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="col-1">
          <div className="card card-body">
            <h1 className="row center">{nobody.order.Summary}</h1>
            <ul>
              <li className="row">
                <span>{nobody.order.items}</span>
                <span>{cart.itemsPrice} đ</span>
              </li>
              <li className="row">
                <span>{nobody.order.shipping}</span>
                <span>{0} đ</span>
              </li>
              <li className="row">
                <span>{nobody.order.tax}</span>
                <span>{0} đ</span>
              </li>
              <li className="row">
                <span>
                  <strong>{nobody.order.orderTotal}</strong>
                </span>
                <span>{cart.totalPrice} đ</span>
              </li>
              <li>
                <button className="block primary" onClick={orderHandler}>
                  {nobody.order.order}
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
