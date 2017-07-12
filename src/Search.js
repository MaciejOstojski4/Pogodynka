import React, { Component, PropTypes } from "react";
import { Link } from "react-router";

export class Search extends Component {
  render() {
    return (
      <div>
        <div>Search</div>
        <div><Link to="/weatherdetails">det</Link></div>

        <div className="container">
          {React.Children.map(this.props.children, c =>
            React.cloneElement(c, { clickPage: () => {} })
          )}
        </div>
      </div>
    );
  }
}

export default Search;
