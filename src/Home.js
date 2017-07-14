import React, { Component } from "react";
import WeatherCardAggregator from "./weather/WeatherCardAggregator";
import WeatherBox from "./weather/WeatherBox";
import apiClient from "./lib/api-client";
import SearchWeather from "./weather/SearchWeather";

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
      cities: [],
    };
  }

  fetchWeatherForCities = () => {
    const urlWithCitiesIds =
      WEATHER_FOR_SEVERAL_CITIES_URL + "&id=" + this.state.cityIds.join(",");
    apiClient
      .get(urlWithCitiesIds)
      .then(response => {
        this.setState({
          cities: response.data.list,
        });
      })
      .catch(error => {
        console.log(
          "Error occurred during fetching weather for cities: " + error,
        );
      });
  };

  componentDidMount() {
    this.fetchWeatherForCities();
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <SearchWeather />
        </div>
        <div className="row">
          <WeatherCardAggregator weatherItems={this.state.cities} />
        </div>
        <div className="row">
          <WeatherBox />
        </div>
      </div>
    );
  }
}

const WEATHER_FOR_SEVERAL_CITIES_URL = "/group?units=metric";

export default Home;
