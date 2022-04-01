import React, { Component } from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import Home from "./components/Home";
import Scores from "./components/Scores";
import NavBar from "./components/NavBar";
import { useSelector } from "react-redux";

/**
 * COMPONENT
 */
const Routes = () => {
  const loggedIn = useSelector((state) => state.user)

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        {loggedIn.username &&
          <Route exact path="/scores" name="Scores" component={Scores} />
        }
        <Route exact path="/" name="Home" component={Home} />
      </Switch>
    </BrowserRouter>
  );

}

export default Routes