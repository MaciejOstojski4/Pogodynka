import React, { Component } from "react";
import { connect } from "react-redux";
import CurrentWeatherDetails from "./CurrentWeatherDetails";
import Chart from "./Chart";
import ResponsiveForecast from "./forecast/ResponsiveForecast";
import styled from "styled-components";
import SearchWeather from "./SearchWeather";
import { parseSearchedWeatherAction } from "../actions/weather-actions";
import {
  addUserCityAction,
  removeUserCityAction
} from "../actions/user-action";
import apiClient from "../lib/api-client";
import LoaderWrapper from "../user-interface/Loader";

const SEARCH_URL = "forecast?units=metric&";
const NUMBER_OF_DAYS_IN_FORECAST = 5;

class WeatherDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cityName: props.params.cityName,
      dayForecast: [],
      nightForecast: [],
      forecastForChart: [],
      errorInfo: "",
      currentForecast: {},
      chartState: "temperature",
      favCitiesWeather: null,
      favCity: {},
      loading: false
    };
  }

  changeLoaderVisibility = () => {
    this.setState({
      loading: !this.state.loading
    });
  };

  getHoursFromDate = date => {
    return date.split(" ")[1];
  };

  getDailyForecastAtHour = (hour, list) => {
    return list.filter(
      weather => this.getHoursFromDate(weather.dt_txt) === hour
    );
  };

  getForecastSinceTomorrow = forecast => {
    if (forecast.length === NUMBER_OF_DAYS_IN_FORECAST) {
      return forecast.slice(1, forecast.length);
    }
    return forecast;
  };

  parseDataForChart = list => {
    return list.map(forecast => {
      return {
        temperature: forecast.main.temp,
        pressure: forecast.main.pressure,
        humidity: forecast.main.humidity,
        time: this.getHoursFromDate(forecast.dt_txt).slice(0, 5)
      };
    });
  };

  getForecastForDay = (noDay, forecast) => {
    const startPoint = noDay * 10;
    const endPoint = startPoint + 11;
    return forecast.slice(startPoint, endPoint);
  };

  prepareDataForChart = noDay => {
    this.setState({
      forecastForChart: this.getForecastForDay(
        noDay,
        this.parseDataForChart(this.state.favCitiesWeather.list)
      )
    });
  };

  isForecastFetched = () => {
    return this.state.favCitiesWeather !== null;
  };

  setWeatherDetails = noDay => {
    this.setState({
      currentForecast: this.state.dayForecast[noDay]
    });
  };

  prepareDataAfterForecastClick = noDay => {
    this.prepareDataForChart(noDay);
    this.setWeatherDetails(noDay);
  };

  prepareUrl = () => {
    return `${SEARCH_URL}q=${this.props.params.cityName}`;
  };

  fetchWeather = () => {
    this.changeLoaderVisibility();
    const url = this.prepareUrl();
    apiClient
      .get(url)
      .then(response => {
        this.fillStateAfterFetched(response);
        this.changeLoaderVisibility();
      })
      .catch(error => {
        this.changeLoaderVisibility();
        this.setState({
          errorInfo: "Cannot find this city"
        });
      });
  };

  fillStateAfterFetched = response => {
    this.setState({
      favCitiesWeather: response.data,
      dayForecast: this.getForecastSinceTomorrow(
        this.getDailyForecastAtHour("12:00:00", response.data.list)
      ),
      nightForecast: this.getForecastSinceTomorrow(
        this.getDailyForecastAtHour("00:00:00", response.data.list)
      ),
      currentForecast: response.data.list[0],
      forecastForChart: this.getForecastForDay(
        this.props.noDay,
        this.parseDataForChart(response.data.list)
      ),
      favCity: this.getFavCityFromStore(response.data)
    });
  };

  prepareDataForComponent = () => {
    this.fetchWeather();
    if (this.state.favCitiesWeather !== null) {
      this.props.dispatch(
        parseSearchedWeatherAction(this.state.favCitiesWeather)
      );
    }
  };

  componentDidMount() {
    this.prepareDataForComponent();
  }

  pressureClick = () => {
    this.setState({
      chartState: "pressure"
    });
  };

  temperatureClick = () => {
    this.setState({
      chartState: "temperature"
    });
  };

  humidityClick = () => {
    this.setState({
      chartState: "humidity"
    });
  };

  isCityInFavourite = () => {
    if (this.isForecastFetched()) {
      const favCities = this.props.favCities.filter(
        favCity => favCity.external_id === this.state.favCitiesWeather.city.id
      );
      return favCities.length > 0;
    }
    return false;
  };

  createFavouriteCityObject = () => {
    return {
      place: {
        name: this.state.favCitiesWeather.city.name,
        external_id: this.state.favCitiesWeather.city.id,
        lat: this.state.favCitiesWeather.city.coord.lat,
        lon: this.state.favCitiesWeather.city.coord.lon,
        description: ""
      }
    };
  };

  changeFavStatusOnServer = like => {
    if (like) {
      this.addCityToFavourite();
    } else {
      this.removeCityFromFavourite();
    }
  };

  removeCityFromFavourite = () => {
    this.props.dispatch(removeUserCityAction(this.state.favCity));
  };

  addCityToFavourite = () => {
    const favCity = this.createFavouriteCityObject();
    this.props.dispatch(addUserCityAction(favCity));
  };

  getFavCityFromStore = responseData => {
    return this.props.favCities.filter(
      favCity => favCity.external_id === responseData.city.id
    )[0];
  };
  redirectToMap = () => {
    this.props.router.push("mapcontainer/" + this.state.cityName);
  };
  getComponentToRender = () => {
    if (this.isForecastFetched()) {
      return (
        <div>
          <div className="row">
            <div className="col-md-4">
              <CurrentWeatherDetails
                cityName={this.state.favCitiesWeather.city.name}
                city={this.state.currentForecast}
                liked={this.isCityInFavourite()}
                onLikeClick={this.changeFavStatusOnServer}
              />
            </div>
            <div className="col-md-8">
              <StyledTitle>
                {this.state.chartState} in{" "}
                {this.state.favCitiesWeather.city.name}
              </StyledTitle>
              <Chart
                chartData={this.state.forecastForChart}
                title={this.state.chartState}
                cityName={this.state.favCitiesWeather.city.name}
              />
              <Div>
                <SubmitButton
                  className="btn btn-lg"
                  onClick={this.redirectToMap}
                >
                  Map
                </SubmitButton>
                <SubmitButton
                  className="btn btn-lg"
                  onClick={this.temperatureClick}
                >
                  Temperature
                </SubmitButton>
                <SubmitButton
                  className="btn btn-lg"
                  onClick={this.pressureClick}
                >
                  Pressure
                </SubmitButton>
                <SubmitButton
                  className="btn btn-lg"
                  onClick={this.humidityClick}
                >
                  Humidity
                </SubmitButton>
              </Div>
            </div>
          </div>
          <div className="row">
            <ResponsiveForecast
              onForecastClick={this.prepareDataAfterForecastClick}
              dayForecast={this.state.dayForecast}
              nightForecast={this.state.nightForecast}
            />
          </div>
        </div>
      );
    }
  };

  renderLoader = () => {
    return <LoaderWrapper />;
  };

  renderSearchBox = () => {
    return (
      <div className="row">
        <SearchWeather />
      </div>
    );
  };

  componentDidUpdate(prevProps) {
    if (prevProps.params.cityName !== this.props.params.cityName) {
      this.prepareDataForComponent();
    }
  }

  render() {
    return (
      <div>
        {this.renderSearchBox()}
        {this.state.loading ? this.renderLoader() : this.getComponentToRender()}
        {this.state.errorInfo}
      </div>
    );
  }
}

WeatherDetails.defaultProps = {
  noDay: 0
};

const StyledTitle = styled.h3`
  width: 100%
  font-size: 27px;
  display: flex;
  justify-content: center
`;

const Div = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const SubmitButton = styled.button`
  margin: 10px;
  border: none;
  border-radius: 0px;
  box-shadow: 2px 2px 4px grey;
  background-color: #827717;
  color: white;
`;

const mapStateToProps = currentState => {
  return {
    data: currentState.weather.cityDetails,
    favCities: currentState.session.userCities
  };
};

export default connect(mapStateToProps)(WeatherDetails);
