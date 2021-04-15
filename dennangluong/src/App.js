import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Link, Route } from "react-router-dom";
import AdminRoute from "./components/AdminRoute";
import PrivateRoute from "./components/PrivateRoute";
import { nobody } from "./constants/AppConstants";
import {
  clearCart,
  emptyCart,
  fetchShippingAddress,
  getCart,
} from "./redux/cart/actions";
import { signout } from "./redux/user/actions";
import CartScreens from "./screens/CartScreens";
import HomeScreen from "./screens/HomeScreen";
import OrderHistoryScreen from "./screens/OrderHistoryScreen";
import OrderScreen from "./screens/OrderScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import ProductsAministration from "./screens/ProductsAministration";
import ProductScreen from "./screens/ProductScreen";
import ShippingScreen from "./screens/ShippingScreen";
import SigninScreen from "./screens/SigninScreen";
import SignupScreen from "./screens/SignupScreen";
import UpdateProductScreen from "./screens/UpdateProductScreen";
import UserProfileScreen from "./screens/UserProfileScreen";

function App() {
  const user = useSelector((state) => state.user);
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const { userInfo } = user;
  const dispatch = useDispatch();

  const signoutHandler = (e) => {
    e.preventDefault();
    dispatch(signout());
    dispatch(clearCart());
    // props.history.push('/');
  };
  document.title = "Đèn năng lượng mặt trời";

  useEffect(() => {
    if (userInfo && userInfo.token) {
      Promise.resolve(dispatch(getCart(userInfo.token))).then(
        dispatch(fetchShippingAddress(userInfo.token))
      );
    }
  }, [dispatch, userInfo]);

  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="row">
          <a href="/" className="brand">
            {nobody.brandName}
          </a>
          <div>
            <Link to="/cart">
              {`${nobody.header.cart} `}
              <span className="badge">
                {(cartItems && cartItems.length) || 0}
              </span>
            </Link>

            {userInfo && userInfo.name ? (
              <div className="dropdown">
                <Link to="#">
                  {userInfo.name} <i className="fa fa-caret-down"></i>
                </Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/profile">{nobody.header.profile}</Link>
                  </li>
                  <li>
                    <Link to="/orderhistory">{nobody.header.orderhistory}</Link>
                  </li>
                  {userInfo.isAdmin && (
                    <>
                      <li>
                        <Link to="/dashboard">dashboard</Link>
                      </li>
                      <li>
                        <Link to="/admin/products">
                          {nobody.header.products}
                        </Link>
                      </li>
                      <li>
                        <Link to="/users">{nobody.header.users}</Link>
                      </li>
                      <li>
                        <Link to="/orders">{nobody.header.orders}</Link>
                      </li>
                    </>
                  )}
                  <li>
                    <Link to="/" onClick={signoutHandler}>
                      {nobody.header.signout}
                    </Link>
                  </li>
                </ul>
              </div>
            ) : (
              <Link to="/sign-in">{nobody.header.signin}</Link>
            )}
          </div>
        </header>
        <main>
          {/* <MessageBox></MessageBox> */}
          <PrivateRoute
            path="/profile"
            component={UserProfileScreen}
          ></PrivateRoute>
          <PrivateRoute
            path="/orderhistory"
            component={OrderHistoryScreen}
          ></PrivateRoute>
          <PrivateRoute
            path="/orders/:id"
            component={OrderScreen}
          ></PrivateRoute>
          <PrivateRoute path="/cart" component={CartScreens}></PrivateRoute>
          <PrivateRoute
            path="/place-order"
            component={PlaceOrderScreen}
          ></PrivateRoute>
          <PrivateRoute
            path="/payment"
            component={PaymentScreen}
          ></PrivateRoute>
          <PrivateRoute
            path="/shipping"
            component={ShippingScreen}
          ></PrivateRoute>
          <AdminRoute
            path="/admin/products"
            component={ProductsAministration}
          ></AdminRoute>
          <AdminRoute path="/admin/product" component={UpdateProductScreen}></AdminRoute>

          <Route path="/signup" component={SignupScreen}></Route>
          <Route path="/sign-in" component={SigninScreen}></Route>
          <Route
            path="/products/:id"
            component={ProductScreen}
            exact
          ></Route>
          <Route path="/" exact component={HomeScreen}></Route>
        </main>
        <footer className="row center">
          <span>{nobody.footer}</span>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
