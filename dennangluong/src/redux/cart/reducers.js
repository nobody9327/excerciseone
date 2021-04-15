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
} from "./constants";

export const cartReducer = (state = {}, action) => {
  switch (action.type) {
    case CART_UPDATE_REQUEST:
      return {
        ...state,
        loading: true,
        error: "",
      };

    case CART_UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        cartItems: action.payload,
      };

    case CART_UPDATE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case FETCH_CART_REQUEST:
      return {
        ...state,
        loading: true,
        error: "",
      };

    case FETCH_CART_SUCCESS:
      return {
        ...state,
        loading: false,
        cartItems: action.payload,
      };

    case FETCH_CART_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case UPDATE_SHIPPING_ADDRESS_REQUEST:
      return {
        ...state,
        loading: true,
        error: "",
      };

    case UPDATE_SHIPPING_ADDRESS_SUCCESS:
      return {
        ...state,
        loading: false,
        shippingAddress: action.payload,
      };

    case UPDATE_SHIPPING_ADDRESS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case SAVE_PAYMENT_METHOD_REQUEST:
      return {
        ...state,
        paymentMethod: action.payload,
      };

    case EMPTY_CART_REQUEST:
      return {
        ...state,
        loading: true,
        error: "",
      };

    case EMPTY_CART_SUCCESS:
      return {
        ...state,
        cartItems: [],
        loading: false,
      };

    case EMPTY_CART_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
