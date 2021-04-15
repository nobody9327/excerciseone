import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getCart } from "../redux/cart/actions";
import { fetchShippingAddress, signin } from "../redux/user/actions";

function SigninScreen(props) {
  const redirect =
    (props.location.search && props.location.search.split("=")[1]) || "/";

  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const user = useSelector((state) => state.user);
  const { userInfo } = user;
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(signin({email, password}));
    // dispatch(getCart(userInfo.token));
  };

  useEffect(() => {
    if (userInfo && userInfo.name) {
      props.history.push(redirect);
    }
  }, [props.history, userInfo, redirect]);

  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Sign In</h1>
        </div>
        <div>
          <label htmlFor="email">Email address</label>
          <input
            id="email"
            name="email"
            value={email}
            placeholder="Enter email"
            type="email"
            onChange={(e) => setemail(e.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            value={password}
            placeholder="Enter password"
            type="password"
            onChange={(e) => setpassword(e.target.value)}
          ></input>
        </div>
        <div>
          <label></label>
          <button className="primary block" type="submit">
            Sign In
          </button>
        </div>
        <div>
          <label></label>
          <div>
            New customer? <Link to="/signup">Create your account</Link>
          </div>
        </div>
      </form>
    </div>
  );
}

export default SigninScreen;
