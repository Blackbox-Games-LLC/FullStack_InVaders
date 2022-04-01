import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { loginUser, registerUser, clearUser } from "../redux/userReducer";

const NavBar = () => {
  const history = useHistory()
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.user);
  const [user, setUser] = useState();
  const loggedIn = useSelector((state) => state.user);

  let toggle = false

  const handleLogin = (event) => {
    if (user) {
      event.preventDefault();
      dispatch(loginUser(user));
      setUser("");
    }
  };
  const handleReg = (event) => {
    if (user) {
      event.preventDefault();
      dispatch(registerUser(user));
      setUser("");
    }
  };
  const handleLogOut = (event) => {
    event.preventDefault();
    dispatch(clearUser());
    history.push("/")
  };
  const handleChange = (event) => {
    let x = event.target.value;
    setUser(x);
  };

  const scoreToggle = (event) => {
    if (toggle === false) {
      history.push("/")
      toggle = true
    } else {
      history.push("/scores")
      toggle = false
    }
  }

  return (
    <div id="input-form">
      {!loggedIn.username ? (
        <div className="response">
          {error && error.response && (
            <div className="error">{error.response.data}</div>
          )}
          <input value={user} onChange={handleChange} placeholder="User Name" />
          <button type="submit" className="btn-lgn" onClick={handleLogin}>
            Login
          </button>
          <button type="submit" className="btn-register" onClick={handleReg}>
            Register
          </button>
        </div>
      ) : (
        <div>
          <button type="submit" className="btn-lgn" onClick={handleLogOut}>
            Logout
          </button>
          <button type="submit" onClick={scoreToggle} className="btn-register">
            Scores
          </button>
        </div>
      )}
    </div>
  );
};

export default NavBar;
