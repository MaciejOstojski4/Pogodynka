import React from "react";
import Header from "./user-interface/Header";

class Layout extends React.Component {
  render() {
    return (
      <div className="container">
        <Header />
        {this.props.children}
      </div>
    );
  }
}

export default Layout;
