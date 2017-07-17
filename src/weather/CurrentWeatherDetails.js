/**
 * Created by react on 17.07.17.
 */
import React from "react";
import styled from "styled-components";

class CurrentWeatherDetails extends React.Component {

  render() {
    return (
      <CurrentWeatherTile className="text-center">
        <TileField>
          <h2><b>{this.props.cityName}</b></h2>
        </TileField>
        <TileField>
          Temperature: {this.props.city.main.temp}&deg;C
        </TileField>
        <TileField>
          Pressure: {this.props.city.main.pressure}hPa
        </TileField>
        <TileField>
          Wind: {this.props.city.wind.speed}km/h
        </TileField>
      </CurrentWeatherTile>
    );
  }
}

const CurrentWeatherTile = styled.div`
  background-color: #cddc39;
  padding: 5px;
  box-shadow: 2px 2px 4px black;
`;

const TileField = styled.div`
  color: white;
  font-size: 150%;
`;

export default CurrentWeatherDetails;