import React, { Component } from "react";
import WeatherCardAggregator from "./weather/WeatherTilesAggregator";
import apiClient from "./lib/api-client";
import SearchWeather from "./weather/SearchWeather";
import LoaderWrapper from "./user-interface/Loader";
import { connect } from "react-redux";

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cities: [],
      loading: false,
    };
  }

  prepareUrl = () => {
    return WEATHER_FOR_SEVERAL_CITIES_URL + "id=" + initialCities.join(",");
  };

  renderLoader = () => {
    return <LoaderWrapper />;
  };

  renderComponent = () => {
    return (
      <div>
        <WeatherCardAggregator weatherItems={this.state.cities} />
      </div>
    );
  };

  mergeFavWithPublicCities = pubCities => {
    console.log(this.props.favCities);
    return pubCities.map(city => {
      const userCity = this.props.favCities.filter(c => c.name === city.name)[0];
      if (userCity === undefined) {
        return {
          ...city,
          favCity: {
            name: "",
          },
        };
      }
      return {
        ...city,
        favCity: {
          name: userCity.name,
        },
      };
    });
  };

  fetchWeatherForCities = () => {
    this.setState({
      loading: true,
    });
    apiClient
      .get(this.prepareUrl())
      .then(response => {
        const test = this.mergeFavWithPublicCities(response.data.list);
        console.log(test);
        this.setState({
          cities: test,
          loading: false,
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

const mapStateToProps = currentState => {
  console.log(currentState);
  return {
    favCities: currentState.session.userCities,
    userId: currentState.session.user.userId,
  };
};

export default connect(mapStateToProps)(Home);
