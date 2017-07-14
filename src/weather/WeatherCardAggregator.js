/**
 * Created by react on 12.07.17.
 */
import React from "react";
import WeatherCard from "./card/WeatherCard";
import styled from "styled-components";

class WeatherCardAggregator extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="row">
        <AggregatorResponsive>
          {this.props.weatherItems.map(city => {
            return <WeatherCard onClick={this.extend} city={city} />;
          })}
        </AggregatorResponsive>
      </div>
    );
  }
}

const AggregatorResponsive = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-content: space-between;
`;

export default WeatherCardAggregator;
