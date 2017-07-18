/**
 * Created by react on 17.07.17.
 */
import React from "react";
import styled from "styled-components";
import ForecastTile from "./ForecastTile";
import MediaQuery from "react-responsive";

class ForecastPlaceHolder extends React.Component {
  render() {
    return (
      <div>
        <MediaQuery
          query="(max-device-width: 1080px)"
          component={ScrollablePlaceHolder}>
          {this.props.dayForecast.map((forecast, index) => {
            return (
              <DailyForecastPlaceHolder className="text-center">
                <DateTile>
                  <h4>
                    {forecast.dt_txt.split(" ")[0]}
                  </h4>
                </DateTile>
                <i>Day</i>
                <ForecastTile forecast={forecast} backgroundColor="#8bc34a" />
                <i>Night</i>
                <ForecastTile
                  forecast={this.props.nightForecast[index]}
                  backgroundColor="#33691e"
                />
              </DailyForecastPlaceHolder>
            );
          })}
        </MediaQuery>
        <MediaQuery query="(min-device-width: 1081px)" component={PlaceHolder}>
          {this.props.dayForecast.map((forecast, index) => {
            return (
              <DailyForecastPlaceHolder className="text-center">
                <DateTile>
                  <h4>
                    {forecast.dt_txt.split(" ")[0]}
                  </h4>
                </DateTile>
                <i>Day</i>
                <ForecastTile forecast={forecast} backgroundColor="#8bc34a" />
                <i>Night</i>
                <ForecastTile
                  forecast={this.props.nightForecast[index]}
                  backgroundColor="#33691e"
                />
              </DailyForecastPlaceHolder>
            );
          })}
        </MediaQuery>
      </div>
    );
  }
}

const PlaceHolder = styled.div`
  display: flex;
  margin-bottom: 20px;
  flex-direction: wrap;
`;

const ScrollablePlaceHolder = styled.div`
  display: flex;
  margin-bottom: 20px;
  overflow-x: scroll;
`;

const DateTile = styled.div`
  background-color: #827717;
  margin: 10px;
  margin-bottom: 10px;
  color: white;
  padding: 1px;
  box-shadow: 2px 2px 4px black;
`;

const DailyForecastPlaceHolder = styled.div`
  flex: 1;
  background-color: #e6ee9c;
  margin: 5px;
  box-shadow: 2px 2px 4px black;
`;

export default ForecastPlaceHolder;
