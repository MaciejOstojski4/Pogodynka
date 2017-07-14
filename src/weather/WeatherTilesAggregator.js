/**
 * Created by react on 12.07.17.
 */
import React from "react";
import WeatherCard from "./card/WeatherTile";
import styled from "styled-components";

class WeatherCardAggregator extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <AggregatorResponsive>
        {this.props.weatherItems.map(city => {
          return <WeatherCard onClick={this.extend} city={city} />;
        })}
      </AggregatorResponsive>
    );
  }
}

const AggregatorResponsive = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

export default WeatherCardAggregator;
