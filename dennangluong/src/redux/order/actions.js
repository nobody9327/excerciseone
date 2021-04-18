import axios from "axios";
import { DELETE_CART } from "../cart/constants";
import {
  FETCH_ORDERS_LIST_FAILURE,
  FETCH_ORDERS_LIST_REQUEST,
  FETCH_ORDERS_LIST_SUCCESS,
  FETCH_ORDER_DETAILS_FAILURE,
  FETCH_ORDER_DETAILS_REQUEST,
  FETCH_ORDER_DETAILS_SUCCESS,
  ORDER_CREATE_FAILURE,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
} from "./constants";

export const createOrder = (data) => (dispatch, getState) => {
  dispatch({ type: ORDER_CREATE_REQUEST });
  const { userInfo } = getState().user;
  axios
    .post("/orders/", data, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    })
    .then((response) => {
      dispatch({ type: ORDER_CREATE_SUCCESS, payload: response.data });
    })
    .catch((error) => {
      const message =
        (error.response && error.response.data.message) || error.message;
      dispatch({ type: ORDER_CREATE_FAILURE, payload: message });
    });
};

export const fetchOrderDetails = (data) => (dispatch, getState) => {
  const { userInfo } = getState().user;
  console.log("userInfo", userInfo);
  dispatch({ type: FETCH_ORDER_DETAILS_REQUEST });

  axios
    .get(`/orders/${data._id}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    })
    .then((response) => {
      const order = response.data;
      dispatch({ type: FETCH_ORDER_DETAILS_SUCCESS, payload: order });
      localStorage.setItem("order", order);
    })
    .catch((error) => {
      const message =
        (error.response && error.response.data) || error.message;
      dispatch({ type: FETCH_ORDER_DETAILS_FAILURE, message });
    });
};

export const fetchOrders = () => (dispatch, getSate) => {
  const { userInfo } = getSate().user;
  dispatch({ type: FETCH_ORDERS_LIST_REQUEST });

  axios
    .get("/orders", {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    })
    .then((response) => {
      const orders = response.data;
      dispatch({ type: FETCH_ORDERS_LIST_SUCCESS, payload: orders });
      localStorage.setItem("orders", JSON.stringify(orders));
    })
    .catch((error) => {
      const message =
        (error.response && error.response.data) || error.message;
      dispatch({ type: FETCH_ORDERS_LIST_FAILURE, payload: message });
    });
};

