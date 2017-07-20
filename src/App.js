import React, { Component } from "react";
import "./App.css";
import { hashHistory, IndexRoute, Route, Router } from "react-router";
import { Home } from "./Home";
import Layout from "./Layout";
import WeatherDetails from "./weather/WeatherDetails";
import styled from "styled-components";
import RegisterForm from "./user/form/registerForm";

class App extends Component {
  render() {
    return (
      <AppMainContainer>
        <Router history={hashHistory}>
          <Route path="/" component={Layout}>
            <IndexRoute component={Home} />
            <Route component={WeatherDetails} path="weatherdetails" />
            <Route path="register-form" component={RegisterForm} />
          </Route>
        </Router>
      </AppMainContainer>
    );
  }
}

const AppMainContainer = styled.div`
  background-image: url(http://img.freepik.com/free-vector/grey-linen-texture-background_1053-253.jpg?size=338&ext=jpg);
  height: 100%;
  color: #1b5e20;
  min-height: 100vh;
`;

export default App;
