import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CheckoutStep from "../components/CheckoutStep";
import { savePaymentMethod } from "../redux/cart/actions";

function PaymentScreen(props) {
  const [paymentMethod, setPaymentMethod] = useState("PayPal");
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const proceedPayment = (e) => {
    e.preventDefault();
    console.log("paymentMethod", paymentMethod);
    dispatch(savePaymentMethod(paymentMethod));
    props.history.push("/place-order");
  };

  if (!cart || !cart.shippingAddress || !cart.shippingAddress.fullName) {
    console.log("paymentscreen");
    props.history.push("/shipping");
  }
  return (
    <div>
      <CheckoutStep step1 step2 step3></CheckoutStep>
      <form className="form" onSubmit={proceedPayment}>
        <div>
          <h1>Payment</h1>
        </div>
        <div>
          <div>
            <input
              type="radio"
              id="PayPal"
              value="PayPal"
              name="paymentMethod"
              required
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></input>
            <label htmlFor="PayPal">PayPal</label>
          </div>
        </div>
        <div>
          <div>
            <input
              type="radio"
              id="Stripe"
              value="Stripe"
              name="paymentMethod"
              required
            ></input>
            <label htmlFor="Stripe">Stripe</label>
          </div>
        </div>
        <div>
          <label></label>
          <button className="primary block" type="submit">
            Continue
          </button>
        </div>
      </form>
    </div>
  );
}

export default PaymentScreen;
