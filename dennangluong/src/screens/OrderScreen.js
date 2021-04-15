import axios from "axios";
import React, { useEffect, useState } from "react";
import { PayPalButton } from "react-paypal-button-v2";
import { useDispatch, useSelector } from "react-redux";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { fetchOrderDetails } from "../redux/order/actions";

function OrderScreen(props) {
  const id = props.match.params.id;
  //   console.log("id", id);
  const order = useSelector((state) => state.order);
  const [sdkReady, setSdkReady] = useState(false);
  const dispatch = useDispatch();

  const { orderDetails } = order;
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    isDeliverd,
    deliverdAt,
    isPaid,
    paidAt,
    _id,
  } = orderDetails || {};
  const { fullName, address, city, postalCode, country } =
    shippingAddress || {};

  const successPaymentHandler = () => {};

  useEffect(() => {
    const addPayPalScript = async () => {
      const { data } = await axios.get("/config/paypal");
      console.log(data);
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };

    if (!orderDetails || !orderDetails._id) {
      dispatch(fetchOrderDetails({ _id: id }));
    } else {
      if (!isPaid) {
        if (!window.paypal) {
          addPayPalScript();
        } else {
          setSdkReady(true);
        }
      }
    }
  }, [_id, orderDetails, isPaid]);

  return (
    <div>
      <div>
        <h1>Order {order._id}</h1>
      </div>
      <div className="row top">
        <div className="col-2">
          <div className="card card-body">
            <div>
              <h1>Shipping</h1>
            </div>
            <p>
              <strong>Name: </strong>
              {fullName}
              <br></br>
              <strong>Address: </strong>
              {address}, {city}, {postalCode}, {country}
            </p>
            {isDeliverd ? (
              <MessageBox>{`Delivered at  ${deliverdAt}`}</MessageBox>
            ) : (
              <MessageBox variant="danger">{`Not Delivered`}</MessageBox>
            )}
          </div>
          <div className="card card-body">
            <div>
              <h1>Payment</h1>
            </div>
            <p>
              <strong>Method: </strong>
              {paymentMethod}
            </p>
            {isPaid ? (
              <MessageBox>{`Paid at ${paidAt}`}</MessageBox>
            ) : (
              <MessageBox variant="danger">Not Paid</MessageBox>
            )}
          </div>
          <div className="card card-body">
            <div>
              <h1>Order Items</h1>
            </div>
            <ul>
              {orderItems.map((item) => (
                <li className="item-detail">
                  <img className="small" src={item.image} />
                  <div className="min-30">
                    <a href={`/products/${item._id}`}>{item.name}</a>
                  </div>
                  <span>
                    {item.quantity} x ${item.price} ={" "}
                    {item.price * item.quantity}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="col-1">
          <div className="card card-body">
            <div>
              <h1>Order Summary</h1>
            </div>
            <ul>
              <li className="row">
                <span>Items</span>
                <span>${itemsPrice}</span>
              </li>
              <li className="row">
                <span>Shipping</span>
                <span>${shippingPrice}</span>
              </li>
              <li className="row">
                <span>Tax</span>
                <span>${taxPrice}</span>
              </li>
              <li className="row">
                <span>
                  <strong>Order Total</strong>
                </span>
                <span>${totalPrice}</span>
              </li>
              <li>
                {!isPaid && (
                  <div>
                    {!sdkReady ? (
                      <LoadingBox></LoadingBox>
                    ) : (
                      <PayPalButton
                        amount={totalPrice}
                        onSuccess={successPaymentHandler}
                      ></PayPalButton>
                    )}
                  </div>
                )}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderScreen;
