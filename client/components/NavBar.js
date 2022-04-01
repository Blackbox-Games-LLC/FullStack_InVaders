import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { loginUser, registerUser, clearUser } from "../redux/userReducer";

const NavBar = () => {
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.user);
  const [user, setUser] = useState();
  const loggedIn = useSelector((state) => state.user);

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
  };
  const handleChange = (event) => {
    let x = event.target.value;
    setUser(x);
  };

  return (
    <div id="input-form">
      {!loggedIn.username ? (
        <div>
          {error && error.response && (
            <div className="error">{error.response.data}</div>
          )}
          <input value={user} onChange={handleChange} placeholder="User Name" />
          <button type="submit" className="btn-lgn" onClick={handleLogin}>
            Loggin
          </button>
          <button type="submit" className="btn-register" onClick={handleReg}>
            Register
          </button>
        </div>
      ) : (
        <div>
          <button type="submit" className="btn-lgn" onClick={handleLogOut}>
            Loggout
          </button>
          <NavLink to="/scores">
            <button type="submit" className="btn-lgn">
              Scores
            </button>
          </NavLink>
        </div>
      )}
    </div>
  );
};

export default NavBar;
