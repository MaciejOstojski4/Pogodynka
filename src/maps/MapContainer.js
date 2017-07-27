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
      mapData: { ...response.data, showInfo: true }
    });
  };

  fetchWeather = () => {
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

  isForecastFetched = () => {
    return this.state.mapData !== null;
  };

  renderMapContainer() {
    if (this.isForecastFetched()) {
      return (
        <div>
          <div className="row">
            <SearchWeather />
            <MapWithMarkers
              markers={this.state.mapData}
              markerClick={this.markerClick}
              popUpHide={this.popUpHide}
              onInfoWindowClick={this.infoWindowClick}
            />
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
    this.fetchWeather();
  }
  render() {
    console.log(this.state.mapData);
    return this.renderMapContainer();
  }
}

const SEARCH_URL = "forecast?units=metric&";
export default MapContainer;
