/**
 * Created by react on 12.07.17.
 */
import React from "react";
import styled from "styled-components";
import { Collapse } from "react-collapse";

class WeatherCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isCollapse: false,
      columnSize: "col-md-12",
    };
  }

  expand = e => {
    e.preventDefault();
    this.setState({
      isCollapse: !this.state.isCollapse,
      columnSize: this.state.columnSize === "col-md-12" ? "col-md-6" : "col-md-12",
    });
  };

  render() {
    const iconSrc =
      "http://openweathermap.org/img/w/" +
      this.props.city.weather[0].icon +
      ".png";
    return (
      <Card className="text-center" onClick={this.expand}>
        <div className="row">
          <div className={this.state.columnSize}>
            <CardField>
              <h4>
                {this.props.city.name}
              </h4>
            </CardField>
            <CardField>
              <img src={iconSrc} alt="Cannot render image" />
            </CardField>
            <CardField>
              {this.props.city.weather[0].description}
            </CardField>
            <CardField>
              {this.props.city.main.temp} &deg;C
            </CardField>
          </div>
          <Collapse className="col-md-6" isOpened={this.state.isCollapse}>
            <div>Pressure {this.props.city.main.pressure}</div>
            <div>Humidity {this.props.city.main.humidity} %</div>
            <div>Wind {this.props.city.wind.speed} km/h</div>
          </Collapse>
        </div>
      </Card>
    );
  }
}

const CardField = styled.div`
  flex: 1;
  min-height: 40px;
`;

const Card = styled.div`
  min-width: 200px;
  background-color: #faebd7;
  flex: 1;
  flex-direction: column;
  display: flex;
  border-radius: 10px;
  &:hover {
    opacity: 0.5;
  }
`;

export default WeatherCard;
