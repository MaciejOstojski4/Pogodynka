import React, { Component, PropTypes } from 'react';
import WeatherAggregator from "./weather/WeatherAggregator";

export class Home extends Component {
  render() {
    return (
      <WeatherAggregator/>
    );
  }
}

export default Home;
