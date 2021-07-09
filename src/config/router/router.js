import React, { Component } from "react";

import { Route, Link, Switch, Redirect,BrowserRouter } from "react-router-dom";
import Home from '../../containers/home/home'

class Router extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-intro">
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Home} />
            <Redirect to="/" />
          </Switch>
        </BrowserRouter>
        </div>
      </div>
    );
  }
}

export default Router;
