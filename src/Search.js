import React, { Component, PropTypes } from "react";

export class Search extends Component {
  render() {
    return (
      <div>
        <div>Search</div>
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
