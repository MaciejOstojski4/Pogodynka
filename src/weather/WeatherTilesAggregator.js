import React from "react";
import WeatherTile from "./card/WeatherTile";
import styled from "styled-components";
import MediaQuery from "react-responsive";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import apiClient from "../lib/api-client";
import userApiClient from "../lib/userApi-client";
import { changeDisplayedDetailsAction } from "../actions/weather-actions";

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
        console.log("Error while searching by city name: " + error);
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

  createFavouriteCityObject = cityName => {
    const city = this.props.weatherItems.filter(
      city => city.name === cityName,
    )[0];
    console.log(this.props.token);
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

  onLikeClick = cityName => {
    console.log(this.props.token);
    userApiClient
      .post(ADD_TO_FAVOURITE_URL, this.createFavouriteCityObject(cityName))
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  };

  getComponentToRender = () => {
    return this.props.weatherItems.map(city => {
      return (
        <WeatherTile
          key={city.name}
          city={city}
          onClickRedirect={this.redirectToDetails}
          showButtons={this.props.userId === "" ? false : true}
          likeButton={city.favCity === null ? true : false}
          dislikeButton={city.favCity === null ? false : true}
          onLikeClick={this.onLikeClick}
        />
      );
    });
  };

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

const ADD_TO_FAVOURITE_URL = "/weather/api/v1/places";

const mapStateToProps = currentState => {
  return {
    userId: currentState.session.user.userId,
    token: currentState.session.user.token,
  };
};

export default connect(mapStateToProps)(withRouter(WeatherCardAggregator));
