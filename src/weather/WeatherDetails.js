import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";

class WeatherDetails extends Component {
  constructor(props) {
    super(props);
    data: {
    }
  }

  render() {
    const pStyle = {
      width: "500px",
      paddingTop: "20px",
      paddingLeft: "100px",
    };
    const boxStyle = {
      backgroundColor: "#faebd7",
    };
    const hss = {
      paddingTop: "20px",
      paddingLeft: "20px",
    };

    return (
      <Div className="container-fluid">
        <h1>
          {this.props.data.name}
          <p>
            <small> Weather details</small>
          </p>
        </h1>
        <p style={pStyle}>
          <div style={boxStyle} className="card">
            <div className="card-header">
              <h3 style={hss}>Temperature:</h3>
            </div>
            <div class="card-block">
              <blockquote class="card-blockquote">
                {this.props.data.main.temp}
              </blockquote>
            </div>
          </div>

          <div style={boxStyle} className="card">
            <div className="card-header">
              <h3 style={hss}>Max temperature:</h3>
            </div>
            <div class="card-block">
              <blockquote class="card-blockquote" />
            </div>
          </div>

          <div style={boxStyle} className="card">
            <div className="card-header">
              <h3 style={hss}>Min temperature:</h3>
            </div>
            <div class="card-block">
              <blockquote class="card-blockquote" />
            </div>
          </div>

          <div style={boxStyle} className="card">
            <div className="card-header">
              <h3 style={hss}>Pressure: </h3>
            </div>
            <div class="card-block">
              <blockquote class="card-blockquote" />
            </div>
          </div>

          <div style={boxStyle} className="card">
            <div className="card-header">
              <h3 style={hss}>Humidity:</h3>
            </div>
            <div class="card-block">
              <blockquote class="card-blockquote" />
            </div>
          </div>
        </p>
      </Div>
    );
  }
}

const Div = styled.div`display: flex;`;

const WEATHER_FOR_SINGLE_CITY_URL = "/weather?units=metric&";

const mapStateToProps = currentState => {
  return {
    data: currentState.weather.cityDetails,
  };
};

export default connect(mapStateToProps)(WeatherDetails);
