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

  parseDate = weatherDate => {
    return weatherDate.split(" ")[0];
  };

  changeRenderedData = () => {
    if(this.state.dataToRender.time === 'day') {
      this.setState({
        dataToRender: {
          temp: this.props.nightForecast.main.temp,
          pressure: this.props.nightForecast.main.pressure,
          wind: this.props.nightForecast.wind.speed,
          time: "night",
          date: this.parseDate(this.props.dayForecast.dt_txt)
        }
      });
    } else {
      this.setState({
        dataToRender: {
          temp: this.props.dayForecast.main.temp,
          pressure: this.props.dayForecast.main.pressure,
          wind: this.props.dayForecast.wind.speed,
          time: "day",
          date: this.parseDate(this.props.dayForecast.dt_txt)
        }
      })
    }
  };

  componentDidMount() {
    this.setState({
      dataToRender: {
        temp: this.props.dayForecast.main.temp,
        pressure: this.props.dayForecast.main.pressure,
        wind: this.props.dayForecast.wind.speed,
        time: "day",
        date: this.parseDate(this.props.dayForecast.dt_txt)
      }
    })
  }

  render() {
    return (
      <Tile className="container" onClick={this.changeRenderedData}>
        <TitleField className="text-center">
          <h3>
            <b>
              {this.state.dataToRender.date} at {this.state.dataToRender.time}
            </b>
          </h3>
        </TitleField>
        <TileField className="text-center">
          Temperature: {this.state.dataToRender.temp} &deg;C
        </TileField>
        <TileField className="text-center">
          Pressure: {this.state.dataToRender.pressure} hPa
        </TileField>
        <TileField className="text-center">
          Wind: {this.state.dataToRender.wind} km/h
        </TileField>
      </Tile>
    );
  }
}

const Tile = styled.div`
  flex: 1;
  margin: 5px;
  color: white;
  min-height: 200px;
  min-width: 200px;
  box-shadow: 2px 2px 4px black;
  background-color: #cddc39;
  padding: 10px;

  &:hover {
    opacity: 0.7;
  }
`;

const TitleField = styled.div`
  background-color: #33691e;
  color: white;
  box-shadow: 2px 2px 4px black;
  padding: 2px;
  margin-bottom: 10px;
`;

const TileField = styled.div`
  flex: 1;
  font-size: 150%;
  margin: 5px;
  margin-top: 10px;
`;

export default ForecastTile;
