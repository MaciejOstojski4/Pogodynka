// czym jest 'Container'?
import React, { Component, PropTypes } from "react";
import SearchWeather from "../weather/SearchWeather";
// nieuzywany komponent
import SimpleMapExample from "./mapa";
// nie uzywamy w kodzie polskich nazw
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
