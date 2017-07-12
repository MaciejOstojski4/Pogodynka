import React, { Component } from 'react';
import './App.css';
import { Router, Route, IndexRoute, Link, hashHistory } from "react-router";
import { Search } from "./Search";
import {Home} from "./Home";

class App extends Component {
  render() {
    return (
      <div className="container">
        <Router history={hashHistory}>
          <Route path="/" component={Search}>
            <IndexRoute component={Home} />
          </Route>
        </Router>
      </div>
    );
  }
}

export default App;
