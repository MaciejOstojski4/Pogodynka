/**
 * Created by react on 12.07.17.
 */
import React from "react";
import styled from "styled-components";
import { withRouter } from "react-router";
import { changeDisplayedDetailsAction } from "../reducer/actions/weather-actions";
import { connect } from "react-redux";

class WeatherTile extends React.Component {
  constructor(props) {
    super(props);
  }

  showDetails = e => {
    this.props.dispatch(changeDisplayedDetailsAction(this.props.city));
    this.props.router.push("weatherdetails");
  };

  getWeatherIcon = () => {
    return (
      "http://openweathermap.org/img/w/" +
      this.props.city.weather[0].icon +
      ".png"
    );
  };

  render() {
    return (
      <Card className="text-center" onClick={this.showDetails}>
        <div className="row">
          <div>
            <CardField>
              <Title>
                {this.props.city.name}
              </Title>
            </CardField>
            <CardField>
              <img
                src={this.getWeatherIcon()}
                alt="Cannot render weather image"
              />
            </CardField>
            <CardField>
              {this.props.city.weather[0].description}
            </CardField>
            <CardField>
              {this.props.city.main.temp} &deg;C
            </CardField>
          </div>
        </div>
      </Card>
    );
  }
}
const Title = styled.b`font-size: 160%;`;
const CardField = styled.div`
  flex: 1;
  min-height: 40px;
  font-size: 150%;
  color: white;
`;

const Card = styled.div`
  float: left;
  margin: 5px;
  min-width: 200px;
  background-color:  #cddc39;
  flex: 1;
  flex-direction: column;
  display: flex;
  box-shadow: 2px 2px 4px;
  &:hover {
    opacity: 0.7;
  }
  &:active{
    box-shadow: 0px 0px 0px;
  }
`;

export default connect()(withRouter(WeatherTile));