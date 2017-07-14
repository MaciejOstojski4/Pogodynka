import React from "react";
import { Link } from "react-router";
import SearchWeather from "./weather/SearchWeather";

class Layout extends React.Component {
  render() {
    const navStyle = {
      backgroundColor: "#faebd7",

    };
const searchStyle={
  padding:"10px"
}
    return (
      <div className="container">
        <div>
          <nav style={navStyle} className="navbar navbar-inverse ">
            <div className="container-fluid">
              <div className="navbar-header"> <a className="navbar-brand">Pogodynka</a></div>
                <ul className="nav navbar-nav">
                  <li>
                    <Link to="/">Home</Link>
                  </li>
                  <li>
                    <Link to="weatherdetails">Weather Details</Link>
                  </li>
                </ul>
                <ul className="nav navbar-nav navbar-right">
                  <li style={searchStyle}><SearchWeather /></li>
                </ul>
              </div>
          </nav>
        </div>
        {this.props.children}
      </div>
    );
  }
}

export default Layout;
