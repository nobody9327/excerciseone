import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function UserProfileScreen(props) {
  const user = useSelector((state) => state.user);
  const { userInfo } = user;
  const [name, setName] = useState(userInfo.name);
  const [email, setEmail] = useState(userInfo.email);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [disabled, setdisabled] = useState(true);
  const dispatch = useDispatch();

  const updateUserProfile = () => {
    //TODO:
  };
  const mouted = useRef();

  useEffect(() => {
    if (!mouted.current) {
      mouted.current = true;
    } else {
      setdisabled(false);
    }
  }, [name, email]);

  return (
    <div>
      <form className="form" onSubmit={updateUserProfile}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter name"
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
          />
        </div>
        
        <div>
          <label></label>
          <button type="submit" className="primary block" disabled={disabled}>
            Update
          </button>
        </div>
      </form>
    </div>
  );
}

export default UserProfileScreen;
