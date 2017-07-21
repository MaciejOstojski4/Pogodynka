import React, { Component, PropTypes } from "react";
import SearchWeather from "../weather/SearchWeather";
import SimpleMapExample from "./mapa";
import MarkerClustererExample from "./mapaMark";
class Container extends Component {
  render() {
    return (
      <div>
        <div className="row">
          <SearchWeather />

          <MarkerClustererExample />
        </div>
      </div>
    );
  }
}

export default Container;
