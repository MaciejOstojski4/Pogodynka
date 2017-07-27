import React, { Component } from "react";
import SearchWeather from "../weather/SearchWeather";
import MapWithMarkers from "./MapWithMarkers";
import WeatherDetails from "../weather/WeatherDetails";
import apiClient from "../lib/api-client";
import { withRouter } from "react-router";

class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mapData: null,
      errorInfo: ""
    };
  }
  markerClick = marker => {
    this.setState({
      mapData: { ...this.state.mapData, showInfo: true }
    });
  };

  popUpHide = marker => {
    this.setState({
      mapData: { ...this.state.mapData, showInfo: false }
    });
  };

  infoWindowClick = cityName => {
    this.props.router.push("weatherdetails/" + cityName);
  };

  prepareUrl = () => {
    return `${SEARCH_URL}q=${this.props.params.cityName}`;
  };
  fillStateAfterFetched = response => {
    this.setState({
      mapData: [{ ...response.data, showInfo: false }]
    });
  };

  fetchWeatherForSingleCity = () => {
    const url = this.prepareUrl();
    console.log(url);
    apiClient
      .get(url)
      .then(response => {
        this.fillStateAfterFetched(response);
      })
      .catch(error => {
        console.log(error);
        this.setState({
          errorInfo: "Cannot find this city"
        });
      });
  };
  prepareUrlForCities = () => {
    return WEATHER_FOR_SEVERAL_CITIES_URL + "id=" + initialCities.join(",");
  };
  fetchWeatherForCities = () => {
    apiClient
      .get(this.prepareUrlForCities())
      .then(response => {
        this.fillStateAfterFetchedMultipleCities(response);
      })
      .catch(error => {
        console.log(
          "Error occurred during fetching weather for cities: " + error
        );
      });
  };
  fillStateAfterFetchedMultipleCities = response => {
    this.setState({
      mapData: { ...response.data.list, showInfo: false }
    });
  };
  isForecastFetched = () => {
    return this.state.mapData !== null;
  };

  renderMapContainer() {
    if (this.isForecastFetched()) {
      return (
        <div>
          <div className="row">
            <SearchWeather />
          </div>
        </div>
      );
    } else {
      return (
        <div className="col-md-12 text-center">
          <h2>
            {this.state.errorInfo}
          </h2>
        </div>
      );
    }
  }
  componentDidMount() {
    if (this.props.params.cityName !== undefined) {
      this.fetchWeatherForSingleCity();
    } else {
      this.fetchWeatherForCities();
    }
  }
  render() {
    console.log(this.state.mapData);
    return this.renderMapContainer();
  }
}
const WEATHER_FOR_SEVERAL_CITIES_URL = "/group?units=metric&";
const SEARCH_URL = "forecast?units=metric&";
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
export default MapContainer;
