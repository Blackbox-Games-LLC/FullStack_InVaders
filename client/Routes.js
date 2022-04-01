import React, { Component } from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import Home from "./components/Home";
import Scores from "./components/Scores";
import NavBar from "./components/NavBar";

/**
 * COMPONENT
 */
export default class Routes extends Component {
  render() {
    return (
      <BrowserRouter>
        <NavBar />
        <Switch>
          <Route exact path="/scores" name="Scores" component={Scores} />
          <Route exact path="/" name="Home" component={Home} />
        </Switch>
      </BrowserRouter>
    );
  }
}
