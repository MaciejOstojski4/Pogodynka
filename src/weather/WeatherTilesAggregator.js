import React from "react";
import WeatherTile from "./card/WeatherTile";
import styled from "styled-components";
import MediaQuery from "react-responsive";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import apiClient from "../lib/api-client";
import {
  changeDisplayedDetailsAction,
  saveGroupWeatherAction,
} from "../actions/weather-actions";
import { addUserCityAction, removeUserCityAction } from "../actions/user-action";

class WeatherCardAggregator extends React.Component {
  prepareUrl = cityName => {
    return `${SEARCH_URL}q=${cityName}`;
  };

  fetchWeather = url => {
    apiClient
      .get(url)
      .then(response => {
        this.props.dispatch(changeDisplayedDetailsAction(response.data));
      })
      .catch(error => {
        this.setState({
          errorInfo: "Cannot find this city",
        });
      });
  };

  redirectToDetails = cityName => {
    const url = this.prepareUrl(cityName);
    this.fetchWeather(url);
    this.props.router.push("weatherdetails");
  };

  createFavouriteCityObject = city => {
    return {
      place: {
        name: city.name,
        external_id: city.id,
        lat: city.coord.lat,
        lon: city.coord.lon,
        description: "",
      },
    };
  };

  changeFavStatusOnServer = (city, like) => {
    if (like) {
      this.addCityToFavourite(city);
    } else {
      this.removeCityFromFavourite(city);
    }
  };

  removeCityFromFavourite = city => {
    this.props.dispatch(removeUserCityAction(city));
  };

  addCityToFavourite = city => {
    const favCity = this.createFavouriteCityObject(city);
    this.props.dispatch(addUserCityAction(favCity));
  };

  getComponentToRender = () => {
    return this.props.weatherItems.map(city => {
      return (
        <WeatherTile
          key={city.name}
          city={city}
          onClickRedirect={this.redirectToDetails}
          onFavClick={this.changeFavStatusOnServer}
          showButtons={this.props.userId !== ""}
          likeButton={city.favCity === null}
          dislikeButton={city.favCity !== null}
        />
      );
    });
  };

  componentDidMount() {
    this.props.dispatch(saveGroupWeatherAction(this.props.weatherItems));
  }

  render() {
    return (
      <div>
        <MediaQuery
          query="(max-device-width: 700px)"
          component={AggregatorResponsiveColumn}
        >
          {this.getComponentToRender()}
        </MediaQuery>
        <MediaQuery
          query="(min-device-width: 701px)"
          component={AggregatorResponsiveRow}
        >
          {this.getComponentToRender()}
        </MediaQuery>
      </div>
    );
  }
}

const AggregatorResponsiveRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const AggregatorResponsiveColumn = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  flex-direction: column;
`;

const SEARCH_URL = "forecast?units=metric&";

const mapStateToProps = currentState => {
  return {
    userId: currentState.session.user.userId,
    token: currentState.session.user.token,
    data: currentState.weather,
  };
};

export default connect(mapStateToProps)(withRouter(WeatherCardAggregator));
