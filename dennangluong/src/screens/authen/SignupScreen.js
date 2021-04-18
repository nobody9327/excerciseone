import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { nobody } from "../../constants/AppConstants";
import {
  signinWithFacebook,
  signinWithGoogle,
  signUp,
} from "../../redux/user/actions";
import GoogleLogin from "react-google-login";
import FacebookLogin from "react-facebook-login";

function SignupScreen(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(signUp({ email, password, name }));
    props.history.push("/");
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

  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>{nobody.authen.signup}</h1>
        </div>
        <div>
          <label htmlFor="name">
            {nobody.user.name} <span className="danger">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder={nobody.user.namePlaceHolder}
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor="email">
            {nobody.user.email}
            <span className="danger">*</span>
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            required
            placeholder={nobody.user.emailPlaceHolder}
            onChange={(e) => setEmail(e.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor="phone">
            {nobody.user.phone}
            <span className="danger">*</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="phone"
            placeholder={nobody.user.phonePlaceHolder}
            value={phone}
            required
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="address">
            {nobody.user.address}
            <span className="danger">*</span>
          </label>
          <input
            id="address"
            type="text"
            placeholder={nobody.user.addressPlaceHolder}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">
            {nobody.authen.password}
            <span className="danger">*</span>
          </label>
          <input
            id="password"
            type="password"
            value={password}
            required
            placeholder={nobody.authen.passwordPlaceHolder}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor="password">
            {nobody.authen.confirmPassword}
            <span className="danger">*</span>
          </label>
          <input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            required
            placeholder={nobody.authen.confirmPasswordPlaceHolder}
            onChange={(e) => setconfirmPassword(e.target.value)}
          ></input>
        </div>
        <div>
          <label></label>
          <button className="primary block" type="submit">
            {nobody.authen.signup}
          </button>
        </div>
        <div>
          <label></label>
          <div>
            {nobody.authen.alreadyHaveAcc}{" "}
            <Link to="/sign-in">{nobody.authen.signin}</Link> {"  "}
            {/* <div className="row center"><br/>-OR-<br/></div> */}
            
            <div className="row center" style={{marginTop: '1rem'}}>
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
            {/* <div class="g-signin2" data-onsuccess="onSignIn">h</div>{" | "}
            <button className="small"> <span className="fa fa-facebook"></span></button> */}
          </div>
        </div>
      </form>
    </div>
  );
}

export default SignupScreen;
