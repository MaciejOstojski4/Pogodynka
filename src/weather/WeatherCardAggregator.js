/**
 * Created by react on 12.07.17.
 */
import React from "react";
import apiClient from "../lib/api-client";
import WeatherCard from "./card/WeatherCard";

class WeatherCardAggregator extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      cities: [],
    };
  }

  fetchWeatherForCities = () => {
    const urlWithCitiesIds =
      WEATHER_FOR_SEVERAL_CITIES_URL + "&id=" + this.props.cityIds.join(",");
    apiClient
      .get(urlWithCitiesIds)
      .then(response => {
        this.setState({
          cities: response.data.list,
        });
      })
      .catch(error => {
        console.log(
          "Error occurred during fetching weather for cities: " + error,
        );
      });
  };

  componentDidMount() {
    this.fetchWeatherForCities();
  }

  render() {
    return (
      <div className="row">
        <div className="table-responsive">
          <table className="table">
            <caption className="text-center">
              <h2>Current weather in european capitals</h2>
            </caption>
            <tbody>
              <tr
                style={{
                  display: "flex",
                }}
              >
                {this.state.cities.map(city => {
                  return <WeatherCard city={city} />;
                })}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

const WEATHER_FOR_SEVERAL_CITIES_URL = "/group?units=metric";

export default WeatherCardAggregator;
