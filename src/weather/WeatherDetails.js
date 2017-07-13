import React, {Component} from "react";
import axios from "axios";
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
      <div>
        <ul>
          <li>
            City: {this.state.d.name}
          </li>
        <li>
          Temp: {this.state.temp.temp}
        </li>
        <li>
          Max temperature: {this.state.temp.temp_max}
        </li>
        <li>
          Min temperature: {this.state.temp.temp_min}
        </li>
        <li>
          Pressure: {this.state.temp.pressure}
        </li>
        </ul>
      </div>
    );
  }
}

const WEATHER_FOR_SINGLE_CITY_URL = "/weather?";

export default WeatherDetails;
