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
import OrdersAdministration from "./screens/admin/OrdersAdministration";
import ProductsAministration from "./screens/admin/ProductsAministration";
import UpdateProductScreen from "./screens/admin/UpdateProductScreen";
import UserAdministration from "./screens/admin/UserAdministration";
import SigninScreen from "./screens/authen/SigninScreen";
import SignupScreen from "./screens/authen/SignupScreen";
import CartScreens from "./screens/CartScreens";
import OrderDetailsScreen from "./screens/checkout/OrderDetailsScreen";
import PaymentScreen from "./screens/checkout/PaymentScreen";
import PlaceOrderScreen from "./screens/checkout/PlaceOrderScreen";
import ShippingScreen from "./screens/checkout/ShippingScreen";
import HomeScreen from "./screens/HomeScreen";
import OrderHistoryScreen from "./screens/OrderHistoryScreen";
import OrderScreen from "./screens/OrderScreen";
import ProductDetailsScreen from "./screens/product/ProductDetailsScreen";
import ProductScreen from "./screens/ProductScreen";
import ProfileScreen from "./screens/ProfileScreen";
import TestProductScreen from "./test/TestProductScreen";
// import UserProfileScreen from "./screens/UserProfileScreen";

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
      dispatch(getCart());
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
            {(!userInfo || !userInfo.isAdmin) && (
              <Link to="/cart">
                {`${nobody.header.cart} `}
                <span className="badge">
                  {(cartItems && cartItems.length) || 0}
                </span>
              </Link>
            )}

            {userInfo && userInfo.name ? (
              <div className="dropdown">
                <Link to="#">
                  {userInfo.name} <i className="fa fa-caret-down"></i>
                </Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/profile">{nobody.header.profile}</Link>
                  </li>

                  {!userInfo.isAdmin && (
                    <li>
                      <Link to="/orderhistory">
                        {nobody.header.orderhistory}
                      </Link>
                    </li>
                  )}

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
                        <Link to="/admin/users">{nobody.header.users}</Link>
                      </li>
                      <li>
                        <Link to="/admin/orders">{nobody.header.orders}</Link>
                      </li>
                    </>
                  )}
                  {userInfo.isSeller && (
                    <>
                      <li>
                        <Link to="/seller/products">
                          {nobody.header.products}
                        </Link>
                      </li>
                      <li>
                        <Link to="/seller/orders">{nobody.header.orders}</Link>
                      </li>
                    </>
                  )}
                  {/* <li>
                    <a>------</a>
                  </li> */}
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
            component={ProfileScreen}
          ></PrivateRoute>
          <PrivateRoute
            path="/orderhistory"
            component={OrderHistoryScreen}
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
          <PrivateRoute
            path="/user/orders/:id"
            component={OrderDetailsScreen}
          ></PrivateRoute>

          <AdminRoute
            path="/admin/orders/:id"
            component={OrderDetailsScreen}
          ></AdminRoute>
          <AdminRoute
            path="/admin/orders"
            component={OrdersAdministration}
            exact
          ></AdminRoute>
          <AdminRoute
            path="/admin/users"
            component={UserAdministration}
          ></AdminRoute>
          <AdminRoute
            path="/admin/products"
            component={ProductsAministration}
          ></AdminRoute>
          <AdminRoute
            path="/admin/product"
            component={UpdateProductScreen}
          ></AdminRoute>

          {/* for test */}
          <AdminRoute
            path="/admin/test/product/:id"
            component={TestProductScreen}
          ></AdminRoute>
          {/* for test */}
          <Route path="/signup" component={SignupScreen}></Route>
          <Route path="/sign-in" component={SigninScreen}></Route>
          {/* <Route path="/products/:id" component={ProductScreen} exact></Route> */}
          <Route
            path="/products/:id"
            component={ProductDetailsScreen}
            exact
          ></Route>
          <Route path="/" exact component={HomeScreen}></Route>
        </main>
        <footer className="row center">
          <span>{nobody.footer.hotline}</span>
          <span>{nobody.footer.email}</span>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
