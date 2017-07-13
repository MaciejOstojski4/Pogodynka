import React, { Component, PropTypes } from "react";
import OpenWeatherMap from "react-open-weather-map";
import axios from "axios";
import apiClient from "../lib/api-client";
import styled from "styled-components";
export class WeatherDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cityId: 3093133,
      data: "",
      temp: ""
    };
  }

  fetchWeather = () => {
    const urlWithCityId = `${WEATHER_FOR_SINGLE_CITY_URL}id=${this.state
      .cityId}`;

    apiClient
      .get(urlWithCityId)
      .then(response => {
        this.setState({
          data: response.data,
          temp: response.data.main
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  componentDidMount() {
    this.fetchWeather();
  }

  render() {

    const pStyle = {
      width: "500px",
      paddingTop: "20px",
      paddingLeft: "100px"
    };
    const boxStyle = {
      backgroundColor: "#faebd7"
    };
    const hss = {
      paddingTop: "20px",
      paddingLeft: "20px"
    };

    console.log(this.state.data);
    return (
      <Div className="container-fluid">
        <h1>
          {this.state.data.name}
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

                  {this.state.temp.temp}

              </blockquote>
            </div>
          </div>

          <div style={boxStyle} className="card">
            <div className="card-header">
              <h3 style={hss}>Max temperature:</h3>
            </div>
            <div class="card-block">
              <blockquote class="card-blockquote">
                {this.state.temp.temp_max}
              </blockquote>
            </div>
          </div>

          <div style={boxStyle} className="card">
            <div className="card-header">
              <h3 style={hss}>Min temperature:</h3>
            </div>
            <div class="card-block">
              <blockquote class="card-blockquote">
                {this.state.temp.temp_min}
              </blockquote>
            </div>
          </div>

          <div style={boxStyle} className="card">
            <div className="card-header">
              <h3 style={hss}>Pressure: </h3>
            </div>
            <div class="card-block">
              <blockquote class="card-blockquote">
                {this.state.temp.pressure}
              </blockquote>
            </div>
          </div>

          <div style={boxStyle} className="card">
            <div className="card-header">
              <h3 style={hss}>Humidity:</h3>
            </div>
            <div class="card-block">
              <blockquote class="card-blockquote">
                {this.state.temp.humidity}
              </blockquote>
            </div>
          </div>
        </p>
      </Div>
    );
  }
}
const Div=styled.div`
  display: flex
`
const WEATHER_FOR_SINGLE_CITY_URL = "/weather?units=metric&";

export default WeatherDetails;
