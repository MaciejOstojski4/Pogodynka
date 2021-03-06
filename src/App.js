import React, { Component } from "react";
import "./App.css";
import { hashHistory, IndexRoute, Route, Router } from "react-router";
import Home from "./Home";
import Layout from "./Layout";
import WeatherDetails from "./weather/WeatherDetails";
import styled from "styled-components";
import MapContainer from "./maps/MapContainer";
import RegisterForm from "./user/form/RegisterForm";
import LoginForm from "./user/form/LoginForm";
import FavouriteCities from "./weather/FavouriteCities";
import weather from "./weather.png";

class App extends Component {
  authenticateUser = (nextState, replace) => {
    const state = this.props.store.getState();
    if (state.session.user.token === "") {
      replace({
        pathname: "login-form",
      });
    }
  };

  render() {
    return (
      <AppMainContainer>
        <Router history={hashHistory}>
          <Route path="/" component={Layout}>
            <IndexRoute component={Home} />
            <Route component={WeatherDetails} path="weatherdetails/:cityName" />
            <Route component={MapContainer} path="mapcontainer/:cityName" />
            <Route component={MapContainer} path="mapcontainer" />
            <Route path="register-form" component={RegisterForm} />
            <Route path="login-form" component={LoginForm} />
          </Route>
          <Route path="user" onEnter={this.authenticateUser} component={Layout}>
            <Router path="favourite-cities" component={FavouriteCities} />
          </Route>
        </Router>
      </AppMainContainer>
    );
  }
}

const AppMainContainer = styled.div`
  background: url("${weather}");
  height: 100%;
  color: #1b5e20;
  min-height: 100vh;
`;

export default App;
