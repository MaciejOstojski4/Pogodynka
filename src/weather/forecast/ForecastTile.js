import React from "react";
import styled from "styled-components";

const ICON_URL = "http://openweathermap.org/img/w/";

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
          <ForecastImage src={this.getForecastIcon()} alt="Cannot render weather" />
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

const ForecastImage = styled.img`
  max-height: 50px;
  max-width: 50px;
  @media screen and (max-width: 1080px) {
    display: block;
    margin-left: auto;
    margin-right: auto;
  }
`;

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

const TileField = styled.div`
  flex: 1;
  min-width: 100px;
`;

const DescriptionParagraph = styled.p`font-style: italic;`;

const ValueParagraph = styled.p`
  font-size: 150%;
  font-weight: bold;
`;

export default ForecastTile;
