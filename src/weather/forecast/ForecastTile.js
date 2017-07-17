/**
 * Created by react on 17.07.17.
 */
import React from "react";
import styled from "styled-components";

class ForecastTile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dataToRender: {}
    };
  }

  render() {
    return (
      <Tile style={{"background-color": this.props.backgroundColor}}>

        <TileField className="text-center">
          Temperature: {this.props.forecast.main.temp}&deg;C
        </TileField>
        <TileField className="text-center">
          Pressure: {this.props.forecast.main.pressure}hPa
        </TileField>
        <TileField className="text-center">
          Wind: {this.props.forecast.wind.speed}km/h
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
  box-shadow: 2px 2px 4px black;
  padding: 10px;
  &:hover {
    opacity: 0.7;
  }
`;

const TileField = styled.div`
  flex: 1;
  font-size: 150%;
  margin: 5px;
  margin-top: 10px;
`;

export default ForecastTile;
