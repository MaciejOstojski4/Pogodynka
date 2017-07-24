import React from "react";
import { connect } from "react-redux";
import apiClient from "../lib/api-client";
import WeatherTilesAggregator from "./WeatherTilesAggregator";

class FavouriteCities extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      favCitiesWeather: []
    }
  }

  createUrl = () => {
    const favCitiesIds = this.props.favCities.map(favCity => {
      return favCity.external_id
    });
    return `${WEATHER_FOR_SEVERAL_CITIES_URL}id=${favCitiesIds.join(",")}`
  };

  fetchWeatherForFavCities = () => {
    const url = this.createUrl();
    console.log(url);
    apiClient
      .get(url)
      .then(response => {
        this.setState({
          favCitiesWeather: response.data.list,
        });
        this.changeLoaderVisibility();
      })
      .catch(error => {
        console.log(
          "Error occurred during fetching weather for cities: " + error,
        );
      });
  };

  componentDidMount() {
    this.fetchWeatherForFavCities();
  }

  render() {
    return (
      <div>
        <WeatherTilesAggregator weatherItems={this.state.favCitiesWeather}/>
      </div>
    );
  }
}

const USER_FAVOURITE_CITY_URL = "";

const mapStateToProps = currentState => {
  return {
    favCities: currentState.session.userCities,
  };
};

const WEATHER_FOR_SEVERAL_CITIES_URL = "/group?units=metric&";

export default connect(mapStateToProps)(FavouriteCities);
