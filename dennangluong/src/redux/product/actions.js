import axios from "axios";
import {
  CREATE_PRODUCT_FAILURE,
  CREATE_PRODUCT_REQUEST,
  CREATE_PRODUCT_SUCCESS,
  PRODUCT_DETAILS_FAILURE,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_LIST_FAILURE,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
} from "./constants";

export const getProducts = () => (dispatch) => {
  dispatch({ type: PRODUCT_LIST_REQUEST });

  axios
    .get("/products")
    .then((response) => {
      const products = response.data;

      dispatch({ type: PRODUCT_LIST_SUCCESS, payload: products });
      localStorage.setItem("products", JSON.stringify(products));
    })
    .catch((error) => {
      const message = (error.response && error.response.data) || error.message;
      // console.log("message", error.response);
      dispatch({
        type: PRODUCT_LIST_FAILURE,
        payload: message,
      });
    });
};

export const getProduct = (id) => (dispatch) => {
  dispatch({ type: PRODUCT_DETAILS_REQUEST });
  console.log("id_:", id);
  axios
    .get(`/products/${id}`)
    .then((response) => {
      const product = response.data;
      console.log("productDetails", product);
      dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: product });
    })
    .catch((error) => {
      console.log("error", error.response.data);
      const message = (error.response && error.response.data) || error.message;
      // dispatch({type: PRODUCT_DETAILS_FAILURE, payload: 'message'});
      console.log("message", message);

      dispatch({ type: PRODUCT_DETAILS_FAILURE, payload: message });
    });
};

export const createProduct = (data) => (dispatch, getState) => {
  const { userInfo } = getState().user;

  dispatch({ type: CREATE_PRODUCT_REQUEST });

  axios
    .post("/products/", data, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    })
    .then((response) => {
      dispatch({ type: CREATE_PRODUCT_SUCCESS, payload: response.data });
    })
    .catch((error) => {
      const message =
        (error.response && error.response.data.message) || error.message;
      dispatch({ type: CREATE_PRODUCT_FAILURE, payload: message });
    });
};
