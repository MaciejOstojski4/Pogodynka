/**
 * Created by react on 12.07.17.
 */
import React from "react";
import WeatherTile from "./card/WeatherTile";
import styled from "styled-components";
import MediaQuery from "react-responsive";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import apiClient from "../lib/api-client";
import { changeDisplayedDetailsAction } from "./reducer/actions/weather-actions";

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
          errorInfo: "Cannot find this city"
        });
      });
  };

  // cos jest nie tak z kolejnoscia tu :D raczej 'redirectToDetails'
  toDetailsRedirect = cityName => {
    const url = this.prepareUrl(cityName);
    this.fetchWeather(url);
    this.props.router.push("weatherdetails");
  };

  // tutaj nie zwracasz zadnego data tylko renderujesz komponent
  getDataToRender = () => {
    return this.props.weatherItems.map(city => {
      return (
        <WeatherTile
          key={city.name}
          city={city}
          onClickRedirect={this.toDetailsRedirect}
        />
      );
    });
  };

  render() {
    return (
      <div>
        <MediaQuery
          query="(max-device-width: 700px)"
          component={AggregatorResponsiveColumn}>
          {this.getDataToRender()}
        </MediaQuery>
        <MediaQuery
          query="(min-device-width: 701px)"
          component={AggregatorResponsiveRow}>
          {this.getDataToRender()}
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

export default connect()(withRouter(WeatherCardAggregator));
