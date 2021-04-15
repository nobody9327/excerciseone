import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router";

function SellerRoute({ component: Component, ...rest }) {
  const user = useSelector((state) => state.user);
  const { userInfo } = user;

  return (
    <Route
      {...rest}
      render={(props) => {
        return userInfo.isSeller ? (
          <Component></Component>
        ) : (
          <Redirect to="/sign-in"></Redirect>
        );
      }}
    ></Route>
  );
}

export default SellerRoute;
