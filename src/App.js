import React, { Component } from "react";
import "./App.css";
import { Router, Route, IndexRoute, Link, hashHistory } from "react-router";
import { Home } from "./Home";
import Layout from "./Layout";
import WeatherDetails from "./weather/WeatherDetails";
import styled from "styled-components";

class App extends Component {
  render() {
    return (
      <Container className="container">
        <Router history={hashHistory}>
          <Route path="/" component={Layout}>
            <IndexRoute component={Home} />
            <Route component={WeatherDetails} path="weatherdetails" />
          </Route>
        </Router>
      </Container>
    );
  }
}

const Container = styled.div`
  background-image: url(http://i.stack.imgur.com/oslRB.png);
  padding-left: 25px;
  padding-right: 25px;
  padding-bottom: 25px;
  height: 100%;
`;

export default App;
