import React, { Component } from 'react';
import './App.css';
import WeatherAggregator from "./weather/WeatherAggregator";

class App extends Component {
  render() {
    return (
      <div className="container">
        <WeatherAggregator/>
      </div>
    );
  }
}

export default App;
