import {
  EMPTY_CART_FAILURE,
  EMPTY_CART_REQUEST,
  EMPTY_CART_SUCCESS,
  UPDATE,
  UPDATE_SHIPPING_ADDRESS_FAILURE,
  UPDATE_SHIPPING_ADDRESS_REQUEST,
  UPDATE_SHIPPING_ADDRESS_RESET,
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
        updateLoading: true,
        updateError: "",
      };

    case CART_UPDATE_SUCCESS:
      // if(action.payload.type === UPDATE){
      //   return {
      //     ...state,
      //     loading: false,
      //     cartItems: state.cartItems.map(item => item._id === action.pa)
      //   }
      // }
      return {
        ...state,
        updateLoading: false,
        cartItems: action.payload,
      };

    case CART_UPDATE_FAILURE:
      return {
        ...state,
        updateLoading: false,
        updateError: action.payload,
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
        cartItems: action.payload.cartItems,
        shippingAddress: action.payload.shippingAddress,
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
        addressLoading: true,
        addressError: "",
      };

    case UPDATE_SHIPPING_ADDRESS_SUCCESS:
      return {
        ...state,
        addressLoading: false,
        shippingAddress: action.payload,
        updateSuccess: true,
      };

    case UPDATE_SHIPPING_ADDRESS_FAILURE:
      return {
        ...state,
        addressLoading: false,
        addressError: action.payload,
      };

    case UPDATE_SHIPPING_ADDRESS_RESET:
      return {
        ...state,
        updateSuccess: false,
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
