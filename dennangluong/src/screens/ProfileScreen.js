import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { nobody } from "../constants/AppConstants";

function ProfileScreen(props) {
  const user = useSelector((state) => state.user);
  const { userInfo } = user;
  const dispatch = useDispatch();
  //   const profile = {};
  //   const mounted = useRef(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [sellerName, setSellerName] = useState("");
  const [sellerLogo, setSellerLogo] = useState("");
  const [description, setDescription] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    //TODO:
  };

  useEffect(() => {
    if (!user) {
      dispatch({ type: "" });
    }
    setName(userInfo.name);
    setEmail(userInfo.email);
    setPhone(userInfo.phone);
  }, []);

  return (
    <div>
      <form className="form" onSubmit={(e) => submitHandler(e)}>
        <div>
          <h1>{nobody.user.profile}</h1>
        </div>
        <div>
          <label htmlFor="name">{nobody.user.name}</label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder={nobody.user.namePlaceHolder}
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            required
            value={email}
            placeholder={nobody.user.emailPlaceHolder}
            onChange={(e) => setEmail(e.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor="phone">{nobody.user.phone}</label>
          <input
            id="phone"
            type="phone"
            required
            value={phone}
            placeholder={nobody.user.phonePlaceHolder}
            onChange={(e) => setPhone(e.target.value)}
          ></input>
        </div>
        {userInfo.isSeller && (
          <>
            <h1>Seller</h1>
            <div>
              <label htmlFor="sellerName">Seller Name</label>
              <input
                id="sellerName"
                name="sellerName"
                type="text"
                value={sellerName}
                onChange={(e) => setSellerName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="sellerLogo">Seller Logo</label>
              <input
                id="sellerLogo"
                name="sellerLogo"
                type="text"
                value={sellerLogo}
                onChange={(e) => setSellerLogo(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="description">Seller Description</label>
              <input
                id="description"
                name="description"
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </>
        )}
        <div>
          <label></label>
          <button className="primary block" type="submit">
            {nobody.user.update}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ProfileScreen;
