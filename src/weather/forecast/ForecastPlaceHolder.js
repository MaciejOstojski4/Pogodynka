/**
 * Created by react on 17.07.17.
 */

import React from "react";
import styled from "styled-components";
import ForecastTile from "./ForecastTile";

class ForecastPlaceHolder extends React.Component {
  render() {
    return (
      <PlaceHolder>
        {this.props.dayForecast.map((forecast, index) => {
          return (
            <DailyForecastPlaceHolder>
              <DateTile className="text-center">
                <h3>
                  {forecast.dt_txt.split(" ")[0]}
                </h3>
              </DateTile>
              <h4 className="text-center">Day</h4>
              <ForecastTile forecast={forecast} backgroundColor="#8bc34a" />
              <h4 className="text-center">Night</h4>
              <ForecastTile
                forecast={this.props.nightForecast[index]}
                backgroundColor="#33691e"
              />
            </DailyForecastPlaceHolder>
          );
        })}
      </PlaceHolder>
    );
  }
}

const PlaceHolder = styled.div`
  display: flex;
  flex-direction: wrap;
`;

const DateTile = styled.div`
  background-color: #827717;
  margin: 10px;
  margin-bottom: 10px;
  color: white;
  padding: 2px;
  box-shadow: 2px 2px 4px black;
`;

const DailyForecastPlaceHolder = styled.div`
  flex: 1;
  background-color: #e6ee9c;
  margin: 5px;
  box-shadow: 2px 2px 4px black;
`;

export default ForecastPlaceHolder;
