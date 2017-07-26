import React from "react";
import styled from "styled-components";
import DailyForecastPlaceholder from "./DailyForecastPlaceholder";

class ForecastPlaceholder extends React.Component {
  render() {
    return (
      <Placeholder>
        {this.props.dayForecast.map((forecast, index) => {
          return (
            <DailyForecastPlaceholder
              key={forecast.dt_txt}
              noDay={index}
              onForecastClick={this.props.onForecastClick}
              dayForecast={forecast}
              nightForecast={this.props.nightForecast[index]}
            />
          );
        })}
      </Placeholder>
    );
  }
}

const Placeholder = styled.div`
  display: flex;
  margin-bottom: 20px;
  flex-direction: wrap;
`;

export default ForecastPlaceholder;
