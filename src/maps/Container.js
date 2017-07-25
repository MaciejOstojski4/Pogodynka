import React, { Component } from "react";
import SearchWeatherWithoutPush from "../weather/SearchWeatherWithoutPush";
import MarkerClustererExample from "./mapaMark";
class Container extends Component {
  render() {
    return (
      <div>
        <div className="row">
          <SearchWeatherWithoutPush />
          <MarkerClustererExample />
        </div>
      </div>
    );
  }
}

export default Container;
