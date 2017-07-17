/**
 * Created by react on 12.07.17.
 */
import React from "react";
import styled from "styled-components";
import { withRouter } from "react-router";
import { changeDisplayedDetailsAction } from "../reducer/actions/weather-actions";
import { connect } from "react-redux";
import apiClient from "../../lib/api-client";
class WeatherTile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tileColor: { "background-color": GOOD_WEATHER_COLOR }
    };
  }

  showDetails = e => {
    const url = this.prepareUrl();
    this.fetchWeather(url);
    this.props.router.push("weatherdetails");
  };

  prepareUrl = () => {
    return `${SEARCH_URL}q=${this.props.city.name}`;
  };

  fetchWeather = url => {
    apiClient
      .get(url)
      .then(response => {
        this.props.dispatch(changeDisplayedDetailsAction(response.data));
      })
      .catch(error => {
        console.log("Error while searching by city name: " + error);
        this.setState({
          errorInfo: "Cannot find this city"
        });
      });
  };

  getWeatherIcon = () => {
    return ICON_URL + this.props.city.weather[0].icon + ".png";
  };

  refreshTileColorInState = tileColor => {
    this.setState({
      tileColor: { "background-color": tileColor }
    });
  };

  isBadWeather = weatherCode => {
    if (
      weatherCode < 500 ||
      (weatherCode >= 600 && weatherCode < 700) ||
      weatherCode >= 900
    ) {
      return true;
    }
    return false;
  };

  isAverageWeather = weatherCode => {
    if (
      (weatherCode >= 500 && weatherCode < 600) ||
      (weatherCode >= 700 && weatherCode < 800) ||
      (weatherCode >= 803 && weatherCode <= 804)
    ) {
      return true;
    }
    return false;
  };

  isGoodWeather = weatherCode => {
    if (weatherCode >= 800 && weatherCode <= 802) {
      return true;
    }
    return false;
  };

  resolveTileColor = weatherCode => {
    if (this.isBadWeather(weatherCode)) {
      this.refreshTileColorInState(BAD_WEATHER_COLOR);
    } else if (this.isAverageWeather(weatherCode)) {
      this.refreshTileColorInState(AVERAGE_WEATHER_COLOR);
    } else if (this.isGoodWeather(weatherCode)) {
      this.refreshTileColorInState(GOOD_WEATHER_COLOR);
    }
  };

  componentDidMount() {
    this.resolveTileColor(this.props.city.weather[0].id);
  }

  render() {
    return (
      <Card
        className="text-center"
        onClick={this.showDetails}
        style={this.state.tileColor}
      >
        <div className="row">
          <div>
            <CardField>
              <TitleField>
                {this.props.city.name}
              </TitleField>
            </CardField>
            <CardField>
              <img
                src={this.getWeatherIcon()}
                alt="Cannot render weather image"
              />
            </CardField>
            <CardField>
              {this.props.city.weather[0].description}
            </CardField>
            <CardField>
              {this.props.city.main.temp} &deg;C
            </CardField>
          </div>
        </div>
      </Card>
    );
  }
}

const GOOD_WEATHER_COLOR = "#ffd600";

const AVERAGE_WEATHER_COLOR = "#7cb342";

const BAD_WEATHER_COLOR = "#0277bd";

const ICON_URL = "http://openweathermap.org/img/w/";

const TitleField = styled.b`font-size: 160%;`;

const CardField = styled.div`
  flex: 1;
  min-height: 40px;
  font-size: 150%;
  color: white;
`;

const Card = styled.div`
  float: left;
  margin: 5px;
  min-width: 200px;
  flex: 1;
  flex-direction: column;
  display: flex;
  box-shadow: 2px 2px 4px black;
  &:hover {
    opacity: 0.7;
  }
  &:active {
    box-shadow: 0px 0px 0px;
  }
`;

const LAT_LONG_REGEX = /(-)?[0-9]+\.[0-9]+:(-)?[0-9]+\.[0-9]+/;
const SEARCH_URL = "forecast?units=metric&";
export default connect()(withRouter(WeatherTile));
