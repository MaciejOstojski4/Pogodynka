import React, { Component } from "react";
import "./App.css";
import { hashHistory, IndexRoute, Route, Router } from "react-router";
import { Home } from "./Home";
import Layout from "./Layout";
import WeatherDetails from "./weather/WeatherDetails";
import styled from "styled-components";

class App extends Component {
  render() {
    return (
      <AppMainContainer>
        <Router history={hashHistory}>
          <Route path="/" component={Layout}>
            <IndexRoute component={Home} />
            <Route component={WeatherDetails} path="weatherdetails" />
          </Route>
        </Router>
      </AppMainContainer>
    );
  }
}

const AppMainContainer = styled.div`
  background-color: #ffffff;
  height: 100%;
  color: #1b5e20;
  min-height: 100vh;
`;

export default App;
