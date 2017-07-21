import React, { Component, PropTypes } from "react";
import SearchWeather from "../weather/SearchWeather";
import SimpleMapExample from "./mapa";
/**
 * Container
 */
class Container extends Component {
  // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <div className="row">
          <SearchWeather />
          <SimpleMapExample />
        </div>
      </div>
    );
  }
}

export default Container;
