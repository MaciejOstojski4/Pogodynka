import React from "react";
import styled from "styled-components";
import ForecastTile from "./ForecastTile";

class DailyForecastPlaceHolder extends React.Component {
  getDateWithoutHours = forecastDate => {
    return forecastDate.dt_txt.split(" ")[0];
  };

  onClick = e => {
    e.preventDefault();
    this.props.onForecastClick(this.props.noDay);
  };

  render() {
    return (
      <PlaceHolder
        key={this.props.dayForecast.dt_txt}
        className="text-center"
        onClick={this.onClick}
      >
        <DateTile>
          <h4>
            {this.getDateWithoutHours(this.props.dayForecast)}
          </h4>
        </DateTile>
        <i>Day</i>
        <ForecastTile
          forecast={this.props.dayForecast}
          backgroundColor="#8bc34a"
        />
        <i>Night</i>
        <ForecastTile
          forecast={this.props.nightForecast}
          backgroundColor="#33691e"
        />
      </PlaceHolder>
    );
  }
}

const DateTile = styled.div`
  background-color: #827717;
  margin: 10px;
  margin-bottom: 10px;
  color: white;
  padding: 1px;
  box-shadow: 2px 2px 4px grey;
`;

const PlaceHolder = styled.div`
  flex: 1;
  background-color: #e6ee9c;
  margin: 5px;
  box-shadow: 2px 2px 4px grey;
`;

export default DailyForecastPlaceHolder;
