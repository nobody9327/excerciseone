import React, { useEffect, useState } from "react";
import GoogleLogin from "react-google-login";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { nobody } from "../../constants/AppConstants";
import { signin, signinWithFacebook, signinWithGoogle } from "../../redux/user/actions";
import FacebookLogin from "react-facebook-login";

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
    dispatch(signin({ email, password }));
    // dispatch(getCart(userInfo.token));
  };

  
  const googleLoginCb = (e) => {
    // const authData = res.getAuthResponse();
    console.log("authData", e);
    const token = e.tokenId;
    dispatch(signinWithGoogle({ token }));
    props.history.push("/");
  };

  const fbLoginCb = (e) => {
    // e.preventDefault();
    console.log("e", e);

    const token = e.accessToken;
    dispatch(signinWithFacebook({ token }));
    props.history.push("/");
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
          <h1>{nobody.authen.signin}</h1>
        </div>
        <div>
          <label htmlFor="email">{nobody.user.email}</label>
          <input
            id="email"
            name="email"
            value={email}
            placeholder={nobody.user.emailPlaceHolder}
            type="email"
            required
            onChange={(e) => setemail(e.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor="password">{nobody.authen.password}</label>
          <input
            id="password"
            name="password"
            value={password}
            placeholder={nobody.authen.passwordPlaceHolder}
            type="password"
            required
            onChange={(e) => setpassword(e.target.value)}
          ></input>
        </div>
        <div>
          <label></label>
          <button className="primary block" type="submit">
            {nobody.authen.signin}
          </button>
        </div>
        <div>
          <label></label>
          <div>
            {nobody.authen.newCustomer} <Link to="/signup">{nobody.authen.signup}</Link>
            {/* Hoặc đăng nhập với {" "} */}
            {/* <button className="small"> <span className="fa fa-google"></span> </button>{" | "}
            <button className="small"> <span className="fa fa-facebook"></span></button> */}
          </div>
          <div className="row center"  style={{marginTop: '1rem'}}>
              <div className="sso-button">
                <GoogleLogin
                  clientId="55068521511-6hdnf6uo1jduraq59ua2ftsnrreq5hsf.apps.googleusercontent.com"
                  buttonText="Đăng nhập với google"
                  onSuccess={(e) => googleLoginCb(e)}
                  // onFailure={googleLoginCb}
                  cookiePolicy={"single_host_origin"}
                  icon="false"
                />
              </div>
              <div className="sso-button">
                <FacebookLogin
                  textButton="Đăng nhập với facebook"
                  appId="748345369162882"
                  icon="fa-facebook"
                  // onSuccess={(e) => fbLoginCb(e)}
                  callback={(e) => fbLoginCb(e)}
                />
              </div>
            </div>
        </div>
      </form>
    </div>
  );
}

export default SigninScreen;
