import React, { Component, PropTypes } from "react";
import OpenWeatherMap from "react-open-weather-map";
import axios from "axios";
import apiClient from "../lib/api-client";
export class WeatherDetails extends Component {

  constructor(props) {
    super(props);
    this.state = {
      city: "Warsaw",
      apiKey: "057420ef754b30b2b45ecd0d40b6281d",
      url: "api.openweathermap.org/data/2.5/weather?q=",
      d: [],
      temp: []
    };
  }

  fetchWeather = () => {
    /*
    const urlWithCitiesIds =
      WEATHER_FOR_SINGLE_CITY_URL + "&q=" + this.state.city;
      */
    axios
      .get(
        `http://api.openweathermap.org/data/2.5/weather?q={${this.state
          .city}}&APPID=057420ef754b30b2b45ecd0d40b6281d`
      )
      .then(response => {
        this.setState({
          d: response.data,
          temp: response.data.main
        });
        console.log(response.data);

        /*console.log(response);*/
      })
      .catch(error => {
        console.log(
          "Error occurred during fetching weather for cities: " + error
        );
      });
  };
  /*
  apiClient
    .get(urlWithCitiesIds)
    .then(response => {
      this.setState={
        d: response.data.list,
      };
    })
    .catch(error => {
      console.log(
        "Error occurred during fetching weather for cities: " + error,
      );
    });
    console.log(this.state.d);
};
*/
  componentDidMount() {
    this.fetchWeather();
  };

  render() {
      console.log(this.state.temp.temp);
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

const WEATHER_FOR_SINGLE_CITY_URL = "/weather?";

export default WeatherDetails;
