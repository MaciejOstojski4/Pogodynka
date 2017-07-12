import React, { Component, PropTypes } from "react";
import WeatherAggregator from "./weather/WeatherAggregator";

export class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cityIds: [
        6695624,
        2988507,
        3117735,
        2643743,
        2950159,
        703448,
        524901,
        2759794,
        3143244,
        6458923,
      ],
    };
  }

  render() {
    return <WeatherAggregator cityIds={this.state.cityIds} />;
  }
}

export default Home;
