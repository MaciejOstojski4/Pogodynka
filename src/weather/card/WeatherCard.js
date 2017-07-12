/**
 * Created by react on 12.07.17.
 */
import React from "react";
import styled from "styled-components";

class WeatherCard extends React.Component {
  render() {
    const iconSrc =
      "http://openweathermap.org/img/w/" +
      this.props.city.weather[0].icon +
      ".png";
    return (
      <Card className="text-center">
        <CardField>
          <h4>
            {this.props.city.name}
          </h4>
        </CardField>
        <CardField>
          <img src={iconSrc} />
        </CardField>
        <CardField>
          {this.props.city.weather[0].description}
        </CardField>
        <CardField>
          {this.props.city.main.temp} &deg;C
        </CardField>
      </Card>
    );
  }
}

const CardField = styled.div`
  flex: 1;
  min-height: 40px;
`;

const Card = styled.td`
  background-color: #faebd7;
  flex: 1;
  flex-direction: column;
  display: flex;
  border-radius: 25px;
  border: solid 2px;
  border-color: #deb887;
  &:hover {
    opacity: 0.5;
  }
`;

export default WeatherCard;
