import React, { Component } from "react";
import SearchWeatherWithoutPush from "../weather/SearchWeatherWithoutPush";
import SearchWeather from "../weather/SearchWeather";
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
