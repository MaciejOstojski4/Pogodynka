import React, { Component } from "react";
import { connect } from "react-redux";
import CurrentWeatherDetails from "./CurrentWeatherDetails";
import Chart from "./Chart";
import ResponsiveForecast from "./forecast/ResponsiveForecast";
import styled from "styled-components";
import SearchWeather from "./SearchWeather";
import { parseSearchedWeatherAction } from "../actions/weather-actions";

class WeatherDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dayForecast: [],
      nightForecast: [],
      forecastForChart: [],
      errorInfo: ERROR_MESSAGE,
      currentForecast: this.props.data.list[0],
      chartState: "temperature"
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
    return this.props.data.list.map(forecast => {
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
      forecastForChart: this.getForecastForDay(noDay, this.parseDataForChart())
    });
  };

  isForecastFetched = () => {
    return this.props.data !== null;
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
  componentDidMount() {
    if (this.isForecastFetched()) {
      this.prepareDataForForecast();
      this.prepareDataForChart(this.props.noDay);
    }
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
  getComponentToRender = noDay => {
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
              />
            </div>
            <div className="col-md-8">
              <StyledTitle>
                {this.state.chartState} in {this.props.data.city.name}
              </StyledTitle>
              <Chart
                chartData={this.state.forecastForChart}
                title={this.state.chartState}
                cityName={this.props.data.city.name}
              />
              <Div>
                <SubmitButton onClick={this.temperatureClick}>
                  Temperature
                </SubmitButton>
                <SubmitButton onClick={this.pressureClick}>
                  Pressure
                </SubmitButton>
                <SubmitButton onClick={this.humidityClick}>
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
  noDay: 0
};

const NUMBER_OF_DAYS_IN_FORECAST = 5;

const ERROR_MESSAGE = `Error occurred while application trying to fetch details information about weather.
  Probably the problem is with the OpenWeatherMap API.
  Please, try again later.`;

const StyledTitle = styled.h3`
  width: 100%
  font-size: 27px;
  display: flex;
  justify-content: center`;

const mapStateToProps = currentState => {
  return {
    data: currentState.weather.cityDetails
  };
};
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
export default connect(mapStateToProps)(WeatherDetails);
