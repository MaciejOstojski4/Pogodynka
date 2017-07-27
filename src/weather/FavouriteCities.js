import React from "react";
import { connect } from "react-redux";
import apiClient from "../lib/api-client";
import WeatherTilesAggregator from "./WeatherTilesAggregator";
import SearchWeather from "./SearchWeather";
import LoaderWrapper from "../user-interface/Loader";

const WEATHER_FOR_SEVERAL_CITIES_URL = "/group?units=metric&";

class FavouriteCities extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      favCitiesWeather: [],
      loading: false,
    }
  }

  changeLoaderVisibility = () => {
    this.setState({
      loading: !this.state.loading,
    });
  };

  createUrl = () => {
    const favCitiesIds = this.props.favCities.map(favCity => {
      return favCity.external_id
    });
    return `${WEATHER_FOR_SEVERAL_CITIES_URL}id=${favCitiesIds.join(",")}`
  };

  getFromFavoriteIfExists = cityName => {
    return this.props.favCities.filter(favCity => favCity.name === cityName)[0];
  };

  mergeCities(favCity, pubCity) {
    if (favCity === undefined) {
      return {
        ...pubCity,
        favCity: null,
      };
    }
    return {
      ...pubCity,
      favCity: favCity,
    };
  }

  mergeFavWithPublicCities = pubCities => {
    return pubCities.map(pubCity => {
      const favCity = this.getFromFavoriteIfExists(pubCity.name);
      return this.mergeCities(favCity, pubCity);
    });
  };

  fetchWeatherForFavCities = () => {
    this.changeLoaderVisibility();
    const url = this.createUrl();
    apiClient
      .get(url)
      .then(response => {
        this.setState({
          favCitiesWeather: this.mergeFavWithPublicCities(response.data.list),
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

  renderLoader = () => {
    return <LoaderWrapper />;
  };

  renderComponent = () => {
    return (
    <div className="row">
      <WeatherTilesAggregator weatherItems={this.state.favCitiesWeather} locallyRemoved={true}/>
    </div>
    )
  };

  render() {
    return (
      <div>
        <div className="row">
          <SearchWeather />
        </div>
        {this.state.loading ? this.renderLoader() : this.renderComponent()}
      </div>
    )
  }
}

const mapStateToProps = currentState => {
  return {
    favCities: currentState.session.userCities,
  };
};

export default connect(mapStateToProps)(FavouriteCities);
