/**
 * Created by react on 12.07.17.
 */
import React from "react";
import apiClient from "../lib/api-client";
import WeatherCard from "./card/WeatherCard";
import styled from "styled-components";

class WeatherCardAggregator extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      cities: [],
    };
  }

  fetchWeatherForCities = () => {
    const urlWithCitiesIds =
      WEATHER_FOR_SEVERAL_CITIES_URL + "&id=" + this.props.cityIds.join(",");
    apiClient
      .get(urlWithCitiesIds)
      .then(response => {
        this.setState({
          cities: response.data.list,
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
      <div className="row">
        <AggregatorResponsive>
          {this.state.cities.map(city => {
            return <WeatherCard city={city} />;
          })}
        </AggregatorResponsive>
      </div>
    );
  }
}

const AggregatorResponsive = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-content: space-between;
  border-radius: 10px;
  // border: 1px solid;
  // border-color: #deb887;
  background-color: #faebd7;
`;

const WEATHER_FOR_SEVERAL_CITIES_URL = "/group?units=metric";

export default WeatherCardAggregator;
