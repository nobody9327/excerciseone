import {
  FETCH_USERS_FAILURE,
  FETCH_USERS_REQUEST,
  FETCH_USERS_SUCCESS,
  SIGN_IN_FAILURE,
  SIGN_IN_REQUEST,
  SIGN_IN_SUCCESS,
  SIGN_OUT,
  UPDATE_SHIPPING_ADDRESS_FAILURE,
  UPDATE_SHIPPING_ADDRESS_REQUEST,
  UPDATE_SHIPPING_ADDRESS_SUCCESS,
  UPDATE_USER_PROFILE_FAIL,
  UPDATE_USER_PROFILE_REQUEST,
  UPDATE_USER_PROFILE_SUCCESS,
} from "./constants";

export const userReducer = (state = {}, action) => {
  switch (action.type) {
    case SIGN_IN_REQUEST:
      return {
        ...state,
        loading: true,
        error: "",
      };
    case SIGN_IN_SUCCESS:
      return {
        ...state,
        loading: false,
        userInfo: action.payload,
      };

    case SIGN_IN_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case UPDATE_USER_PROFILE_REQUEST:
      return {
        ...state,
        loading: true,
        error: "",
      };

    case UPDATE_USER_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        userInfo: action.payload,
      };

    case UPDATE_USER_PROFILE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case SIGN_OUT:
      return {};

    default:
      return state;
  }
};

export const usersReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_USERS_REQUEST:
      return {
        ...state,
        loading: true,
        error: "",
      };

    case FETCH_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        users: action.payload,
      };

    case FETCH_USERS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
