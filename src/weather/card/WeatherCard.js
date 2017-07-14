/**
 * Created by react on 12.07.17.
 */
import React from "react";
import styled from "styled-components";
import { Collapse } from "react-collapse";
import {withRouter } from "react-router";
import { changeDispalyedDetailsAction } from "../reducer/weather";
import { connect } from "react-redux";

class WeatherCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isCollapse: false,
      columnSize: "col-md-12",
      style: {},
      expandedStyle: { display: "none" },
    };
  }

  expand = e => {
    e.preventDefault();
    this.setState({
      isCollapse: !this.state.isCollapse,
      columnSize: !this.state.isCollapse ? "col-md-5" : "col-md-12",
      style: !this.state.isCollapse
        ? { "min-width": "400px" }
        : { "min-width": "200px" },
      expandedStyle: !this.state.isCollapse
        ? { display: "inline" }
        : { display: "none" },
    });
  };

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
        style={this.state.style}
        className="text-center"
        onMouseEnter={this.expand}
        onMouseLeave={this.expand}
        onClick={this.showDetails}
      >
        <div className="row">
          <div className={this.state.columnSize}>
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
          <Collapse
            className="col-md-7"
            isOpened={this.state.isCollapse}
            style={this.state.expandedStyle}
          >
            <ExtendedCard >
              <ExtendedCardField>
                Pressure {this.props.city.main.pressure}hPa
              </ExtendedCardField>
              <ExtendedCardField>
                Humidity {this.props.city.main.humidity}%
              </ExtendedCardField>
              <ExtendedCardField>
                Wind {this.props.city.wind.speed} km/h
              </ExtendedCardField>
            </ExtendedCard>
          </Collapse>
        </div>
      </Card>
    );
  }
}

const ExtendedCard = styled.div`
  display: flex;
  flex-direction: column;
  align-content: center;
  background-color: #3366ff;
`;

const ExtendedCardField = styled.div`
  margin-right: 20px;
  margin-top: 20px;
  font-family: 'Poppins', sans-serif;
  color: white;
`;

const CardField = styled.div`
  flex: 1;
  min-height: 40px;
  font-family: 'Poppins', sans-serif;
  color: white;
`;

const Card = styled.div`
  margin: 5px;
  min-width: 200px;
  background-color: #3366ff;
  flex: 1;
  flex-direction: column;
  display: flex;
  // border-radius: 25px;
  &:hover {
    opacity: 0.7;
    box-shadow: 2px 2px 2px 2px;
  }
`;

export default connect()(withRouter(WeatherCard));
