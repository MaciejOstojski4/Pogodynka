import React, { Component } from "react";
import WeatherCardAggregator from "./weather/WeatherTilesAggregator";
import apiClient from "./lib/api-client";
import SearchWeather from "./weather/SearchWeather";
import Loader from "react-loader-advanced";
export class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cities: [],
      loading: false
    };
  }

  prepareUrl = () => {
    return WEATHER_FOR_SEVERAL_CITIES_URL + "id=" + initialCities.join(",");
  };

  fetchWeatherForCities = () => {
    this.setState({
      loading: true
    });
    apiClient
      .get(this.prepareUrl())
      .then(response => {
        this.setState({
          cities: response.data.list,
          loading: false
        });
      })
      .catch(error => {
        console.log(
          "Error occurred during fetching weather for cities: " + error
        );
      });
  };

  componentDidMount() {
    this.fetchWeatherForCities();
  }

  render() {
    return (
      <div>
        <div className="row">
          <SearchWeather />
        </div>
        <div className="row">
          <Loader
            show={this.state.loading}
            message={"loading"}
            foregroundStyle={{ color: "green" }}
            backgroundStyle={{ backgroundColor: "black" }}
          >
            <div>
              <WeatherCardAggregator weatherItems={this.state.cities} />
            </div>
          </Loader>
        </div>
      </div>
    );
  }
}

const initialCities = [
  6695624, // Warszawa
  2988507, // Paris
  3117735, // Madrid
  2643743, // London
  2950159, // Berlin
  703448, // Kiev
  524901, // Moscow
  2759794, // Amsterdam
  3143244, //Oslo
  6458923 // Lisbon
];

const WEATHER_FOR_SEVERAL_CITIES_URL = "/group?units=metric&";

export default Home;
