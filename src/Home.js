import React, { Component } from "react";
import WeatherTilesAggregator from "./weather/WeatherTilesAggregator";
import apiClient from "./lib/api-client";
import SearchWeather from "./weather/SearchWeather";
import LoaderWrapper from "./user-interface/Loader";
import { connect } from "react-redux";
import { fetchUserFavCitiesAction } from "./actions/user-action";

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
];

const WEATHER_FOR_SEVERAL_CITIES_URL = "/group?units=metric&";

class Home extends Component {
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

  getFromFavoriteIfExists = cityName => {
    return this.props.favCities.filter(favCity => favCity.name === cityName)[0];
  };

  mergeCities(favCity, pubCity) {
    if (favCity === undefined) {
      return {
        ...pubCity,
        favCity: null
      };
    }
    return {
      ...pubCity,
      favCity: favCity
    };
  }

  mergeFavWithPublicCities = pubCities => {
    return pubCities.map(pubCity => {
      const favCity = this.getFromFavoriteIfExists(pubCity.name);
      return this.mergeCities(favCity, pubCity);
    });
  };

  changeLoaderVisibility = () => {
    this.setState({
      loading: !this.state.loading
    });
  };

  fetchWeatherForCities = () => {
    this.changeLoaderVisibility();
    apiClient
      .get(this.prepareUrl())
      .then(response => {
        this.setState({
          cities: this.mergeFavWithPublicCities(response.data.list)
        });
        this.changeLoaderVisibility();
      })
      .catch(error => {
        console.log(
          "Error occurred during fetching weather for cities: " + error
        );
        this.changeLoaderVisibility();
      });
  };

  fetchFavCities = () => {
    if (this.props.userId !== "") {
      this.props.dispatch(fetchUserFavCitiesAction());
    }
  }

  componentDidMount() {
    this.fetchWeatherForCities();
    this.fetchFavCities();
  }

  renderLoader = () => {
    return <LoaderWrapper />;
  };

  renderComponent = () => {
    return (
      <div>
        <WeatherTilesAggregator
          weatherItems={this.state.cities}
          draggable={false}
          locallyRemoved={false}
        />
      </div>
    );
  };

  render() {
    return (
      <div>
        <div className="row">
          <SearchWeather />
        </div>
        <div className="row">
          {this.state.loading ? this.renderLoader() : this.renderComponent()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = currentState => {
  return {
    favCities: currentState.session.userCities,
    userId: currentState.session.user.userId
  };
};

export default connect(mapStateToProps)(Home);
