import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { cartReducer } from "./cart/reducers";
import { orderReducer } from "./order/reducer";
import {
  productCreateReducer,
  productReducer,
  productsReducer,
} from "./product/reducer";
import { userReducer, usersReducer } from "./user/reducers";

const reducer = combineReducers({
  productList: productsReducer,
  productDetails: productReducer,
  cart: cartReducer,
  user: userReducer,
  order: orderReducer,
  productCreate: productCreateReducer,
  listUsers: usersReducer,
});

const initialState = {
  productList: {
    products: localStorage.getItem("products")
      ? JSON.parse(localStorage.getItem("products"))
      : [],
    loading: false,
    error: "",
  },
  productDetails: { product: {}, loading: false, error: "" },
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    loading: true,
    error: "",
    shippingAddress: localStorage.getItem("shippingAddress")
      ? JSON.parse(localStorage.getItem("shippingAddress"))
      : undefined,
    updateSuccess: false,
  },
  user: {
    userInfo: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : {},
    loading: true,
    error: "",
  },
  order: {
    orderDetails: { orderItems: [], shippingAddress: {} },
    orders:
      (localStorage.getItem("orders") &&
        JSON.parse(localStorage.getItem("orders"))) ||
      [],
  },
};

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
