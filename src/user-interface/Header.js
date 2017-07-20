/**
 * Created by react on 14.07.17.
 */
import React from "react";
import { Link } from "react-router";
import styled from "styled-components";

class Header extends React.Component {
  render() {
    return (
      <NavbarContainer className="container">
        <Navbar className="navbar navbar-inverse">
          <div className="navbar-header">
            <a
              className="navbar-brand"
              style={{
                color: "#cddc39"
              }}
            >
              Pogodynka
            </a>
          </div>
          <ul className="nav navbar-nav">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="weatherdetails">Weather Details</Link>
            </li>
          </ul>
        </Navbar>
      </NavbarContainer>
    );
  }
}

const Navbar = styled.nav`
  background-color: #000000; /*827717;*/
  border-radius: 0px;
  border-color: #9e9d24;
  box-shadow: 2px 2px 4px grey;
  font-size: 120%;
`;

const NavbarContainer = styled.div`
  background-color: white;
`;

export default Header;
