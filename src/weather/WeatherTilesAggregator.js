/**
 * Created by react on 12.07.17.
 */
import React from "react";
import WeatherCard from "./card/WeatherTile";
import styled from "styled-components";
import MediaQuery from "react-responsive";

class WeatherCardAggregator extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <MediaQuery
          query="(max-device-width: 1080px)"
          component={AggregatorResponsiveColumn}
        >
          {this.props.weatherItems.map(city => {
            return <WeatherCard city={city} />;
          })}
        </MediaQuery>
        <MediaQuery
          query="(min-device-width: 1080px)"
          component={AggregatorResponsiveRow}
        >
          {this.props.weatherItems.map(city => {
            return <WeatherCard city={city} />;
          })}
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

export default WeatherCardAggregator;
