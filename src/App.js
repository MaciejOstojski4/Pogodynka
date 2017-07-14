import React, { Component } from "react";
import "./App.css";
import { Router, Route, IndexRoute, Link, hashHistory } from "react-router";
import { Home } from "./Home";
import Layout from "./Layout";
import WeatherDetails from "./weather/WeatherDetails";

class App extends Component {
  render() {
    return (
      <div className="container">
        <Router history={hashHistory}>
          <Route path="/" component={Layout}>
            <IndexRoute component={Home} />
            <Route component={WeatherDetails} path="weatherdetails" />
          </Route>
        </Router>
      </div>
    );
  }
}

export default App;
