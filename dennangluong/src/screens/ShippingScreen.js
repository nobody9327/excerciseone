import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CheckoutStep from "../components/CheckoutStep";
import { saveShippingAddress } from "../redux/cart/actions";

function ShippingScreen(props) {
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user);
  const [fullName, setFullName] = useState(
    (cart && cart.shippingAddress && cart.shippingAddress.fullName) || ""
  );
  const [address, setAddress] = useState(
    (cart && cart.shippingAddress && cart.shippingAddress.address) || ""
  );
  const [city, setCity] = useState(
    (cart && cart.shippingAddress && cart.shippingAddress.city) || ""
  );
  const [postalCode, setPostalCode] = useState(
    (cart && cart.shippingAddress && cart.shippingAddress.postalCode) || ""
  );
  const [country, setCountry] = useState(
    (cart && cart.shippingAddress && cart.shippingAddress.country) || ""
  );
  const dispatch = useDispatch();

  const saveShippingDetails = (e) => {
    e.preventDefault();
    dispatch(
      saveShippingAddress({
        fullName,
        address,
        city,
        postalCode,
        country,
        token: user.userInfo.token,
      })
    );
    props.history.push("/payment");
  };
  if (!cart || !cart.cartItems || cart.cartItems.length == 0){
    props.history.push('/cart')
  }
    return (
      <div>
        <CheckoutStep step1 step2></CheckoutStep>
        <form className="form" onSubmit={saveShippingDetails}>
          <div>
            <h1>Shipping Details</h1>
          </div>
          <div>
            <label htmlFor="fullName">Full Name</label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              value={fullName}
              placeholder="Enter full name"
              onChange={(e) => setFullName(e.target.value)}
            ></input>
          </div>
          <div>
            <label htmlFor="address">Address</label>
            <input
              id="address"
              name="address"
              type="text"
              value={address}
              placeholder="Enter address"
              onChange={(e) => setAddress(e.target.value)}
            ></input>
          </div>
          <div>
            <label htmlFor="city">City</label>
            <input
              id="city"
              name="city"
              type="text"
              value={city}
              placeholder="Enter city"
              onChange={(e) => setCity(e.target.value)}
            ></input>
          </div>
          <div>
            <label htmlFor="postalCode">Postal code</label>
            <input
              id="postalCode"
              name="postalCode"
              type="number"
              value={postalCode}
              placeholder="Enter postal code"
              onChange={(e) => setPostalCode(e.target.value)}
            ></input>
          </div>
          <div>
            <label htmlFor="country">Country</label>
            <input
              id="country"
              name="country"
              type="text"
              value={country}
              placeholder="Enter country"
              onChange={(e) => setCountry(e.target.value)}
            ></input>
          </div>
          <div>
            <label></label>
            <button type="submit" className="primary block">
              Continue
            </button>
          </div>
        </form>
      </div>
    );
}

export default ShippingScreen;
