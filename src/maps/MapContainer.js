import React, { Component } from "react";
import SearchWeather from "../weather/SearchWeather";
import MapWithMarkers from "./MapWithMarkers";
import { connect } from "react-redux";
import WeatherDetails from "../weather/WeatherDetails";
import apiClient from "../lib/api-client";
import { changeDisplayedDetailsAction } from "../actions/weather-actions";
class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mapData: this.props.data
    };
  }
  markerClick = marker => {
    const temp = this.state.mapData;
    temp.map(p => {
      if (p === marker) {
        p.showInfo = true;
      }
      this.setState({
        mapData: temp
      });
    });
  };
  popUpHide = marker => {
    const temp = this.state.mapData;
    temp.map(p => {
      if (p === marker) {
        p.showInfo = false;
      }
      this.setState({
        mapData: temp
      });
    });
  };

  infoWindowClick = cityName => {
    this.props.router.push("weatherdetails/"+cityName);
  };

  render() {
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
  }
}
const mapStateToProps = currentState => {
  return {
    data: currentState.weather.savedWeather
  };
};
const SEARCH_URL = "forecast?units=metric&";
export default connect(mapStateToProps)(MapContainer);
