/**
 * Created by react on 13.07.17.
 */
import React from "react";
import SearchWeather from "./weather/SearchWeather";

class Layout extends React.Component {
  render() {
    return (
      <div className="container">
        <SearchWeather />
        {this.props.children}
      </div>
    );
  }
}

export default Layout;
