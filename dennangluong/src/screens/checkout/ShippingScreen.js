import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CheckoutStep from "../../components/CheckoutStep";
import { nobody } from "../../constants/AppConstants";
import { saveShippingAddress } from "../../redux/cart/actions";
import { UPDATE_SHIPPING_ADDRESS_RESET } from "../../redux/cart/constants";

function ShippingScreen(props) {
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [county, setCounty] = useState("");
  const [district, setDistrict] = useState("");
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  // const ref = useRef(false);

  const saveShippingDetails = (e) => {
    e.preventDefault();

    dispatch(
      saveShippingAddress({
        fullName,
        address,
        city,
        county,
        district,
        phone,
      })
    );
    // props.history.push("/payment");
  };

  if (!cart || !cart.cartItems || cart.cartItems.length == 0) {
    props.history.push("/cart");
  }

  useEffect(() => {
    if (cart.shippingAddress) {
      const { shippingAddress } = cart;
      setFullName(shippingAddress.fullName);
      setPhone(shippingAddress.phone);
      setCity(shippingAddress.city);
      setCounty(shippingAddress.county);
      setDistrict(shippingAddress.district);
      setAddress(shippingAddress.address);
    }
  }, [cart.shippingAddress]);

  useEffect(() => {
    if (cart.updateSuccess) {
      props.history.push("/payment");
      dispatch({ type: UPDATE_SHIPPING_ADDRESS_RESET });
    }
  }, [cart.updateSuccess])
  return (
    <div>
      <CheckoutStep step1 step2></CheckoutStep>
      <form className="form" onSubmit={saveShippingDetails}>
        <div>
          <h1>{nobody.checkout.shipping}</h1>
        </div>
        <div>
          <label htmlFor="fullName">
            {nobody.user.name} <span className="danger">*</span>
          </label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            required
            value={fullName}
            placeholder="Enter full name"
            onChange={(e) => setFullName(e.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor="phone">
            {nobody.user.phone} <span className="danger">*</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="text"
            value={phone}
            required
            placeholder="Enter your phone"
            onChange={(e) => setPhone(e.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor="address">
            {nobody.user.address} <span className="danger">*</span>
          </label>
          <input
            id="address"
            name="address"
            type="text"
            required
            value={address}
            placeholder="Enter address"
            onChange={(e) => setAddress(e.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor="county">
            {nobody.shipping.county} <span className="danger">*</span>
          </label>
          <input
            id="county"
            name="county"
            type="text"
            value={county}
            required
            placeholder="Enter county"
            onChange={(e) => setCounty(e.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor="district">
            {nobody.shipping.district} <span className="danger">*</span>
          </label>
          <input
            id="district"
            name="district"
            type="text"
            value={district}
            required
            placeholder="Enter country"
            onChange={(e) => setDistrict(e.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor="city">
            {nobody.shipping.city} <span className="danger">*</span>
          </label>
          <input
            id="city"
            name="city"
            type="text"
            required
            value={city}
            placeholder="Enter city"
            onChange={(e) => setCity(e.target.value)}
          ></input>
        </div>

        <div>
          <label></label>
          <button type="submit" className="primary block">
            {nobody.shipping.continue}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ShippingScreen;
