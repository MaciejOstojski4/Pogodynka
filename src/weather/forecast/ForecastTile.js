import React from "react";
import styled from "styled-components";

class ForecastTile extends React.Component {
  getForecastIcon = () => {
    return ICON_URL + this.props.forecast.weather[0].icon + ".png";
  };

  render() {
    return (
      <Tile style={{ "backgroundColor": this.props.backgroundColor }}>
        <TileField className="text-center">
          <DescriptionParagraph>Temperature:</DescriptionParagraph>
          <ValueParagraph>
            {this.props.forecast.main.temp} &deg;C
          </ValueParagraph>
        </TileField>
        <TileField>
          <img src={this.getForecastIcon()} alt="Cannot render weather" />
        </TileField>
        <TileField className="text-center">
          <DescriptionParagraph>Pressure:</DescriptionParagraph>
          <ValueParagraph>
            {this.props.forecast.main.pressure} hPa
          </ValueParagraph>
        </TileField>
        <TileField className="text-center">
          <DescriptionParagraph>Wind:</DescriptionParagraph>
          <ValueParagraph>
            {this.props.forecast.wind.speed} km/h
          </ValueParagraph>
        </TileField>
      </Tile>
    );
  }
}

const Tile = styled.div`
  flex: 1;
  margin: 10px;
  color: white;
  min-height: 200px;
  min-width: 200px;
  box-shadow: 2px 2px 4px grey;
  padding: 10px;
  &:hover {
    opacity: 0.7;
  }
`;

const TileField = styled.div`flex: 1;`;

const DescriptionParagraph = styled.p`font-style: italic;`;

const ValueParagraph = styled.p`
  font-size: 150%;
  font-weight: bold;
`;

const ICON_URL = "http://openweathermap.org/img/w/";

export default ForecastTile;
