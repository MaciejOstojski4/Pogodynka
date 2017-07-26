import React from "react";
import styled from "styled-components";
import DailyForecastPlaceHolder from "./DailyForecastPlaceHolder";

// 'Placeholder' to jest jedno słowo
class ForecastPlaceHolder extends React.Component {
  render() {
    return (
      <PlaceHolder>
        {this.props.dayForecast.map((forecast, index) => {
          return (
            <DailyForecastPlaceHolder
              key={forecast.dt_txt}
              noDay={index}
              onForecastClick={this.props.onForecastClick}
              dayForecast={forecast}
              nightForecast={this.props.nightForecast[index]}
            />
          );
        })}
      </PlaceHolder>
    );
  }
}

const PlaceHolder = styled.div`
  display: flex;
  margin-bottom: 20px;
  flex-direction: wrap;
`;

export default ForecastPlaceHolder;
