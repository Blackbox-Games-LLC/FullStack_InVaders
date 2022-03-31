import React, { Component } from 'react'
import Home from './components/Home';
import NavBar from './components/NavBar';

/**
 * COMPONENT
 */
export default class Routes extends Component {

  render() {
    return (
      <div>
        <NavBar />
        <Home />
      </div>
    )
  }
}


