import {
  SIGN_IN_FAILURE,
  SIGN_IN_REQUEST,
  SIGN_IN_SUCCESS,
  SIGN_OUT,
  SIGN_UP_FAILURE,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  UPDATE_SHIPPING_ADDRESS_FAILURE,
  UPDATE_SHIPPING_ADDRESS_REQUEST,
  UPDATE_SHIPPING_ADDRESS_SUCCESS,
  UPDATE_USER_PROFILE_FAIL,
  UPDATE_USER_PROFILE_REQUEST,
  UPDATE_USER_PROFILE_SUCCESS,
} from "./constants";
import axios from "axios";
import { getCart } from "../cart/actions";

export const signin = (data) => (dispatch) => {
  dispatch({ type: SIGN_IN_REQUEST });

  axios
    .post("/users/signin", data)
    .then((response) => {
      const user = response.data;
      dispatch({ type: SIGN_IN_SUCCESS, payload: user });
      localStorage.setItem("userInfo", JSON.stringify(user));
    })
    .catch((error) => {
      const message = error.response
        ? error.response.data.message
        : error.message;
      dispatch({ type: SIGN_IN_FAILURE, payload: message });
    });
};

export const signUp = (data) => (dispatch) => {
  dispatch({ type: SIGN_UP_REQUEST });

  axios
    .post("/users/signup", data)
    .then((response) => {
      const user = response.data;
      dispatch({ type: SIGN_UP_SUCCESS, payload: user });
      dispatch({ type: SIGN_IN_SUCCESS, payload: user });
      localStorage.setItem("userInfo", JSON.stringify(user));
    })
    .catch((error) => {
      const message = error.response
        ? error.response.data.message
        : error.message;
      dispatch({ type: SIGN_UP_FAILURE, payload: message });
    });
};

export const signout = () => (dispatch) => {
  dispatch({ type: SIGN_OUT });
  localStorage.removeItem("userInfo");
};

export const updateUserProfile = (data) => (dispatch, getState) => {
  const { userInfo } = getState().user;

  dispatch({ type: UPDATE_USER_PROFILE_REQUEST });

  axios
    .post("/users/update", data, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    })
    .then((response) => {
      dispatch({ type: UPDATE_USER_PROFILE_SUCCESS, payloac: response.data });
    })
    .catch((error) => {
      const message = (error.response && error.response.data) || error.message;
      dispatch({ type: UPDATE_USER_PROFILE_FAIL, payload: message });
    });
};
