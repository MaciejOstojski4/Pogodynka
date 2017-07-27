import React from "react";
import { Link } from "react-router";
import styled from "styled-components";
import { connect } from "react-redux";
import { logoutAction } from "../actions/user-action";

class Header extends React.Component {
  renderRegisterLink = () => {
    if (!this.isUserLogged()) {
      return <Link to="register-form">Register</Link>;
    }
  };

  renderUserSessionLink = () => {
    if (!this.isUserLogged()) {
      return <Link to="login-form">Login</Link>;
    }
    return (
      <Link to="/" onClick={() => this.props.dispatch(logoutAction())}>
        Logout
      </Link>
    );
  };

  renderFavouriteCitiesLink = () => {
    if (this.isUserLogged()) {
      return <Link to="user/favourite-cities">My cities</Link>;
    }
  };

  isUserLogged = () => {
    return this.props.userEmail !== "";
  };

  render() {
    return (
      <NavBarContainer className="container">
        <NavBar className="navbar navbar-inverse">
          <div className="navbar-header">
            <Anchor className="navbar-brand">Pogodynka</Anchor>
          </div>
          <ResponsiveList className="nav navbar-nav">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="mapcontainer">Weather Map</Link>
            </li>
            <li>
              {this.renderFavouriteCitiesLink()}
            </li>
            <li>
              {this.renderRegisterLink()}
            </li>
            <li>
              {this.renderUserSessionLink()}
            </li>
          </ResponsiveList>
        </NavBar>
      </NavBarContainer>
    );
  }
}

const Anchor = styled.a`color: #cddc39;`;

const ResponsiveList = styled.ul`
  @media only screen and (max-width: 767px) {
    margin-left: 20px;
  }
`;

const NavBar = styled.nav`
  background-color: #000000;
  border-radius: 0px;
  border-color: #9e9d24;
  box-shadow: 2px 2px 4px grey;
  font-size: 120%;
`;

const NavBarContainer = styled.div`background-color: white;`;

const mapStateToProps = currentState => {
  return {
    userEmail: currentState.session.user.email,
  };
};

export default connect(mapStateToProps)(Header);
