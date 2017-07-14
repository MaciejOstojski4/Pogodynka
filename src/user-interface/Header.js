/**
 * Created by react on 14.07.17.
 */
import React from "react";
import { Link } from "react-router";
import SearchWeather from "../weather/SearchWeather";
import styled from "styled-components";

class Header extends React.Component {
  render() {
    return (
      <div>
        <Navbar className="navbar navbar-default ">
          <div className="container-fluid">
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
          </div>
        </Navbar>
      </div>
    );
  }
}

const Navbar = styled.nav`
  background-color: #01579b;
  border-radius: 0px;
  border-color: #01579b;
  box-shadow: 2px 2px 4px #888888;
  color: white;
  font-size: 120%;
`;

export default Header;
