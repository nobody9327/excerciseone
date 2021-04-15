import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router";

function PrivateRoute({ component: Component, ...rest }) {
  const user = useSelector((state) => state.user);
  const { userInfo } = user;

  return (
    <Route
      {...rest}
      render={(props) => {
        if (userInfo && userInfo.name) {
          console.log("userInfo", userInfo.name);
          return <Component {...props}></Component>;
        } else {
          console.log("redirect");
          return <Redirect to="/sign-in" />;
        }
      }}
    ></Route>
  );
}

export default PrivateRoute;
