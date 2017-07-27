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
    this.props.router.push("weatherdetails/" + cityName);
  };

  prepareUrl = () => {
    return `${SEARCH_URL}q=${this.props.params.cityName}`;
  };
  fillStateAfterFetched = response => {
    console.log(response.data);
    this.setState({
      mapData: [
        {
          showInfo: false,
          coord: {
            lat: response.data.city.coord.lat,
            lon: response.data.city.coord.lon
          },
          name: response.data.city.name,
          weather: [{ icon: response.data.list[0].weather[0].icon }],
          main: {
            temp: response.data.list[0].main.temp,
            pressure: response.data.list[0].main.pressure,
            humidity: response.data.list[0].main.humidity
          },
          id: response.data.city.id
        }
      ]
    });
    console.log(this.state.mapData);
  };

  fetchWeatherForSingleCity = () => {
    const url = this.prepareUrl();
    console.log(url);
    apiClient
      .get(url)
      .then(response => {
        this.fillStateAfterFetched(response);
        console.log(response);
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
    console.log(response.data);
    this.setState({
      mapData: response.data.list.map(p => {
        return { ...p, showInfo: false };
      })
    });
    console.log(this.state.mapData);
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
    if (this.props.params.cityName !== undefined) {
      this.fetchWeatherForSingleCity();
    } else {
      this.fetchWeatherForCities();
    }
  }
  render() {
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
  6458923, // Lisbon
  676742,
  8223990,
  2761333,
  1816670,
  1850147,
  2172517,
  5128581,
  4140963,
  5506956,
  5391959
];
export default MapContainer;
