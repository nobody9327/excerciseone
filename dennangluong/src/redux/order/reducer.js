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
  ORDER_RESET,
} from "./constants";

export const orderReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_CREATE_REQUEST:
      return {
        ...state,
        loading: true,
        error: "",
      };

    case ORDER_CREATE_SUCCESS:
      return {
        ...state,
        loading: false,
        orderDetails: action.payload,
        success: true,
      };

    case ORDER_CREATE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case FETCH_ORDER_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
        error: "",
      };

    case FETCH_ORDER_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        orderDetails: action.payload,
      };

    case FETCH_ORDER_DETAILS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case FETCH_ORDERS_LIST_REQUEST:
      return {
        ...state,
        loading: true,
        error: "",
      };

    case FETCH_ORDERS_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        orders: action.payload,
      };

    case FETCH_ORDERS_LIST_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case ORDER_RESET:
      return {};

    default:
      return state;
  }
};
