import React from "react";
import { nobody } from "../constants/AppConstants";

function CheckoutStep(props) {
  return (
    <div className="row checkout-steps">
      <div className={props.step1 ? "active" : ""}>{nobody.checkout.signin}</div>
      <div className={props.step2 ? "active" : ""}>{nobody.checkout.shipping}</div>
      <div className={props.step3 ? "active" : ""}>{nobody.checkout.payment}</div>
      <div className={props.step4 ? "active" : ""}>{nobody.checkout.placeOrder}</div>
    </div>
  );
}

export default CheckoutStep;
