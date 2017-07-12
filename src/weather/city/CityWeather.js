/**
 * Created by react on 12.07.17.
 */
import React from "react";
import OpenWeatherMap from "react-open-weather-map";

class CityWeather extends React.Component {

  render() {
    const data = {data: this.props.city};
    return (
      <th>
        <OpenWeatherMap {...data}/>
      </th>
    )
  }
}

export default CityWeather;
