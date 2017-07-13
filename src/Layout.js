import React from "react";
import { Link } from "react-router";
import Search from "./Search";

class Layout extends React.Component {
  render() {
    const qwe = {
      backgroundColor: "#faebd7",

    };

    return (
      <div className="container">
        <div>
          <nav style={qwe} className="navbar navbar-inverse ">
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
                  <li>qwe</li>
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
