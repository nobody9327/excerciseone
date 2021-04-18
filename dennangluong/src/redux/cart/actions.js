import axios from "axios";
import {
  EMPTY_CART_FAILURE,
  EMPTY_CART_REQUEST,
  EMPTY_CART_SUCCESS,
  UPDATE_SHIPPING_ADDRESS_FAILURE,
  UPDATE_SHIPPING_ADDRESS_REQUEST,
  UPDATE_SHIPPING_ADDRESS_SUCCESS,
} from "../cart/constants";
import {
  CART_UPDATE_FAILURE,
  CART_UPDATE_REQUEST,
  CART_UPDATE_SUCCESS,
  DELETE_CART,
  FETCH_CART_FAILURE,
  FETCH_CART_REQUEST,
  FETCH_CART_SUCCESS,
  SAVE_PAYMENT_METHOD_REQUEST,
  UPDATE,
} from "./constants";

export const updateCart = (updateType, id, quantity, token) => (dispatch) => {
  const url =
    updateType === UPDATE
      ? `/cart/update?id=${id}&quantity=${quantity}`
      : `/cart/remove-item?id=${id}`;

  dispatch({ type: CART_UPDATE_REQUEST });

  axios
    .get(url, { headers: { Authorization: `Bearer ${token}` } })
    .then((response) => {
      const cartItems = response.data;
      dispatch({ type: CART_UPDATE_SUCCESS, payload: cartItems });
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    })
    .catch((error) => {
      const message = error.response
        ? error.response.data.message
        : error.message;
      dispatch({ type: CART_UPDATE_FAILURE, payload: message });
    });
};

export const clearCart = () => (dispatch) => {
  dispatch({ type: EMPTY_CART_SUCCESS });
  localStorage.removeItem('cartItems');
};

export const getCart = () => (dispatch, getState) => {
  const {userInfo} = getState().user;
  dispatch({ type: FETCH_CART_REQUEST });

  axios
    .get("/cart", { headers: { Authorization: `Bearer ${userInfo.token}` } })
    .then((response) => {
      const {cartItems, shippingAddress} = response.data;
      dispatch({ type: FETCH_CART_SUCCESS, payload: {cartItems, shippingAddress} });
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      localStorage.setItem("shippingAddress", JSON.stringify(shippingAddress));
    })
    .catch((error) => {
      console.log("error", error);
      const message = error.response
        ? error.response.data.message
        : error.message;

      dispatch({ type: FETCH_CART_FAILURE, payload: message });
    });
};

export const emptyCart = () => (dispatch, getState) => {
  dispatch({ type: EMPTY_CART_REQUEST });
  const { userInfo } = getState().user;

  axios
    .get("/cart/empty", {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    })
    .then((response) => {
      dispatch({ type: EMPTY_CART_SUCCESS });
      localStorage.removeItem("cartItems");
    })
    .catch((error) => {
      const message =
        (error.response && error.response.data.message) || error.message;
      dispatch({ type: EMPTY_CART_FAILURE, payload: message });
    });
  // localStorage.removeItem("cartItems");
  // localStorage.removeItem("shippingAddress");
};

export const saveShippingAddress = (data) => (dispatch, getState) => {
  const {userInfo} = getState().user;
  dispatch({ type: UPDATE_SHIPPING_ADDRESS_REQUEST });
  // console.log("token", data.token);
  const config = {
    headers: { Authorization: `Bearer ${userInfo.token}` },
  };
  axios
    .post("/shipping-address/update", data, config)
    .then((response) => {
      const shippingAddress = response.data;
      dispatch({
        type: UPDATE_SHIPPING_ADDRESS_SUCCESS,
        payload: shippingAddress,
      });
      console.log("saveShippingAddress");
      localStorage.setItem("shippingAddress", JSON.stringify(shippingAddress));
    })
    .catch((error) => {
      const message = error.response
        ? error.response.data.message
        : error.message;
      dispatch({ type: UPDATE_SHIPPING_ADDRESS_FAILURE, payload: message });
    });
};

export const fetchShippingAddress = () => (dispatch, getState) => {
  const {userInfo} = getState().user;
  dispatch({ type: UPDATE_SHIPPING_ADDRESS_REQUEST });
  axios
    .get("/shipping-address", { headers: { Authorization: `Bearer ${userInfo.token}` } })
    .then((response) => {
      const shippingAddress = response.data;
      dispatch({
        type: UPDATE_SHIPPING_ADDRESS_SUCCESS,
        payload: shippingAddress,
      });
      console.log("saveShippingAddress");
      localStorage.setItem("shippingAddress", JSON.stringify(shippingAddress));
    })
    .catch((error) => {
      const message = error.response
        ? error.response.data.message
        : error.message;
      dispatch({ type: UPDATE_SHIPPING_ADDRESS_FAILURE, payload: message });
    });
};

export const savePaymentMethod = (data) => (dispatch) => {
  dispatch({ type: SAVE_PAYMENT_METHOD_REQUEST, payload: data });
};
