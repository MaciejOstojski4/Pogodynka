/**
 * Created by react on 14.07.17.
 */
import React from "react";
import {Link} from "react-router";
import styled from "styled-components";

class Header extends React.Component {
  render() {
    return (
      <div className="container">
        <Navbar className="navbar">
            <div className="navbar-header">
              <a
                className="navbar-brand"
                style={{
                  color: "white",
                }}
              >
                Pogodynka
              </a>
            </div>
            <ul className="nav navbar-nav">
              <li>
                <Link to="/" style={{ color: "white" }}>
                  Home
                </Link>
              </li>
              <li>
                <Link to="weatherdetails" style={{ color: "white" }}>
                  Weather Details
                </Link>
              </li>
            </ul>
        </Navbar>
      </div>
    );
  }
}

const Navbar = styled.div`
  background-color: #827717;
  border-radius: 0px;
  border-color:  #9e9d24;
  box-shadow: 2px 2px 4px #888888;
  font-size: 120%;
`;

export default Header;
