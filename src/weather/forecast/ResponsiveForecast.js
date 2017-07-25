import React from "react";
import MediaQuery from "react-responsive";
import styled from "styled-components";
import ScrolledForecastPlaceHolder from "./ScrolledForecastPlaceHolder";
import ForecastPlaceHolder from "./ForecastPlaceHolder";

class ResponsiveForecast extends React.Component {
  render() {
    return (
      <div>
        <div className="text-center">
          <h2>Forecast for 4 days</h2>
        </div>
        <MediaQuery query="(max-device-width: 1080px)" component={ScrolledDiv}>
          <ScrolledForecastPlaceHolder
            onForecastClick={this.props.onForecastClick}
            dayForecast={this.props.dayForecast}
            nightForecast={this.props.nightForecast}
          />
        </MediaQuery>
        <MediaQuery query="(min-device-width: 1081px)" component={ScrolledDiv}>
          <ForecastPlaceHolder
            onForecastClick={this.props.onForecastClick}
            dayForecast={this.props.dayForecast}
            nightForecast={this.props.nightForecast}
          />
        </MediaQuery>
      </div>
    );
  }
}

const ScrolledDiv = styled.div``;

export default ResponsiveForecast;
