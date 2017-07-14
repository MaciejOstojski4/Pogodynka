/**
 * Created by react on 12.07.17.
 */
import React from "react";
import styled from "styled-components";
import {withRouter } from "react-router";
import { changeDispalyedDetailsAction } from "../reducer/weather";
import { connect } from "react-redux";

class WeatherCard extends React.Component {
  constructor(props) {
    super(props);
  }

  showDetails = e => {
    this.props.dispatch(changeDispalyedDetailsAction(this.props.city));
    this.props.router.push("weatherdetails");
  };

  render() {
    const iconSrc =
      "http://openweathermap.org/img/w/" +
      this.props.city.weather[0].icon +
      ".png";
    return (
      <Card
        className="text-center"
        onClick={this.showDetails}
      >
        <div className="row">
          <div>
            <CardField>
              <h4>
                <b>
                  {this.props.city.name}
                </b>
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
        </div>
      </Card>
    );
  }
}

const CardField = styled.div`
  flex: 1;
  min-height: 40px;
  font-family: 'Poppins', sans-serif;
  font-size: 150%;
  color: white;
`;

const Card = styled.div`
  float: left;
  margin: 5px;
  min-width: 200px;
  background-color: #2196f3;
  flex: 1;
  flex-direction: column;
  display: flex;
  box-shadow: 2px 2px 4px;
`;

export default connect()(withRouter(WeatherCard));
