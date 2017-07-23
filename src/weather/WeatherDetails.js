import React, { Component } from "react";
import { connect } from "react-redux";
import CurrentWeatherDetails from "./CurrentWeatherDetails";
import Chart from "./Chart";
import ResponsiveForecast from "./forecast/ResponsiveForecast";
import styled from "styled-components";
import SearchWeather from "./SearchWeather";

class WeatherDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dayForecast: [],
      nightForecast: [],
      forecastForChart: [],
      errorInfo: ERROR_MESSAGE
    };
  }

  getHoursFromDate = date => {
    return date.split(" ")[1];
  };

  getDailyForecastAtHour = hour => {
    return this.props.data.list.filter(
      weather => this.getHoursFromDate(weather.dt_txt) === hour
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
        this.getDailyForecastAtHour("12:00:00")
      ),
      nightForecast: this.getForecastSinceTomorrow(
        this.getDailyForecastAtHour("00:00:00")
      )
    });
  };

  parseDataForChart = () => {
    console.log(this.props);
    return this.props.data.list
      .map(forecast => {
        return {
          temperature: forecast.main.temp,
          time: this.getHoursFromDate(forecast.dt_txt).slice(0, 5)
        };
      })
      .slice(0, 9);
  };

  prepareDataForChart = () => {
    this.setState({
      forecastForChart: this.parseDataForChart()
    });
  };

  isForecastFetched = () => {
    return this.props.data !== null;
  };

  componentDidMount() {
    if (this.isForecastFetched()) {
      this.prepareDataForForecast();
      this.prepareDataForChart();
    }
  }

  getComponentToRender = () => {
    if (this.isForecastFetched()) {
      return (
        <div>
          <div className="row">
            <SearchWeather />
            <div className="col-md-4">
              <CurrentWeatherDetails
                city={this.props.data.list[0]}
                cityName={this.props.data.city.name}
              />
            </div>
            <div className="col-md-8">
              <StyledTitle>
                Temperatures in next 24 hours in {this.props.data.city.name}
              </StyledTitle>
              <Chart
                chartData={this.state.forecastForChart}
                title="temperature"
                cityName={this.props.data.city.name}
              />
            </div>
          </div>
          <div className="row">
            <ResponsiveForecast
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
    return this.getComponentToRender();
  }
}

const NUMBER_OF_DAYS_IN_FORECAST = 5;

const ERROR_MESSAGE = `Error occurred while application trying to fetch details information about weather.
  Probably the problem is with the OpenWeatherMap API.
  Please, try again later.`;

const StyledTitle = styled.h3`font-size: 27px;`;

const mapStateToProps = currentState => {
  return {
    data: currentState.weather.cityDetails
  };
};

export default connect(mapStateToProps)(WeatherDetails);
