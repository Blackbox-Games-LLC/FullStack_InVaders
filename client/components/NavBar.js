import React from "react";

const NavBar = () => {
    return <div id="input-form">
        <input type="text" name="name" placeholder="User Name" />
        <input type="submit" value="Log in" class="btn-lgn" name="loginButton" />
        <input type="submit" value="Register" className="btn-register" name="registerButton" />
    </div>;
};

export default NavBar