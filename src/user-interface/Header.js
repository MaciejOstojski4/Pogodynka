import React from "react";
import { Link } from "react-router";
import styled from "styled-components";
import { connect } from "react-redux";
import { logoutAction } from "../actions/user-action";

class Header extends React.Component {
  renderRegisterLink = () => {
    if (this.props.userEmail === "") {
      return <Link to="register-form">Register</Link>;
    }
  };

  renderUserSessionLink = () => {
    if (this.props.userEmail === "") {
      return <Link to="login-form">Login</Link>;
    }
    return (
      <Link to="/" onClick={() => this.props.dispatch(logoutAction())}>
        Logout
      </Link>
    );
  };

  render() {
    return (
      <NavbarContainer className="container">
        <Navbar className="navbar navbar-inverse">
          <div className="navbar-header">
            <a
              className="navbar-brand"
              style={{
                color: "#cddc39",
              }}
            >
              Pogodynka
            </a>
          </div>
          <ResponsiveList className="nav navbar-nav">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="weatherdetails">Weather Details</Link>
            </li>
            <li>
              <Link to="container">Weather Map</Link>
            </li>
            <li>
              {this.renderRegisterLink()}
            </li>
            <li>
              {this.renderUserSessionLink()}
            </li>
            <li>
              <Link to="favourite-cities">My cities</Link>
            </li>
          </ResponsiveList>
        </Navbar>
      </NavbarContainer>
    );
  }
}
const ResponsiveList = styled.ul`
  @media only screen and (max-width: 767px) {
    margin-left: 20px;
  }
`;

const Navbar = styled.nav`
  background-color: #000000;
  border-radius: 0px;
  border-color: #9e9d24;
  box-shadow: 2px 2px 4px grey;
  font-size: 120%;
`;

const NavbarContainer = styled.div`background-color: white;`;

const mapStateToProps = currentState => {
  return {
    userEmail: currentState.session.user.email,
  };
};

export default connect(mapStateToProps)(Header);
