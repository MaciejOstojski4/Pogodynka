/**
 * Created by react on 13.07.17.
 */
import React from "react";
import Search from "./Search";

class Layout extends React.Component {
  render() {
    return (
      <div className="container">
        <Search />
        {this.props.children}
      </div>
    );
  }
}

export default Layout;
