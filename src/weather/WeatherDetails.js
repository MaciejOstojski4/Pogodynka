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
  removeUserCityAction,
} from "../actions/user-action";

class WeatherDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dayForecast: [],
      nightForecast: [],
      forecastForChart: [],
      errorInfo: ERROR_MESSAGE,
      currentForecast: this.props.data.list[0],
      chartState: "temperature",
    };
  }

  getHoursFromDate = date => {
    return date.split(" ")[1];
  };

  getDailyForecastAtHour = hour => {
    return this.props.data.list.filter(
      weather => this.getHoursFromDate(weather.dt_txt) === hour,
    );
  };

  getForecastSinceTomorrow = forecast => {
    if (forecast.length === NUMBER_OF_DAYS_IN_FORECAST) {
      return forecast.slice(1, forecast.length);
    }
    return forecast;
  };

  prepareDataForForecast = () => {
    this.setState({
      dayForecast: this.getForecastSinceTomorrow(
        this.getDailyForecastAtHour("12:00:00"),
      ),
      nightForecast: this.getForecastSinceTomorrow(
        this.getDailyForecastAtHour("00:00:00"),
      ),
    });
  };

  parseDataForChart = () => {
    return this.props.data.list.map(forecast => {
      return {
        temperature: forecast.main.temp,
        pressure: forecast.main.pressure,
        humidity: forecast.main.humidity,
        time: this.getHoursFromDate(forecast.dt_txt).slice(0, 5),
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
      forecastForChart: this.getForecastForDay(noDay, this.parseDataForChart()),
    });
  };

  isForecastFetched = () => {
    return this.props.data !== null;
  };

  setWeatherDetails = noDay => {
    this.setState({
      currentForecast: this.state.dayForecast[noDay],
    });
  };

  prepareDataAfterForecastClick = noDay => {
    this.prepareDataForChart(noDay);
    this.setWeatherDetails(noDay);
  };

  componentDidMount() {
    if (this.isForecastFetched()) {
      this.prepareDataForForecast();
      this.prepareDataForChart(this.props.noDay);
    }
  }

  pressureClick = () => {
    this.setState({
      chartState: "pressure",
    });
  };

  temperatureClick = () => {
    this.setState({
      chartState: "temperature",
    });
  };

  humidityClick = () => {
    this.setState({
      chartState: "humidity",
    });
  };

  isCityInFavourite = () => {
    const favCities = this.props.favCities.filter(favCity => favCity.external_id === this.props.data.city.id)
    return favCities.length > 0;
  }

  createFavouriteCityObject = () => {
    return {
      place: {
        name: this.props.data.city.name,
        external_id: this.props.data.city.id,
        lat: this.props.data.city.coord.lat,
        lon: this.props.data.city.coord.lon,
        description: "",
      }
    }
  }

  changeFavStatusOnServer = (like) => {
    if (like) {
      this.addCityToFavourite();
    } else {
      this.removeCityFromFavourite();
    }
  };

  removeCityFromFavourite = () => {
    const favCity = this.createFavouriteCityObject();
    console.log(favCity);
    this.props.dispatch(removeUserCityAction(favCity));
  };

  addCityToFavourite = () => {
    const favCity = this.createFavouriteCityObject();
    this.props.dispatch(addUserCityAction(favCity));
  };

  getComponentToRender = () => {
    console.log("city frtom details (data)");
    console.log(this.props.data);
    this.props.dispatch(parseSearchedWeatherAction(this.props.data));
    if (this.isForecastFetched()) {
      return (
        <div>
          <div className="row">
            <SearchWeather />
            <div className="col-md-4">
              <CurrentWeatherDetails
                cityName={this.props.data.city.name}
                city={this.state.currentForecast}
                liked={this.isCityInFavourite()}
                onLikeClick={this.changeFavStatusOnServer}
              />
            </div>
            <div className="col-md-8">
              <StyledTitle>
                Temperatures in next 24 hours in {this.props.data.city.name}
              </StyledTitle>
              <Chart
                chartData={this.state.forecastForChart}
                title={this.state.chartState}
                cityName={this.props.data.city.name}
              />
              <button onClick={this.temperatureClick}>Temperature </button>
              <button onClick={this.pressureClick}>Pressure </button>
              <button onClick={this.humidityClick}>Humidity</button>
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
    } else {
      return (
        <div className="col-md-12 text-center">
          <h2>
            {this.state.errorInfo}
          </h2>
        </div>
      );
    }
  };

  render() {
    return this.getComponentToRender(this.props.noDay);
  }
}

WeatherDetails.defaultProps = {
  noDay: 0,
};

const NUMBER_OF_DAYS_IN_FORECAST = 5;

const ERROR_MESSAGE = `Error occurred while application trying to fetch details information about weather.
  Probably the problem is with the OpenWeatherMap API.
  Please, try again later.`;

const StyledTitle = styled.h3`font-size: 27px;`;

const mapStateToProps = currentState => {
  return {
    data: currentState.weather.cityDetails,
    favCities: currentState.session.userCities
  };
};

export default connect(mapStateToProps)(WeatherDetails);
